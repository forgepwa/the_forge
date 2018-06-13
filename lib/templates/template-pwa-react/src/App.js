import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>Jeffs Face</code> and save to reload.
        </p>
        <script>
          // Check that service workers are registered
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/sw.js')
                .then(function () { console.log('Service Worker precache'); })
                .catch(registrationError => {
                  console.log('SW registration failed: ', registrationError);
                });
            })
          }
    </script>

      </div>
    );
  }

}

export default App;
