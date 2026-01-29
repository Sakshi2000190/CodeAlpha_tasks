const songs = [
    {   
        img:"images/aankho se batna.jpg",
        title: "Aankhon Se Batana",
        artist: "Dikshant",
        src:"songs/Aankhon Se Batana – Dikshant _ Viral Song 2022 _ Official Video(MP3_160K).mp3",
        
    },
    {   
        img   : "images/tu hai kaha.jpg",
        title: "Tu Hai Kahan",
        artist: "AUR",
        src: "songs/AUR - TU HAI KAHAN - Raffey - Usama - Ahad (Official Music Video)(MP3_160K).mp3"
    },
    {   
        img   : "images/Chaai.jpg",
        title: "Chaai 2",
        artist: "Leen Kulshrestha",
        src: "songs/Chaai 2(MP3_160K).mp3"
    },
    {   
        img   : "images/chand baliya.jpg",
        title: "Chaand Baaliyan",
        artist: "Aditya A",
        src: "songs/Chaand Baaliyan - Aditya A. (Official Video)(MP3_160K).mp3"
    },{   
        img   : "images/Dil-Se-Dil-Song.jpg",
        title: "Dil Se DIl",
        artist: "Vishal Chandrashekhar",
        src: "songs/Dil Se Dil - Official Music Video _ Sita Ramam _ Vishal Chandrashekhar _ Shashwat Singh _ Mandar C(MP3_160K).mp3"
    },
    {   
        img   : "images/lae dooba.jpg",
        title: "Lae Dooba",
        artist: "Rochak Kohli",
        src: "songs/WhatsApp Audio 2025-09-22 at 22.37.22_5fb8f2df.mp3"
    },
    {   
        img   : "images/ek din aap.jpg",
        title: "Ek Din Aap Yun Humko Mil Jayenge",
        artist: "Alka Yagnik and Kumar sanu",
        src: "songs/Ek Din Aap Yun Humko Mil Jayenge _ Alka Yagnik and Kumar Sanu(MP3_160K).mp3"
    },
    {   
        img   : "images/Finding-Her.jpg",
        title: "Finding Her",
        artist: "Kushagra",
        src: "songs/Finding Her (Official Video) _ Kushagra _ Vanshika Kashyap _ Bharath _ UR Debut(MP3_70K).mp3"
    },
    {   
        img   : "images/Gilehriyan.jpg",
        title: "Gilehriyaan",
        artist: "Shreya Ghoshal",
        src: "songs/Gilehriyaan - Lyrical Video _ Dangal _ Aamir Khan _ Pritam _ Amitabh Bhattacharya(MP3_160K).mp3"
    },
    {   
        img   : "images/Sathiya.jpg",
        title: "Sathiya",
        artist: "Shreya Ghoshal",
        src: "songs/Sathiya Lyrics _ Shreya Ghoshal _ Ajay- Atul _ Kajal Agarwal _ Ajay Devgan _ HS Lyrics(MP3_160K).mp3"
    },
    {   
        img   : "images/shayarana.jpg",
        title: "Shayarana",
        artist: "YRF",
        src: "songs/Shayarana _ Full Song _ Daawat-e-Ishq _ Parineeti Chopra _ Karan Wahi _ Shalmali Kholgade(MP3_160K).mp3"
    },

    {
        img:"images/tera fitoor.jpg",
        title: "Tera Fitoor",
        artist: "Arijit Singh",
        src: "songs/Tera Fitoor(MP3_160K).mp3"
    }
];

let currentSong = 0;
let isPlaying = false;
const cover= document.getElementById("cover")
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistDiv = document.getElementById("playlist");

/* Load song */
function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
    cover.src= songs[index].img;
    updatePlaylist();
}

/* Play / Pause */
function playPause() {
    if (isPlaying) {
        audio.pause();
        
        
    } else {
        audio.play();
        
    }
    isPlaying = !isPlaying;
}

/* Next song */
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
}

/* Previous song */
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
}

/* Progress bar update */
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

/* Seek */
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Volume */
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

/* Autoplay */
audio.addEventListener("ended", nextSong);

/* Playlist */
function loadPlaylist() {
    playlistDiv.innerHTML = "";
    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.textContent = song.title + " - " + song.artist;
        div.onclick = () => {
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            isPlaying = true;
        };
        playlistDiv.appendChild(div);
    });
}

function updatePlaylist() {
    document.querySelectorAll(".playlist div").forEach((item, index) => {
        item.classList.toggle("active", index === currentSong);
    });
}

/* Time format */
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

/* Initial load */
loadSong(currentSong);
loadPlaylist();