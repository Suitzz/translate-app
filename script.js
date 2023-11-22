function selectLanguage(event) {
    event.preventDefault();
    const textInput = document.getElementById('textInput').value;
    const languageSelect = document.getElementById('languageSelect');
    const targetLanguage = languageSelect.options[languageSelect.selectedIndex].value;

    // Simulate translation on the client side using Google Translate API
    translateText(textInput, targetLanguage);
}

function translateText(text, targetLanguage) {
    const resultText = document.getElementById('resultText');
    const apiKey = 'AIzaSyALAlpM1CRZx2hFbvJpZS8atF8ogldn9t4';

    // Perform translation using Google Translate API
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.translations) {
            resultText.innerText = data.data.translations[0].translatedText;
        } else {
            console.error('Translation Error:', data.error.message);
            resultText.innerText = `Translation Error: ${data.error.message}`;
        }
    })
    .catch((error) => {
        console.error('Fetch Error:', error);
        resultText.innerText = 'Translation Error';
    });
}

function changeLanguage(languageCode) {
    const languageSelect = document.getElementById('languageSelect');
    const flagButtons = document.getElementsByClassName('flagButton');

    // Set the selected language in the dropdown
    for (let i = 0; i < languageSelect.options.length; i++) {
        if (languageSelect.options[i].value === languageCode) {
            languageSelect.selectedIndex = i;
            break;
        }
    }

    // Trigger translation
    selectLanguage(new Event('click'));

    // Prevent the default behavior of the click event on flag buttons
    event.preventDefault();
}

// Flag buttons event listeners
document.getElementById('flagButtons').addEventListener('click', function (event) {
    if (event.target.classList.contains('flagButton')) {
        const languageCode = event.target.getAttribute('data-lang');
        changeLanguage(languageCode);
    }
});
