function translateText() {
    const textInput = document.getElementById('textInput').value;
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.options[languageSelect.selectedIndex].value;

    // Simulate translation on the client side using Google Translate API
    translate_text(textInput, selectedLanguage);
}

function translate_text(text, target_language) {
    const resultText = document.getElementById('resultText');
    const apiKey = 'AIzaSyALAlpM1CRZx2hFbvJpZS8atF8ogldn9t4'; // Replace with your actual API key

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
            target: target_language,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.translations) {
            resultText.innerText = `${data.data.translations[0].translatedText}`;
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
