chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
	id: 'main',
    'bounds': {
      'width': 400,
      'height': 500
    }
  });
});
