
const img = getElem('img');
const title = getElem('title');
const artist = getElem('artist');
const music = getElem('audio');
const progressContainer = document.getElementById('progress-container');
const progress = getElemId('progress');
const currentTimeEl = getElemId('current-time');
const durationEl = getElemId('duration');
const prevBtn = getElem('#prev');
const playBtn = getElem('#play');
const nextBtn = getElem('#next');

// Music
const songs = [
    {
        name: 'mu-8in8_-_05_-_Ill_Be_My_Mirror',
        displayName: "I'll Be My Mirror",
        artist: '8in8',
    },
    {
        name: 'mu-Dead_Combo_-_01_-_Povo_Que_Cas_Descalo',
        displayName: 'Povo Que Cas Descalo',
        artist: 'Dead Combo',
    },
    {
        name: 'mu-Nobara_Hayakawa_-_01_-_Trail',
        displayName: 'Trail',
        artist: 'Nobara Hayakawa',
    },
    {
        name: 'mu-Paper_Navy_-_08_-_Swan_Song',
        displayName: 'Paper Navy',
        artist: 'Swan Song',
    },
    {
        name: 'mu-Sean_Fournier_-_06_-_Falling_For_You_Piano_Version',
        displayName: 'Sean Fournier',
        artist: 'Falling For You',
    }
]

//Cheeck Playing Status
let isPlaying = false;

//getElem = shorter version of quesrySelector
function getElem(id) {
    return document.querySelector(id);
}

//getElemId = shorter version of getElementById
function getElemId(id) {
    return document.getElementById(id);
}



//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play(); 
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
function loadSong(song) {
    document.getElementById('title').innerHTML = song.displayName;
    document.getElementById('artist').innerHTML = song.artist;
    music.src = `/music/${song.name}.mp3`;
    img.src = `/img/${song.name}.jfif`;
}

// Current Song
let songIndex = 0;

// Previous Song Function
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song Function
function nextSong() {
    songIndex++;
    if (songIndex > songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying)  {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Avoiding NaN; Only changing if durationSeconds changes
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        // Calculate display for current time
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width) * duration;
}


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

