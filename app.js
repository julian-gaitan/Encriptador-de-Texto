
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

const maxwell = new Audio('img/maxwell.mp3');

encrypt.addEventListener('click', encryptClick);
decrypt.addEventListener('click', decryptClick);

function encryptClick(event) {
    if (!input.value) return;
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
    output.value = outputText;
    document.getElementById('caption').innerText = 'Texto Encriptado';
    openModal();
    maxwell.play();
}

function decryptClick(event) {
    if (!output.value) return;
    let inputText = output.value;
    for (const [key, value] of Object.entries(cipher)) {
        inputText = inputText.replaceAll(value, key);
    }
    input.value = inputText;
    document.getElementById('caption').innerText = 'Texto Desencriptado';
    openModal();
    maxwell.play();
}

/* MODAL */

const modal = document.querySelector("#myModal");

document.querySelector('button.close').addEventListener('click', closeModal);

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    maxwell.pause();
    maxwell.currentTime = 0;
}
