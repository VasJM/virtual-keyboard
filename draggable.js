// SELECTORS
const keyboard = document.querySelector('.draggable');

// VARIABLES
let position = {
    x: 0,
    y: 0
}

// Get the initial position of the keyboard on mouse down
keyboard.onmousedown = (event) => {
    position.x = event.clientX;
    position.y = event.clientY;

    // Update the keyboard's position to ensure it stays under the cursor on mouse move
    document.onmousemove = (documentEvent) => {    
        // Calculate new positions
        const x = position.x - documentEvent.clientX;
        const y = position.y - documentEvent.clientY;
    
        // Update x and y
        position.x = documentEvent.clientX;
        position.y = documentEvent.clientY;
    
        // Update the keyboard's position
        keyboard.style.top = keyboard.offsetTop - y + 'px';
        keyboard.style.left = keyboard.offsetLeft - x + 'px';
    }
    
    // Remove event listeners on mouse up
    document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}