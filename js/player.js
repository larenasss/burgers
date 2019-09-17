/* Плеер через Ютуб

let player;


const onPlayerReady = () => {
   let interval;
   let durationSec = player.getDuration();
 
   if (typeof interval !== 'undefined') {
     clearInterval(interval);
   }
 
   interval = setInterval(() => {
     const completedSec = player.getCurrentTime();
     const completedPercent = (completedSec / durationSec) * 100;
 
     $('.player__playback-button').css({
       left: `${completedPercent}%`
     });
   }, 1000);
 };

const eventInit = () => {
   $('.player__start').on('click', e => {
      e.preventDefault();
      const btn = $(e.currentTarget);

      if (btn.hasClass('paused')) {
         player.pauseVideo();
      } else {
         player.playVideo();
      }
   });

   $('.player__playback').on('click', e => {
      const bar = $(e.currentTarget);
      const newButtonPosition = e.pageX - bar.offset().left;
      const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
      const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

      $('.player__playback-button').css({
         left: `${buttonPosPercent}%`
       });

       player.seekTo(newPlayerTimeSec);
   });

   $('.player__splash').on('click', e => {
      player.playVideo();
   });
};

const onPlayerStateChange = event => {
   const playerButton = $('.player__start');

   /*
      Возвращает состояние проигрывателя. Возможные значения:
         -1 – воспроизведение видео не началось
         0 – воспроизведение видео завершено
         1 – воспроизведение
         2 – пауза
         3 – буферизация
         5 – видео находится в очереди
   */
/*
   switch(event.data) {
      case 1: 
         $('.player__wrapper').addClass('active');
         playerButton.addClass('paused');
         break;
      case 2:
         $('.player__wrapper').removeClass('active');
         playerButton.removeClass('paused');
         break;
   }
}



function onYouTubeIframeAPIReady() {
   player = new YT.Player('yt-player', {
     height: '405',
     width: '660',
     videoId: 'O5qcaCAqekI',
     events: {
       onReady: onPlayerReady,
       onStateChange: onPlayerStateChange
     },
     playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
     }
   });
 }

 eventInit();
*/


let   vedeoEl = document.querySelector('#player')
let   vedeoImg = document.querySelector('.player__wrapper')
      playBtn = document.querySelector('.player__start')
      videoControl = document.querySelector('.player__playback')
      positionVideo = document.querySelector('.player__playback-button');
      volumeControl = document.querySelector('.player__duration');
      positionVolumeButton = document.querySelector('.player__duration-button');
      muteBtn = document.querySelector('.player__volume');

      //Плей- стоп
      playBtn.addEventListener('click', function () {
         if (vedeoEl.paused) {
            vedeoEl.play();
            playBtn.classList.add('paused');
            vedeoImg.classList.add('active');
         } else {
            vedeoEl.pause();
            playBtn.classList.remove('paused');
            vedeoImg.classList.remove('active');
         }
      });

      //Переключение ползунка
      videoControl.addEventListener('click', e => {
         const position = e.offsetX / videoControl.offsetWidth;
         const scrubTime = position * vedeoEl.duration;
         positionVideo.style.left = (position * 100) + '%';
         vedeoEl.currentTime = scrubTime;
      });

      //Ползунок следит
      vedeoEl.addEventListener('timeupdate', function (event) {
         positionVideo.style.left = (vedeoEl.currentTime / vedeoEl.duration * 100) + '%';
      });

      // Звук включен/выключен
      muteBtn.addEventListener("click", function() {
         if (vedeoEl.muted) {
            vedeoEl.muted = false;
            muteBtn.classList.remove('active');
            muteBtn.value = "Mute";
         } else {
            vedeoEl.muted = true;
            muteBtn.classList.add('active');
            muteBtn.value = "Unmute";
         }
      }, false);

      // Ползунок громкости

      volumeControl.addEventListener('click', function(e) {
         let barWidth = volumeControl.offsetWidth;
         let clickPosition = e.offsetX;
         positionVolumeButton.style.left = (100 * clickPosition / barWidth) + '%';
         currentVolume = clickPosition / barWidth;
         vedeoEl.volume = currentVolume;
       })







