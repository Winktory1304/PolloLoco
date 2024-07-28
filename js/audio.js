let bossMusic = new Audio('audio/bossMusic.mp3');
let winSound = new Audio('audio/winSound.mp3');
let defeatSound = new Audio('audio/defeatSound.mp3');
let walkingSound = new Audio('audio/walk.mp3');
let snoreSound = new Audio('audio/snore.mp3');
let ingameMusic = new Audio('audio/ingameMusic.mp3');
let menuSong = new Audio('audio/menuSong.mp3');
let collectCoinSound = new Audio('audio/collectCoin.mp3');
let killChickenSound = new Audio('audio/killSound.mp3');
let bottleBreakSound = new Audio('audio/brokenBottle.mp3');

const audioElements = [bossMusic, winSound, defeatSound, walkingSound, snoreSound, ingameMusic, menuSong, collectCoinSound, killChickenSound, bottleBreakSound];


/**
 * Toggles the mute state of the audio elements and updates the mute button's visibility and active state.
 */
function toggleMute() {
    const muteButtonMobile = document.getElementById('btnMuteMobile');
    const volumeButtonMobile = document.getElementById('btnVolumeMobile');
    const muteButtonDesktop = document.getElementById('btnMuteDesktop');
    const volumeButtonDesktop = document.getElementById('btnVolumeDesktop');

    if (muteButtonMobile.style.display === 'none') {        
        handleButtonToggle(muteButtonMobile, volumeButtonMobile, muteButtonDesktop, volumeButtonDesktop);        
        audioElements.forEach(audio => {
            audio.muted = true;
        });        
        muteButtonMobile.classList.add('active');
        muteButtonDesktop.classList.add('active');
        } else {        
        toggleButtonVisibility(muteButtonMobile, volumeButtonMobile, muteButtonDesktop, volumeButtonDesktop);       
        audioElements.forEach(audio => {
            audio.muted = false;
        });       
        muteButtonMobile.classList.remove('active');
        muteButtonDesktop.classList.remove('active');
    }
}

// Set the volume button to visible by default and the mute button to hidden
window.onload = () => {
    document.getElementById('btnMuteMobile').style.display = 'none';
    document.getElementById('btnVolumeMobile').style.display = 'block';
    document.getElementById('btnMuteDesktop').style.display = 'none';
    document.getElementById('btnVolumeDesktop').style.display = 'block';
};
function toggleButtonVisibility(muteButtonMobile, volumeButtonMobile, muteButtonDesktop, volumeButtonDesktop) {
    muteButtonMobile.style.display = 'none';
    volumeButtonMobile.style.display = 'block';
    muteButtonDesktop.style.display = 'none';
    volumeButtonDesktop.style.display = 'block';
}

function handleButtonToggle(muteButtonMobile, volumeButtonMobile, muteButtonDesktop, volumeButtonDesktop) {
    muteButtonMobile.style.display = 'block';
    volumeButtonMobile.style.display = 'none';
    muteButtonDesktop.style.display = 'block';
    volumeButtonDesktop.style.display = 'none';
}

