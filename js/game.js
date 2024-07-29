let canvas;
let world;
let keyboard = new Keyboard();
let gameLost = false;
let gameWon = false;

/**
 * Starts the game.
 */
function startGame() {
    resetGameFlags();
    // menuSong.pause();
    ingameMusic.play();
    updateGameDisplay('none', 'none', 'none', 'unset', 'none', 'none', 'none');
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    showMobileButtons();
}

/**
 * Resets the game state flags.
 */
function resetGameFlags() {
    gameLost = false;
    gameWon = false;
}

/**
 * Ends the game when the player loses.
 */
function endTheGameByLost() {
    if (gameLost) return;
    pauseMusic();
    gameLost = true;
    playSound(defeatSound);
    updateGameDisplay('none', 'unset', 'none', 'none', 'none', 'block', 'flex');
    hideMobileButtons();
}

/**
 * Ends the game by declaring a win.
 */
function endTheGameByWin() {
    if (gameWon) return;
    pauseMusic();
    gameWon = true;
    playSound(winSound);
    updateGameDisplay('none', 'none', 'unset', 'none', 'none', 'block', 'flex');
    hideMobileButtons();
}

/**
 * Pauses all game music.
 */
function pauseMusic() {
    bossMusic.pause();
    ingameMusic.pause();
}

/**
 * Plays a given sound from the beginning.
 * @param {HTMLAudioElement} sound - The sound to be played.
 */
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

/**
 * Updates the display property of various game elements.
 * @param {string} startScreenDisplay - Display property for the start screen.
 * @param {string} defeatScreenDisplay - Display property for the defeat screen.
 * @param {string} winScreenDisplay - Display property for the win screen.
 * @param {string} gameScreenDisplay - Display property for the game screen.
 * @param {string} controlSetupButtonDisplay - Display property for the control setup button.
 * @param {string} restartButtonDisplay - Display property for the restart button.
 * @param {string} footerButtonsDisplay - Display property for the footer buttons.
 */
function updateGameDisplay(startScreenDisplay, defeatScreenDisplay, winScreenDisplay, gameScreenDisplay, controlSetupButtonDisplay, restartButtonDisplay, footerButtonsDisplay) {
    document.getElementById('startScreen').style.display = startScreenDisplay;
    document.getElementById('defeatScreen').style.display = defeatScreenDisplay;
    document.getElementById('winScreen').style.display = winScreenDisplay;
    document.getElementById('gameScreen').style.display = gameScreenDisplay;
    document.getElementById('controlSetupButton').style.display = controlSetupButtonDisplay;
    document.getElementById('restartButton').style.display = restartButtonDisplay;
    document.querySelector('.footer-buttons').style.display = footerButtonsDisplay;
}

/**
 * Hides all mobile buttons.
 */
function hideMobileButtons() {
    toggleMobileButtons('none');
}

/**
 * Shows all mobile buttons.
 */
function showMobileButtons() {
    toggleMobileButtons('block');
}

/**
 * Toggles the display property of all mobile buttons.
 * @param {string} displayValue - The display value to be set ('none' or 'block').
 */
function toggleMobileButtons(displayValue) {
    let mobileButtons = document.querySelectorAll('.btn-mobile, .btn-mobile-bottle, .btn-mobile-jump');
    mobileButtons.forEach(button => {
        button.style.display = displayValue;
    });
}

/**
 * Shows the restart button.
 */
function showRestartButton() {
    document.getElementById('restartButton').style.display = 'block';
}

/**
 * Displays the start screen and hides other screens.
 */
function startScreen() {
    menuSong.play();
    updateGameDisplay('unset', 'none', 'none', 'none', 'block', 'none', 'flex');
}

// Modal and control setup button event listeners
let modal = document.getElementById("myModal");
let btn = document.getElementById("controlSetupButton");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Checks the orientation of the device and displays a message if it needs to be rotated.
 */
function checkOrientation() {
    let rotateMessage = document.getElementById('rotateMessage');
    if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = 'flex';
    } else {
        rotateMessage.style.display = 'none';
    }
}

// Initial orientation check and event listeners for orientation change
checkOrientation();
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
