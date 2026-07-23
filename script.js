const releaseDate = new Date("2026-07-24T14:00:00");

const countdownScreen = document.getElementById("countdown-screen");
const introScreen = document.getElementById("intro-screen");
const voiceScreen = document.getElementById("voice-screen");
const harryScreen = document.getElementById("harry-screen");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const startButton = document.getElementById("startButton");

const voice = document.getElementById("voice");
const music = document.getElementById("music");

const couplePhoto = document.getElementById("photoCouple");
const harryPhoto = document.getElementById("harryPhoto");

let unlocked = false;

function updateCountdown() {

    const now = new Date();

    const distance = releaseDate - now;

    if (distance <= 0) {

        unlock();

        return;

    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));

    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const s = Math.floor((distance % (1000 * 60)) / 1000);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");

}

setInterval(updateCountdown,1000);

updateCountdown();

function unlock(){

    if(unlocked) return;

    unlocked = true;

    countdownScreen.classList.remove("active");
    countdownScreen.classList.add("hidden");

    introScreen.classList.remove("hidden");
    introScreen.classList.add("active");

}

startButton.addEventListener("click", async ()=>{

    introScreen.classList.remove("active");
    introScreen.classList.add("hidden");

    voiceScreen.classList.remove("hidden");
    voiceScreen.classList.add("active");

    if(navigator.vibrate){

        navigator.vibrate([120,80,120]);

    }

    setTimeout(()=>{

        couplePhoto.classList.add("showImage");

    },800);

    try{

        await voice.play();

    }catch(e){

        console.log(e);

    }

});

voice.addEventListener("ended",()=>{

    voiceScreen.classList.remove("active");
    voiceScreen.classList.add("hidden");

    harryScreen.classList.remove("hidden");
    harryScreen.classList.add("active");

    setTimeout(()=>{

        harryPhoto.classList.add("showImage");

    },600);

    music.volume = 0;

music.play();

let volume = 0;

const fade = setInterval(() => {

    volume += 0.05;

    music.volume = Math.min(volume,1);

    if(volume >= 1){

        clearInterval(fade);

    }

},200);

});