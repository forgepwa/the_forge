(function() {
  'use strict';

  window.onload = function() {
    let message = localStorage.getItem("message") || 'Your message will display here';
    $('#message').html(message);
    $('#display').html(message);
  }

  $('#button').click(() => {
    console.log('click')
    let message = $('#message').val();
    console.log(message);
    $('#display').html(message);
    localStorage.setItem("message", message);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { registration.update(); console.log('Service Worker Registered'); });
  }

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('../service-worker.js', {scope: 'service-worker.js'}).then(function(registration) {
  //     // registration worked
  //     console.log('Registration succeeded.');
  //       registration.update();
  //   }).catch(function(error) {
  //     // registration failed
  //     console.log('Registration failed with ' + error);
  //   });
  // };
})();
