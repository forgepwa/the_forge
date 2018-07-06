(() => {
  window.onload = () => {
    const message = localStorage.getItem('message') || 'Your message will display here';
    $('#message').html(message);
    $('#display').html(message);
  }

  $('#button').click(() => {
    console.log('click');
    const message = $('#message').val();
    console.log(message);
    $('#display').html(message);
    localStorage.setItem('message', message);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function (reg) { reg.update(); console.log('Service Worker Registered'); });
  }
})();
