const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
import throttle from 'lodash.throttle';

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', seconds);
    });
  }, 1000),
);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
