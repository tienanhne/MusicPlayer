const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const song = document.getElementById('song');
const playBtn = $('.player-inner');
const nextBtn = $('.next-play');
const backBtn = $('.back-play');
const durationTime = $('.duration')
const remainning = $('.remainning')
const rangeBar = $('.range')
const musicName = $('.music-name')
const musicImg = $('.music-thumb img')
const musicThumb = $('.music-thumb')
const playLopp = $('.loop-play')
let songStatus = false;
let isPlaying = true;
let indexSong = 0;
let Timer;
let repeatCount = 0;


playLopp.addEventListener("click", () => {
    if (songStatus) {
        songStatus = false;
        playLopp.style.color = 'black'
    }
    else {
        songStatus = true
        playLopp.style.color = '#20e3b2'
    }
})

const musics = [
    {
        id: 1,
        title: "btyl.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/d/5/c/2d5cc8bc9f930ce292c464e929ea31fb.jpg",
        name: "Bật Tình Yêu Lên"
    },
    {
        id: 2,
        title: "tlinh.mp3",
        image: "https://th.bing.com/th/id/OIP.lavFc4y-TpRU5lP7eZXZxQAAAA?pid=ImgDet&rs=1",
        name: "Ghệ iu dấu của em"
    },
    {
        id: 3,
        title: "dontcoi.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2022/12/07/5/6/5/7/1670385361814_640.jpg",
        name: "Don't Côi"
    },
    {
        id: 4,
        title: "uqt.mp3",
        image: "https://kenh14cdn.com/2020/6/24/1046384817545245420442358705655386430061560o-15930072570751095680806.jpg",
        name: "Ưng Qúa Chừng"
    }
]


playBtn.addEventListener("click", playPause)
function playPause() {
    if (isPlaying) {
        musicThumb.classList.add("isplaying")
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`
        isPlaying = false;
        Timer = setInterval(displayTimer, 500);
    } else {
        musicThumb.classList.remove("isplaying")
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`
        isPlaying = true;
        clearInterval(Timer);
    }
}
song.setAttribute("src", `./music/${musics[indexSong].title}`)
backBtn.addEventListener("click", function () {
    changeSong(-1);
})
nextBtn.addEventListener("click", function () {
    changeSong(1);
})
song.addEventListener('ended', handleEndedSong);
function handleEndedSong() {
    repeatCount++;
    if (songStatus && repeatCount === 1) {
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainning.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00"
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

}

rangeBar.addEventListener('change', handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].title}`)
    musicImg.setAttribute("src", musics[indexSong].image)
    musicName.textContent = musics[indexSong].name

}
displayTimer();
init(indexSong);