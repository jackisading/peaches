const audioPlayer = document.querySelector(".audioContainer");
const audio = new Audio("923 Broadway.mp3");
console.dir(audio);

// set the correct audio length
audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".length").textContent = getTimeCodeFromNum(
        audio.duration
      );
      audio.volume = 1;
    },
    false
  );

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//check audio percentage and update time accordingly

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    console.log(audio.currentTime, audio.duration, audio.currentTime / audio.duration * 100 + "%")
    audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 10);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".play-pause");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
        playBtn.src = 'pause.png';
        audio.play();
    } else {
        playBtn.src = 'play.png';
        audio.pause();
    }
  },
  false
);

//when audio finishes, reset icon
audio.addEventListener("ended", function(){
    playBtn.src = 'play.png';
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }