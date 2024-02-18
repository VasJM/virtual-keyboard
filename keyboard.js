// SELECTORS
const kbToggle = document.querySelector('.kb-toggle');
const textArea = document.querySelector('.textarea');
const rows = document.querySelectorAll('.rows');
const keys = document.querySelectorAll('.keys');
const capsLk = document.querySelector('.capslk-key');
const shiftKeys = document.querySelectorAll('.shift-key');


// KEYBOARD KEYS
keys.forEach(key => {
    key.setAttribute('keyname', key.innerText);
    key.setAttribute('lowercasename', key.innerText.toLowerCase());

    if (key.classList.length == 1) key.classList.add('round');
    else key.classList.add('rectangle');
});



// EVENT LISTENERS
kbToggle.addEventListener('click', toggleKeyboard);
keys.forEach(key => {
    key.addEventListener('click', userTyping);
});



// FUNCTIONS
function toggleKeyboard() {
    // change keyboard toggle appearance
    kbToggle.classList.toggle('kb-toggle-active');
    // show/hide keyboard
    keyboard.classList.toggle('keyboard-hidden');
    // make textarea big when keyboard is hidden
    textArea.classList.toggle('textarea-big');
}

function userTyping(event) {
    textArea.focus();

    // get char uppercase and lowercase values
    const char = event.target.attributes[1].value;
    const charLowerCase = event.target.attributes[2].value;

    // shift keys
    const shiftLeft = shiftKeys[0];
    const shiftRight = shiftKeys[1];

    // action keys
    const actionKeys = ['Backspace', 'Tab', 'CapsLk', 'Enter', 'Shift','Spacebar'];

    // rows
    const row1 = rows[0];
    const row2 = rows[1];
    const row3 = rows[2];
    const row4 = rows[3];

    // row children
    const row1Children = [...row1.children];
    const row2Children = [...row2.children];
    const row3Children = [...row3.children];
    const row4Children = [...row4.children];

    // row children with special keys only
    const keysWithSpecialChar = [row1Children.slice(0, 13), row2Children.slice(11, 14), row3Children.slice(10, 12), row4Children.slice(8, 11)].flat(1);

    // char sets
    const specialCharSet = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
    const defaultCharSet = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/'];

    // textarea text to string array
    let textArray = [...textArea.value];

    // account for caret position
    const currentTxt = textArea.value; // text
    const caretPos = textArea.selectionStart; // current caret position
    const preTxt = currentTxt.substring(0, caretPos); // text before caret
    const postTxt = currentTxt.substring(caretPos); // text after caret
    


    //////// WHAT TO DO IF CHAR IS AN ACTION KEY

    if (char === 'Backspace') {
        // check to see if user is deleting a SINGLE character
        // OR deleting a SELECTION of text
        if (textArea.selectionStart == textArea.selectionEnd) {
            // delete the single character before the caret and convert string array back to string
            textArray.splice(caretPos - 1, 1); // (caretPos - 1) is the index of the character before the caret
            textArea.value = textArray.join('');
            // set caret start and end position
            textArea.selectionStart = caretPos - 1;
            textArea.selectionEnd = caretPos - 1;
        }
        
        else {
            const startIndex = textArea.selectionStart; 
            const num = textArea.selectionEnd - startIndex + 1; // text selection length
            // delete selection and convert string array back to string
            textArray.splice(startIndex, num);
            textArea.value = textArray.join('');
            // set caret start and end position
            textArea.selectionStart = caretPos;
            textArea.selectionEnd = caretPos;
        }
    }
    
    else if (char === 'Tab') {
        textArea.value = preTxt + "    " + postTxt;

        // set caret start and end position
        textArea.selectionStart = caretPos + 4; // tab size is 4 spaces
        textArea.selectionEnd = caretPos + 4;
    }
    
    else if (char === 'CapsLk') {
        // show capslk key active
        capsLk.classList.toggle('key-active');
        // show left shift key inactive
        shiftLeft.classList.remove('key-active');
        // show right shift key inactive
        shiftRight.classList.remove('key-active');
    }
    
    else if (char === 'Enter') {
        textArea.value = preTxt + "\n" + postTxt;

        // set caret start and end position
        textArea.selectionStart = caretPos + 1;
        textArea.selectionEnd = caretPos + 1;
    }
    
    else if (char === 'Shift') {
        const whichShift = event.target.classList[2];
        // check which shift key
        if (whichShift === 'shift-left') { 
            // show left shift key active
            shiftLeft.classList.toggle('key-active');
            // show right shift key inactive
            shiftRight.classList.remove('key-active');
            // show capslk key inactive
            capsLk.classList.remove('key-active');
        }
        
        else if (whichShift === 'shift-right') {
            // show right shift key active
            shiftRight.classList.toggle('key-active');
            // show left shift key inactive
            shiftLeft.classList.remove('key-active');
            // show capslk key inactive
            capsLk.classList.remove('key-active');
        }
    }
    
    else if (char === 'Spacebar') {
        textArea.value = preTxt + " " + postTxt;

        // set caret start and end position
        textArea.selectionStart = caretPos + 1;
        textArea.selectionEnd = caretPos + 1;
    }

    //////// WHAT TO DO IF EITHER SHIFT KEY IS ACTIVE OR NOT

    // this shows other special characters when shift is active
    if (shiftLeft.classList.contains('key-active') || shiftRight.classList.contains('key-active')) {
        // row 1
        keyCharSwap(keysWithSpecialChar, specialCharSet, specialCharSet.indexOf('~'), specialCharSet.indexOf('+'));
        // row 2
        keyCharSwap(keysWithSpecialChar, specialCharSet, specialCharSet.indexOf('{'), specialCharSet.indexOf('|'));
        // row 3
        keyCharSwap(keysWithSpecialChar, specialCharSet, specialCharSet.indexOf(':'), specialCharSet.indexOf('"'));
        // row 4
        keyCharSwap(keysWithSpecialChar, specialCharSet, specialCharSet.indexOf('<'), specialCharSet.indexOf('?'));
    }

    // this shows the default characters when shift is inactive
    else if (!shiftLeft.classList.contains('key-active') && !shiftLeft.classList.contains('key-active')) {
        // row 1
        keyCharSwap(keysWithSpecialChar, defaultCharSet, defaultCharSet.indexOf('`'), defaultCharSet.indexOf('='));
        // row 2
        keyCharSwap(keysWithSpecialChar, defaultCharSet, defaultCharSet.indexOf('['), defaultCharSet.indexOf('\\'));
        // row 3
        keyCharSwap(keysWithSpecialChar, defaultCharSet, defaultCharSet.indexOf(';'), defaultCharSet.indexOf('\''));
        // row 4
        keyCharSwap(keysWithSpecialChar, defaultCharSet, defaultCharSet.indexOf(','), defaultCharSet.indexOf('/'));
    }

    //////// WHAT TO DO IF CHAR IS NOT AN ACTION KEY

    // while inputting the char to the textarea it also checks to see if the capslk key or either shift keys are active
    // it accounts for both lowercase and uppercase characters
    if ((capsLk.classList.contains('key-active') || shiftLeft.classList.contains('key-active') || shiftRight.classList.contains('key-active')) && !actionKeys.includes(char)) {
        textArea.value = preTxt + char + postTxt; // uppercase char

        // set caret start and end position
        textArea.selectionStart = caretPos + char.length;
        textArea.selectionEnd = caretPos + char.length;
    }
    
    else if (!capsLk.classList.contains('key-active') && !shiftLeft.classList.contains('key-active') && !shiftRight.classList.contains('key-active') && !actionKeys.includes(char)) {
        textArea.value = preTxt + charLowerCase + postTxt; // lowercase char

        // set caret start and end position
        textArea.selectionStart = caretPos + char.length;
        textArea.selectionEnd = caretPos + char.length;
    } 
}

function keyCharSwap(keyset, charset, startAtIndexOfThisChar, endAtIndexOfThisChar) {
    for (let i = startAtIndexOfThisChar; i <= endAtIndexOfThisChar; i++) {
        // set keyname
        keyset[i].setAttribute('keyname', charset[i]);
        // set lowercase name
        keyset[i].setAttribute('lowercasename', charset[i]);
        // change inner text
        keyset[i].innerText = charset[i];
    }
}