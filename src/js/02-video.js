const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const _ = require('lodash');

player.on('play', function () {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
});

player.on(
  'timeupdate',
  _.throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', seconds);
    });
  }, 1000),
);
