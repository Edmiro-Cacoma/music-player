const playBtn = document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

const songs = [
  {
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    src: "public/audio/lost-in-city-lights-145038.mp3",
    cover: "public/img/cover-1.png",
  },
  {
    title: "Forest Lullaby",
    artist: "Lesfm",
    src: "public/audio/forest-lullaby-110624.mp3",
    cover: "public/img/cover-2.png",
  },
];

let currentSongIndex = 0;
let isPlaying = false;
let isFirstplay = true;
const audio = new Audio();

function updateProgress() {
  const progress = document.querySelector(".progress");
  const timePlayed = document.querySelector(".timePlayed");
  const remainingTime = document.querySelector(".remainingTime");
  const duration = audio.duration || 0;
  const currentTime = audio.currentTime || 0;

  const progressBarPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressBarPercentage}%`;
  progress.style.backgroundColor = "#b50750";

  const minutesPlayed = Math.floor(currentTime / 60);
  const secondsPlayed = Math.floor(currentTime % 60);
  timePlayed.textContent = `${minutesPlayed.toString().padStart(2, "0")}
  :${secondsPlayed.toString().padStart(2, "0")}`;

  const minutesRemaining = Math.floor((duration - currentTime) / 60);
  const secondsRemaining = Math.floor((duration - currentTime) % 60);
  remainingTime.textContent = `${minutesRemaining
    .toString()
    .padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`;
}

function playPause() {
  if (isFirstplay) {
    isFirstplay = false;
    currentSongIndex = 0;
    updateSongInfo();
    playSong();
  } else {
    if (isPlaying) {
      audio.pause();
      playBtn.querySelector("img").src = "public/svg/play_fill.svg";
    } else {
      audio.play();
      playBtn.querySelector("img").src = "public/svg/pause.svg";
    }
    isPlaying = !isPlaying;
  }
}

function playPrevious() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  updateSongInfo();
  playSong();
}

function playNext() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  updateSongInfo();
  playSong();
}

function updateCoverImage() {
  const coverImage = document.querySelector("#coverImage");
  const currentSong = songs[currentSongIndex];
  coverImage.src = currentSong.cover;
}

function updateSongInfo() {
  const songTitle = document.querySelector(".title");
  const artist = document.querySelector(".artist");
  const song = songs[currentSongIndex];
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updateCoverImage();
}

function playSong() {
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", playNext);
  audio.play();
  playBtn.querySelector("img").src = "/public/svg/Play_fill.svg";
  isPlaying = true;
}

playBtn.addEventListener("click", playPause);
prevBtn.addEventListener("click", playPrevious);
nextBtn.addEventListener("click", playNext);
