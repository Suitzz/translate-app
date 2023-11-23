from googletrans import Translator

def translate_text(text, target_language='en'):
    translator = Translator()
    translated_text = translator.translate(text, dest=target_language)
    return translated_text.text

user_input = input("Enter the text to translate: ")
target_language = input("Enter the target language code (e.g., 'pt' for Portuguese): ")

translated_text = translate_text(user_input, target_language)
print(f"Original: {user_input}")
print(f"Translated: {translated_text}")
