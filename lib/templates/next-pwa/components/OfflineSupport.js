import React, { PureComponent } from 'react'

class OfflineSupport extends PureComponent {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) =>
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        )
        .catch((err) => console.dir(err))
    }
  }

  render() {
    return null
  }
}

export default OfflineSupport
