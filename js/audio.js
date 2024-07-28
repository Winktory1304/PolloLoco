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


function toggleMute() {
    const muteButtonMobile = document.getElementById('btnMuteMobile');
    const volumeButtonMobile = document.getElementById('btnVolumeMobile');
    const muteButtonDesktop = document.getElementById('btnMuteDesktop');
    const volumeButtonDesktop = document.getElementById('btnVolumeDesktop');

    if (muteButtonMobile.style.display === 'none') {
        // Zeige den Mute-Button und verstecke den Volume-Button
        muteButtonMobile.style.display = 'block';
        volumeButtonMobile.style.display = 'none';
        muteButtonDesktop.style.display = 'block';
        volumeButtonDesktop.style.display = 'none';

        // Audio stummschalten
        audioElements.forEach(audio => {
            audio.muted = true;
        });

        // Ändere den Rand des Mute-Buttons auf rot
        muteButtonMobile.classList.add('active');
        muteButtonDesktop.classList.add('active');
    } else {
        // Zeige den Volume-Button und verstecke den Mute-Button
        muteButtonMobile.style.display = 'none';
        volumeButtonMobile.style.display = 'block';
        muteButtonDesktop.style.display = 'none';
        volumeButtonDesktop.style.display = 'block';

        // Audio wieder einschalten
        audioElements.forEach(audio => {
            audio.muted = false;
        });

        // Entferne den roten Rand vom Mute-Button
        muteButtonMobile.classList.remove('active');
        muteButtonDesktop.classList.remove('active');
    }
}

// Setze den Volume-Button standardmäßig auf sichtbar und den Mute-Button auf unsichtbar
window.onload = () => {
    document.getElementById('btnMuteMobile').style.display = 'none';
    document.getElementById('btnVolumeMobile').style.display = 'block';
    document.getElementById('btnMuteDesktop').style.display = 'none';
    document.getElementById('btnVolumeDesktop').style.display = 'block';
};
