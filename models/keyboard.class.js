class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false; // Jump    
    D = false; // Throw

    constructor() {
        this.bindKeyPressEvents();
        this.bindButtonPressEvents();
    }

    /**
     * Binds key press events to set keyboard properties based on key codes.
     */
    bindKeyPressEvents() {
        const keyMap = {
            37: 'LEFT',  // LEFT arrow
            39: 'RIGHT', // RIGHT arrow
            32: 'SPACE', // SPACE key
            68: 'D'      // D key
        };

        window.addEventListener('keydown', (e) => {
            const key = keyMap[e.keyCode];
            if (key !== undefined) {
                this[key] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            const key = keyMap[e.keyCode];
            if (key !== undefined) {
                this[key] = false;
            }
        });
    }

    /**
     * Binds touch press events to the corresponding buttons.
     */
    bindButtonPressEvents() {
        this.bindButtonEvent('btnLeft', 'LEFT');
        this.bindButtonEvent('btnRight', 'RIGHT');
        this.bindButtonEvent('btnJump', 'SPACE'); // This button simulates jumping
        this.bindButtonEvent('btnThrow', 'D');    // This button simulates throwing
    }

    /**
     * Helper function to bind touch events to buttons.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} action - The action to be performed.
     */
    bindButtonEvent(buttonId, action) {
        const element = document.getElementById(buttonId);
        if (element) {
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[action] = true;
            }, { passive: true }); // Use passive option for better performance

            element.addEventListener('touchend', (e) => {
                this[action] = false;
            });
        }
    }
}
