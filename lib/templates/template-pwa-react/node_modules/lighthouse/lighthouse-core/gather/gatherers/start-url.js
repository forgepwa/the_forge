/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Gatherer = require('./gatherer');
const manifestParser = require('../../lib/manifest-parser');

class StartUrl extends Gatherer {
  /**
   * Grab the manifest, extract it's start_url, attempt to `fetch()` it while offline
   * @param {*} options
   * @return {{statusCode: number, debugString?: string}}
   */
  afterPass(options) {
    const driver = options.driver;
    return driver.goOnline(options)
      .then(() => driver.getAppManifest())
      .then(response => driver.goOffline(options).then(() => response))
      .then(response => response && manifestParser(response.data, response.url, options.url))
      .then(manifest => {
        const {isReadFailure, reason, startUrl} = this._readManifestStartUrl(manifest);
        if (isReadFailure) {
          return {statusCode: -1, debugString: reason};
        }

        return this._attemptManifestFetch(options.driver, startUrl);
      }).catch(() => {
        return {statusCode: -1, debugString: 'Unable to fetch start URL via service worker'};
      });
  }

  /**
   * Read the parsed manifest and return failure reasons or the startUrl
   * @param {Manifest} manifest
   * @return {{isReadFailure: true, reason: string}|{isReadFailure: false, startUrl: string}}
   */
  _readManifestStartUrl(manifest) {
    if (!manifest || !manifest.value) {
      const detailedMsg = manifest && manifest.debugString;

      if (detailedMsg) {
        return {isReadFailure: true, reason: `Error fetching web app manifest: ${detailedMsg}`};
      } else {
        return {isReadFailure: true, reason: `No usable web app manifest found on page`};
      }
    }

    // Even if the start URL had an error, the browser will still supply a fallback URL.
    // Therefore, we only set the debugString here and continue with the fetch.
    if (manifest.value.start_url.debugString) {
      return {isReadFailure: true, reason: manifest.value.start_url.debugString};
    }

    return {isReadFailure: false, startUrl: manifest.value.start_url.value};
  }

  /**
   * Try to `fetch(start_url)`, return true if fetched by SW
   * Resolves when we have a matched network request
   * @param {!Driver} driver
   * @param {!string} startUrl
   * @return {Promise<{statusCode: ?number, debugString: ?string}>}
   */
  _attemptManifestFetch(driver, startUrl) {
    // Wait up to 3s to get a matched network request from the fetch() to work
    const timeoutPromise = new Promise(resolve =>
      setTimeout(
        () => resolve({statusCode: -1, debugString: 'Timed out waiting for fetched start_url'}),
        3000
      )
    );

    const fetchPromise = new Promise(resolve => {
      driver.on('Network.responseReceived', onResponseReceived);

      function onResponseReceived({response}) {
        // ignore mismatched URLs
        if (response.url !== startUrl) return;
        driver.off('Network.responseReceived', onResponseReceived);

        if (!response.fromServiceWorker) {
          return resolve({
            statusCode: -1,
            debugString: 'Unable to fetch start URL via service worker',
          });
        }
        // Successful SW-served fetch of the start_URL
        return resolve({statusCode: response.status});
      }
    });

    return driver
      .evaluateAsync(`fetch('${startUrl}')`)
      .then(() => Promise.race([fetchPromise, timeoutPromise]));
  }
}

module.exports = StartUrl;
