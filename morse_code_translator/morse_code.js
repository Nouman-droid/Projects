// const readlineSync = require('readline-sync');

const morse_code = {
    'A':'.-', 'B':'-...', 'C':'-.-.', 
    'D':'-..', 'E':'.',
    'F':'..-.', 'G':'--.', 'H':'....',
    'I':'..', 'J':'.---', 'K':'-.-',
    'L':'.-..', 'M':'--', 'N':'-.',
    'O':'---', 'P':'.--.', 'Q':'--.-',
    'R':'.-.', 'S':'...', 'T':'-',
    'U':'..-', 'V':'...-', 'W':'.--',
    'X':'-..-', 'Y':'-.--', 'Z':'--..',
    '1':'.----', '2':'..---', '3':'...--',
    '4':'....-', '5':'.....', '6':'-....',
    '7':'--...', '8':'---..', '9':'----.',
    '0':'-----', ', ':'--..--', '.':'.-.-.-',
    '?':'..--..', '/':'-..-.', '-':'-....-',
    '(':'-.--.', ')':'-.--.-'
}

const reverse_morse_code = {};
for(let key in morse_code){
    reverse_morse_code[morse_code[key]] = key;
}


  
function encrypt(message) {
    cipher = '';

    for(let letter of message){
        if(letter != ''){
            const morse = morse_code[letter.toUpperCase()];
            if(morse) cipher += morse + '';
        }
        else{
            cipher += '';
        }

    }
   return cipher.trim();
}

function decrypt(message) {
    message = message.trim();
    let decipher = '';
    let i = 0;

    while(i < message.length){
        let found = false;

        for(let len = 5; len > 0; len--){
            let substr = message.slice(i ,i + len);
            if(reverse_morse_code[substr]){
                decipher += reverse_morse_code[substr];
                i += len;
                found = true;
                break;
            }
        }
    }
    // const words = message.trim().split(' / ');
    // let citext = '';

    // for(let word of words){
    //     let letters = word.split(' ');

    //     for(let letter of letters){
    //         if(letter){
    //             decipher += reverse_morse_code[letter] || '';
    //         }
    //     }

        // if(symbol != ''){
        //     i = 0;
        //     citext += symbol;
        // }
        // else{
        //     if(citext !== ''){
        //         decipher += reverse_morse_code[citext] || '';
        //         citext = '';
        //     }
        //     else{
        //         decipher += '';
        //     }
        // }
        // else{
        //     i += 1;

        //     if(i == 2){
        //         decipher += '';

        //     }
        //     else{
        //         const entry = Object.entries(morse_code).find(([key, value])=> value === citext)
        //         if(entry) decipher += entry[0];
        //         citext = '';
        //     }
        
    
    return decipher.trim();
}


// Hook up buttons

document.getElementById('toMorse').addEventListener('click', () => {
    const input = document.getElementById('input').value;
    document.getElementById('output').value = encrypt(input);    
});


document.getElementById('toText').addEventListener('click', () => {
    const input = document.getElementById('input').value;
    document.getElementById('output').value = decrypt(input);    
});

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('input').value = '';    
    document.getElementById('output').value = '';    
});










// function main(){
//     console.log("=== Morse Code Translator ===");
//     console.log("1. Encrypt (Text -> Morse)");
//     console.log("2. Decrypt (Morse -> Text)");

//     const choice = readlineSync.question("Choose an option (1 or 2): ");

//     if(choice === '1'){
//         const message = readlineSync.question("Enter text to encrypt: ");
//         console.log("\nEncrypted Morse Code:\n" + encrypt(message));
//     }
//     else if(choice === '2'){
//         const message = readlineSync.question("Enter Morse Code to decrypt: ");
//         console.log("\nDecrypted Text:\n" + decrypt(message));
//     }
//     else{
//         console.log("Invalid choice. Please restart and select 1 or 2.")
//     }
// }

// main();

