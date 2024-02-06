
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const encrypt = document.querySelector('#encrypt');
const decrypt = document.querySelector('#decrypt');
const copy = document.querySelector('#copy');
const warning = document.querySelector('#warning');
const warningSvgPath = document.querySelector('#warning path');
const themes = document.querySelectorAll('#theme-container input');

const cipher = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat",
}
const allowCharacters = [
    10, // insertLineBreak
    32, // space
]
const a_code = "a".charCodeAt(0);
const z_code = "z".charCodeAt(0);

let alertThreadID;

encrypt.addEventListener('click', encryptClick);
decrypt.addEventListener('click', decryptClick);
copy.addEventListener('click', copyClick);

function encryptClick(e) {
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
    outputChange();
}

function decryptClick(e) {
    let outputText = input.value;
    for (const [key, value] of Object.entries(cipher)) {
        outputText = outputText.replaceAll(value, key);
    }
    output.value = outputText;
    outputChange();
}

function copyClick(e) {
    navigator.clipboard.writeText(output.value);
}

input.addEventListener('input', inputChange);

function inputChange(e) {
    // console.log(e);
    switch (e.inputType) {
        case 'insertFromPaste':
            e.target.value = e.target.value.toLowerCase()
                            .replaceAll('á', 'a')
                            .replaceAll('é', 'e')
                            .replaceAll('í', 'i')
                            .replaceAll('ó', 'o')
                            .replaceAll('ú', 'u');
        case 'insertText':
            for (let i = 0; i < e.data.length; i++) {
                let code = e.data.charCodeAt(i);
                if (!((code >= a_code && code <= z_code) || allowCharacters.includes(code))) {
                    e.target.value = e.target.value.replaceAll(e.data.charAt(i), '');
                    alertUser();
                }
            }
            break;
        default:
            console.log(e.inputType);
            break;
    }
}

function alertUser() {
    warning.classList.add('alert');
    warningSvgPath.classList.add('alert');
    if (alertThreadID) {
        clearTimeout(alertThreadID);
    }
    alertThreadID = setTimeout(function() {
        warning.classList.remove('alert');
        warningSvgPath.classList.remove('alert');
      }, 1000);
}

function outputChange() {
    const message = document.querySelector('#message');
    const noMessage = document.querySelector('#no-message');
    message.classList.remove('d-none');
    noMessage.classList.remove('d-none');
    if (output.value) {
        noMessage.classList.add('d-none');
        resizeOutput();
    } else {
        message.classList.add('d-none');
    }
}

input.addEventListener('focus', textAreaFocus);
output.addEventListener('focus', textAreaFocus);

function textAreaFocus(e) {
    this.selectionStart = 0;
    this.selectionEnd = this.value.length;
}

window.addEventListener('resize', resizeOutput);

function resizeOutput() {
    output.style.height = "";
    output.style.height = (output.scrollHeight)+"px";
}

themes.forEach(function(theme) {
    theme.addEventListener('change', themeChange);
});

function themeChange(e) {
    const value = e.target.value;
    for (const selector of [
        'theme-',
        'theme-input-',
        'theme-encrypt-',
        'theme-decrypt-',
        'theme-copy-',
    ]) {
        document.querySelectorAll(queryString(selector))
                .forEach(function (element) {
                    element.classList.remove(...element.classList);
                    element.classList.add(selector+value);
                });
    }
    for (const selector of [
        'theme-logo-',
        'theme-doll-',
    ]) {
        document.querySelectorAll(queryString(selector))
                .forEach(function (element) {
                    element.classList.add('opacity-0');
                });
        document.querySelector('.'+selector+value).classList.remove('opacity-0');
    }
    console.log(document.querySelector('#logo').attributes.src);
}

function queryString(classTxt) {
    let result = "";
    themes.forEach(function(theme) {
        if (result) {
            result += ',';
        }
        result += '.' + classTxt + theme.value;
    });
    return result;
}
