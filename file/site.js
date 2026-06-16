(function() {
  var STORAGE_TIME = "giftAudioTime";

  function getAudio() {
    return document.getElementById("myAudio");
  }

  function saveAudioTime() {
    var audio = getAudio();
    if (!audio || Number.isNaN(audio.currentTime)) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_TIME, String(audio.currentTime));
    } catch (error) {}
  }

  function restoreAudioTime(audio) {
    try {
      var savedTime = parseFloat(localStorage.getItem(STORAGE_TIME));
      if (!Number.isNaN(savedTime) && savedTime > 0) {
        audio.currentTime = savedTime;
      }
    } catch (error) {}
  }

  function playSiteAudio() {
    var audio = getAudio();
    if (!audio) {
      return;
    }

    audio.loop = true;
    restoreAudioTime(audio);

    var playPromise = audio.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function() {});
    }
  }

  function bindAudioStartup() {
    var audio = getAudio();
    if (!audio) {
      return;
    }

    audio.loop = true;
    restoreAudioTime(audio);
    playSiteAudio();

    window.addEventListener("beforeunload", saveAudioTime);
    window.addEventListener("pagehide", saveAudioTime);
    window.setInterval(saveAudioTime, 1000);

    document.querySelectorAll("a[href]").forEach(function(link) {
      link.addEventListener("click", saveAudioTime);
    });
  }

  window.playAudio = playSiteAudio;
  window.addEventListener("DOMContentLoaded", bindAudioStartup);
})();
