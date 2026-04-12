from translate import Translator

languages = ["ja", "fr", "es", "de", "it", "pt", "ru", "zh", "ko", "ar"]

text = input("Enter the text to translate: ")
for language in languages:
    translator = Translator(from_lang='en', to_lang=language)
    translation = translator.translate(text)
    print(f'{language}: {translation}')