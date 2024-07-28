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

function toggleMute() {
    const muteButton = document.getElementById('btnMute');
    const volumeButton = document.getElementById('btnVolume');
    const audioElements = [bossMusic, winSound, defeatSound, walkingSound, snoreSound, ingameMusic, menuSong];

    if (muteButton.style.display === 'none') {
        // Zeige den Mute-Button und verstecke den Volume-Button
        muteButton.style.display = 'block';
        volumeButton.style.display = 'none';

        // Audio stummschalten
        audioElements.forEach(audio => {
            audio.muted = true;
        });

        // Ändere den Rand des Mute-Buttons auf rot
        muteButton.classList.add('active');
    } else {
        // Zeige den Volume-Button und verstecke den Mute-Button
        muteButton.style.display = 'none';
        volumeButton.style.display = 'block';

        // Audio wieder einschalten
        audioElements.forEach(audio => {
            audio.muted = false;
        });

        // Entferne den roten Rand vom Mute-Button
        muteButton.classList.remove('active');
    }
}
