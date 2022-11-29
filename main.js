const wrapper = document.querySelector(".control-card");
const playSongInfo =  document.querySelector(".playSongInfo");
const musicName = document.querySelector(".playSongName");
const musicArtist = document.querySelector(".singerName");
const musicImg = document.querySelector(".songPoster img");
const mainAudio = document.querySelector("#mainMusic");
const playPauseBtn = document.querySelector(".play-pause")
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const progressArea = document.querySelector('.progress-area');
const progressBar = document.querySelector('.progress-bar');
// let musicIndex = 1;
let musicIndex = 1;
isMusicPaused = true;
// loading 
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();
})

// load function 
function loadMusic(indexNumb){
    
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `./Resources/images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `./Resources/Audios/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function 
function playMusic(){
    if (mainAudio.paused) {
        mainAudio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    } else {
        mainAudio.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline';
    }
}


// play music event
playPauseBtn.addEventListener("click", ()=>{
    playMusic();
    playingNow();
});

//next music function
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex; 
    loadMusic(musicIndex);
    playMusic();
}

//prev music function
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; 
    loadMusic(musicIndex);
    playMusic();
}

//next music event

nextBtn.addEventListener("click", ()=>{
    nextMusic();
    playingNow();
})

//prev music event

prevBtn.addEventListener("click", ()=>{
    prevMusic();
    playingNow();
})

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`;

    let mainCurrentTime = document.querySelector(".current-time");
    let musicDurationTime = document.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", ()=>{
        
        // update song duration 
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10){
            totalSec = `0${totalSec}`;
         }
        musicDurationTime.innerText = `${totalMin}:${totalSec}`;

        
    });
    // update song currentTime
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10){
        currentSec = `0${currentSec}`;
     }
     mainCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressWidthVal = progressArea.clientWidth;//getting width of progress bar
    let clickedOffSetX = e.offsetX; // geetting offset x value
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = ( clickedOffSetX / progressWidthVal)* songDuration;
    playMusic();
})

const repeatBtn = document.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",()=>{
    let getType = repeatBtn.innerText;
    switch(getType){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})

mainAudio.addEventListener("ended",() => {
    let getType = repeatBtn.innerText;
    switch(getType){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex){
                musicIndex = randIndex;
                loadMusic();
                playMusic();
                playingNow();
                break;
            }
            
    }
})
const ulTag = document.querySelector(".list");
for(let i = 0; i< allMusic.length;i++){
    let liTag = `<li li-index="${i+1}">
                    <div class="songIndex">${allMusic[i].num}</div>
                    <div class="listSong">${allMusic[i].name}</div>
                    <audio id="${allMusic[i].src}"  src="./Resources/Audios/${allMusic[i].src}.mp3"></audio>
                    <div class="more"><i class="fa-solid fa-ellipsis"></i></div>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend",liTag);
}

const allLiTags = ulTag.querySelectorAll("li");
function playingNow(){
    for (let j = 0; j < allLiTags.length; j++) {
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
        };
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
        }
        
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}



function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

// dragg 
const dlink = document.querySelector("#download");

dlink.addEventListener("click",()=>{
    dlink.href= `./Resources/Audios/${allMusic[indexNumb - 1].src}.mp3`;
})