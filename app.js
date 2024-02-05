
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const encrypt = document.querySelector('#encrypt');
const decrypt = document.querySelector('#decrypt');

const cipher = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat",
}

encrypt.addEventListener('click', encryptClick);
decrypt.addEventListener('click', decryptClick);

function encryptClick(event) {
    let inputText = input.value;
    let outputText = "";
    for (let i = 0; i < inputText.length; i++) {
        let char = inputText.charAt(i);
        if (cipher[char]) {
            outputText += cipher[char];
        } else {
            outputText += char;
        }
    }
    output.textContent = outputText;
}

function decryptClick(event) {
    let outputText = input.value;
    for (const [key, value] of Object.entries(cipher)) {
        outputText = outputText.replaceAll(value, key);
    }
    output.textContent = outputText;
}
