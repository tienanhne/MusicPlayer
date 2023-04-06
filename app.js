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
const musicSinger = $('.singer')
const musicImg = $('.coverImage img')
const musicThumb = $('.coverImage')
const playLopp = $('.loop-play')
const ifinite = $('.infiniti')
const randomPlay = $('.random-play')
const Player_Storage = 'Player_Tiến'
let isLooping = false;
let isPlaying = true;
let indexSong = 0;
let israndom = false;
let Timer;
const tableBody = $('.table_list')
let setting = JSON.parse(localStorage.getItem(Player_Storage)) || {};


let length = $('.length');



const musics = [
    {
        id: 1,
        title: "btyl.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/d/5/c/2d5cc8bc9f930ce292c464e929ea31fb.jpg",
        name: "Bật Tình Yêu Lên",
        singer: "Hòa Minzy"
    },
    {
        id: 2,
        title: "tlinh.mp3",
        image: "https://th.bing.com/th/id/OIP.lavFc4y-TpRU5lP7eZXZxQAAAA?pid=ImgDet&rs=1",
        name: "Ghệ iu dấu của em",
        singer: "Tlinh"
    },
    {
        id: 3,
        title: "dontcoi.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2022/12/07/5/6/5/7/1670385361814_640.jpg",
        name: "Don't Côi",
        singer: "RPT orijin"
    },
    {
        id: 4,
        title: "uqt.mp3",
        image: "https://kenh14cdn.com/2020/6/24/1046384817545245420442358705655386430061560o-15930072570751095680806.jpg",
        name: "Ưng Qúa Chừng",
        singer: "Amee"
    },
    {
        id: 5,
        title: "face.mp3",
        image: "https://kpopping.com/documents/e0/5/4000/NU-EST-Romanticize-Concept-Teaser-Images-documents-1.jpeg?v=d65c7",
        name: "Face",
        singer: "NUEST"
    },
    {
        id: 6,
        title: "ido.mp3",
        image: "https://i1-vnexpress.vnecdn.net/2022/02/09/duc-phuc-9056-1644382086.png?w=0&h=0&q=100&dpr=1&fit=crop&s=BamUU_ACz2jSoa0CZXnNRA",
        name: "Em đồng ý",
        singer: "Đức phúc"
    },
    {
        id: 7,
        title: "neulucdo.mp3",
        image: "https://th.bing.com/th/id/OIP.lavFc4y-TpRU5lP7eZXZxQAAAA?pid=ImgDet&rs=1",
        name: "Nếu lúc đó",
        singer: "Tlinh"
    },
    {
        id: 8,
        title: "thang4.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/06/27/e/8/8/5/1530074198530.jpg",
        name: "Tháng từ lời nói dối của Tiến",
        singer: "Hà Anh Tiến"
    },
    {
        id: 9,
        title: "flower.mp3",
        image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/8/868990/Blackpink1.jpg",
        name: "Flower",
        singer: "JISOO"
    },
    {
        id: 10,
        title: "fiction.mp3",
        image: "https://kenh14cdn.com/2019/3/14/photo-1-1508141736146-1552544340710585808366.jpg",
        name: "FicTion",
        singer: "Beast"
    },
    {
        id: 10,
        title: "fiction.mp3",
        image: "https://kenh14cdn.com/2019/3/14/photo-1-1508141736146-1552544340710585808366.jpg",
        name: "FicTion",
        singer: "Beast"
    },
    {
        id: 11,
        title: "fiction.mp3",
        image: "https://kenh14cdn.com/2019/3/14/photo-1-1508141736146-1552544340710585808366.jpg",
        name: "FicTion",
        singer: "Beast"
    },
    {
        id: 12,
        title: "fiction.mp3",
        image: "https://kenh14cdn.com/2019/3/14/photo-1-1508141736146-1552544340710585808366.jpg",
        name: "FicTion",
        singer: "Beast"
    }

]


playBtn.addEventListener("click", playPause)
function playPause() {
    if (isPlaying) {
        musicThumb.classList.add("isplaying")
        song.play();

        isPlaying = false;
        Timer = setInterval(displayTimer, 500);
    } else {
        musicThumb.classList.remove("isplaying")
        song.pause();
        isPlaying = true;

        clearInterval(Timer);
    }
}

song.setAttribute("src", `./music/${musics[indexSong].title}`)
backBtn.addEventListener("click", function () {
    changeSong(-1);
})
nextBtn.addEventListener("click", function () {
    if (israndom) {
        RandomList();
    }
    changeSong(1);

})
song.addEventListener('ended', handleEndedSong);
function handleEndedSong() {
    nextBtn.click();
    changeSong(1);
}
function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
        renderList();
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;

        }
        isPlaying = true;
        renderList();
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
    musicSinger.textContent = musics[indexSong].singer
    
}
displayTimer();
init(indexSong);

function renderList() {

    let innerhtml = '';
    musics.map((item, index) => {
        let content = `
        <tr class="song ${index === indexSong ? 'active' : ''}" data-index="${index}">
                <td class="nr">
                    <h5>${item.id}<h5>
                </td>
                <td class="title">
                    <h6>${item.name}<h6>
                </td>
                <td class="length">
                    <h5>${length}<h5>
                </td>
                <td><input type="checkbox" id="heart" /><label class="zmr" for="heart"></label></td>
        </tr>
        `
        innerhtml += content;

    })
  
    tableBody.innerHTML = innerhtml;


    HandelSetting = function (key, value) {
        setting[key] = value;
        localStorage.setItem(Player_Storage, JSON.stringify(setting))
    }


    // lắng nghe hành vi click playlist
    tableBody.onclick = function (e) {
        const songNode = e.target.closest('.song:not(.active)')
        if (songNode || e.target.closest('.option')) {
            if (songNode) {
                indexSong = Number(songNode.dataset.index)
                init(indexSong)
                renderList();
                isPlaying = true;
                playPause();
            }
            if (e.target.closest('.option')) {
                return;
            }
        }
    }
}
function loadSetting() {
    isLooping = setting.isLooping;

    israndom = setting.israndom
}
loadSetting();

ifinite.addEventListener("change", () => {
    if (ifinite.checked == true) {
        if(!isLooping){
            isLooping = true;
            HandelSetting('isLooping', isLooping)
            song.loop = true;
        }
        }else{
            isLooping = false;
            song.loop = false;
            HandelSetting('isLooping', isLooping)
        }
})

function RandomList() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * musics.length)
    } while (newIndex === indexSong)
    indexSong = newIndex;
    init(indexSong)
}
randomPlay.addEventListener("click", () => {
    if (!israndom) {
        israndom = true
        HandelSetting('israndom', israndom)
    }
    else {
        israndom = false;
        HandelSetting('israndom', israndom)
    }
})
renderList();


// let values =
// `Lorem ipsum dolor sit amet,
// consectetur adipiscing elit.
// Sed do eiusmod tempor incididunt
// ut labore et dolore magna aliqua.`
// let tableBody = document.querySelector('.table_list')
// function Tachdulieu() {
//     let lines = values.split("\n");
//     console.log(lines)
//     let innerhtml = '';
//         lines.map(item => {
//             let content = `
//             <tr>
//                     <td class="nr">
//                         <h5>${item}<h5>
//                         <hr>
//                     </td>
//             </tr>
//             `
//             innerhtml += content;
    
//     })
//     tableBody.innerHTML = innerhtml;
// }
// Tachdulieu();

