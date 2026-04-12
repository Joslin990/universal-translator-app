// Speak translated text using ResponsiveVoice or browser SpeechSynthesis API
const speakButton = document.getElementById("speakButton");
if (speakButton) {
    speakButton.addEventListener("click", () => {
        const text = outputText.value.trim();
        if (!text) return;
        let speakText = text;
        // Prefer to speak the translation if both Translation and English Characters are present
        // For Japanese output, speak only the English letter (romaji) form
        const romajiMatch = text.match(/^English Characters.*?:\s*(.*)$/m);
        if (romajiMatch && romajiMatch[1].trim()) {
            speakText = romajiMatch[1].trim();
        } else if (/^Translation:/m.test(text) && /^English Characters:/m.test(text)) {
            // For other outputs with both Translation and English Characters
            const match = text.match(/^English Characters:\s*(.*)$/m);
            if (match && match[1].trim()) {
                speakText = match[1].trim();
            }
        } else if (/^Translation:/m.test(text)) {
            // If only Translation label is present
            const match = text.match(/^Translation:\s*(.*)$/m);
            if (match && match[1].trim()) {
                speakText = match[1].trim();
            }
        } else {
            // Fallback: first non-label, non-empty line
            const lines = text.split('\n').map(l => l.trim()).filter(l => l && !/^([A-Za-z\s\/\(\):]+):/.test(l));
            if (lines.length > 0) {
                speakText = lines[0];
            }
        }
        if (!speakText) return;
        const langCode = languageSelect.value;
        // Use ResponsiveVoice if available
        if (window.responsiveVoice) {
            // Map language code to ResponsiveVoice voice name for best pronunciation
            const langMap = {
                'en': 'UK English Female',
                'en-US': 'US English Female',
                'en-GB': 'UK English Female',
                'ja': 'Japanese Female',
                'es': 'Spanish Female',
                'fr': 'French Female',
                'de': 'Deutsch Female',
                'it': 'Italian Female',
                'ru': 'Russian Female',
                'zh': 'Chinese Female',
                'zh-CN': 'Chinese Female',
                'zh-TW': 'Chinese (Hong Kong) Female',
                'ko': 'Korean Female',
                'pt': 'Portuguese Female',
                'pt-BR': 'Brazilian Portuguese Female',
                'hi': 'Hindi Female',
                'ar': 'Arabic Female',
                'tr': 'Turkish Female',
                'nl': 'Dutch Female',
                'sv': 'Swedish Female',
                'pl': 'Polish Female',
                'ro': 'Romanian Female',
                'cs': 'Czech Female',
                'sk': 'Slovak Female',
                'fi': 'Finnish Female',
                'el': 'Greek Female',
                'he': 'Hebrew Female',
                'id': 'Indonesian Female',
                'th': 'Thai Female',
                'vi': 'Vietnamese Female',
                'uk': 'Ukrainian Female',
                'hu': 'Hungarian Female',
                'bg': 'Bulgarian Female',
                'hr': 'Croatian Female',
                'ms': 'Malay Female',
                'da': 'Danish Female',
                'no': 'Norwegian Female',
                // Add more as needed
            };
            // Try to match full code, then base code, then fallback to English
            let voiceName = langMap[langCode];
            if (!voiceName && langCode && langCode.includes('-')) {
                voiceName = langMap[langCode.split('-')[0]];
            }
            if (!voiceName) {
                // Try to use ResponsiveVoice's built-in language detection
                window.responsiveVoice.speak(speakText, undefined, {rate: 0.92, pitch: 1.15, gender: 'female'});
            } else {
                window.responsiveVoice.speak(speakText, voiceName, {rate: 0.92, pitch: 1.15, gender: 'female'});
            }
        } else {
            // Fallback to SpeechSynthesis API
            const utterance = new window.SpeechSynthesisUtterance(speakText);
            if (langCode && langCode.length >= 2) {
                utterance.lang = langCode;
            }
            utterance.pitch = 1.15;
            utterance.rate = 0.92;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    });
}

// ...existing code...
const supportedLanguages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Assamese", code: "as" },
    { name: "Aymara", code: "ay" },
    { name: "Azerbaijani", code: "az" },
    { name: "Bambara", code: "bm" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bhojpuri", code: "bho" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chichewa", code: "ny" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dhivehi", code: "dv" },
    { name: "Dogri", code: "doi" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Ewe", code: "ee" },
    { name: "Filipino", code: "tl" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Guarani", code: "gn" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Ilocano", code: "ilo" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jw" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Konkani", code: "gom" },
    { name: "Korean", code: "ko" },
    { name: "Krio", code: "kri" },
    { name: "Kurdish", code: "ku" },
    { name: "Kurdish (Sorani)", code: "ckb" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lingala", code: "ln" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luganda", code: "lg" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Maithili", code: "mai" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Meiteilon (Manipuri)", code: "mni-Mtei" },
    { name: "Mizo", code: "lus" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar (Burmese)", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Odia", code: "or" },
    { name: "Oromo", code: "om" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Quechua", code: "qu" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Sanskrit", code: "sa" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Sepedi", code: "nso" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Tigrinya", code: "ti" },
    { name: "Tsonga", code: "ts" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Twi", code: "ak" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba", code: "yo" },
    { name: "Zulu", code: "zu" }
];

const languageNameByCode = Object.fromEntries(supportedLanguages.map((language) => [language.code, language.name]));

const languageSelect = document.getElementById("language");
const inputText = document.getElementById("inputText");
const translateButton = document.getElementById("translateButton");
const outputText = document.getElementById("outputText");
const googleTranslateLink = document.getElementById("googleTranslateLink");
const urbanDictionaryLink = document.getElementById("urbanDictionaryLink");
const languageDictionaryLink = document.getElementById("languageDictionaryLink");
const romajiDesuLink = document.getElementById("romajiDesuLink");
const romajiDesuForm = document.getElementById("romajiDesuForm");
const romajiDesuText = document.getElementById("romajiDesuText");

let latestJapaneseTranslation = "";
let activeTranslationRequestId = 0;

async function fetchWithTimeout(url, options = {}, timeoutMs = 3000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeoutId);
    }
}

async function convertRomajiToJapanese(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ja&dt=t&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetchWithTimeout(url, {}, 2800);
        if (!response.ok) {
            throw new Error("Romaji conversion request failed");
        }

        const data = await response.json();
        const converted = data?.[0]?.map((part) => part?.[0] || "").join("").trim();

        if (!converted) {
            return null;
        }

        return converted;
    } catch {
        return null;
    }
}

function populateLanguageDropdown() {
    const sortedLanguages = [...supportedLanguages].sort((a, b) => a.name.localeCompare(b.name));
    languageSelect.innerHTML = sortedLanguages
        .map((language) => `<option value="${language.code}">${language.name}</option>`)
        .join("");
    languageSelect.value = "en";
}

function getLanguageDictionaryUrl(languageCode, text) {
    const cleanText = text.trim();
    const queryText = cleanText || "translate";

    if (languageCode === "ja") {
        return `https://www.romajidesu.com/dictionary/${encodeURIComponent(queryText)}`;
    }

    const wiktionarySubdomainMap = {
        en: "en", es: "es", fr: "fr", de: "de", it: "it", pt: "pt", ru: "ru",
        ar: "ar", hi: "hi", zh: "zh", "zh-CN": "zh", "zh-TW": "zh", ko: "ko",
        nl: "nl", pl: "pl", tr: "tr", sv: "sv", uk: "uk", fa: "fa", he: "he",
        ja: "ja", vi: "vi", cs: "cs", ro: "ro", hu: "hu", fi: "fi", no: "no",
        da: "da", el: "el", id: "id"
    };

    const subdomain = wiktionarySubdomainMap[languageCode] || "en";
    return `https://${subdomain}.wiktionary.org/wiki/Special:Search?search=${encodeURIComponent(queryText)}`;
}

const kanaDigraphRomajiMap = {
    きゃ: "kya", きゅ: "kyu", きょ: "kyo",
    しゃ: "sha", しゅ: "shu", しょ: "sho",
    ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
    にゃ: "nya", にゅ: "nyu", にょ: "nyo",
    ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
    みゃ: "mya", みゅ: "myu", みょ: "myo",
    りゃ: "rya", りゅ: "ryu", りょ: "ryo",
    ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
    じゃ: "ja", じゅ: "ju", じょ: "jo",
    びゃ: "bya", びゅ: "byu", びょ: "byo",
    ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
    う゛ぁ: "va", う゛ぃ: "vi", う゛ぇ: "ve", う゛ぉ: "vo",
    ふぁ: "fa", ふぃ: "fi", ふぇ: "fe", ふぉ: "fo",
    てぃ: "ti", でぃ: "di", とぅ: "tu", どぅ: "du",
    しぇ: "she", ちぇ: "che", じぇ: "je"
};

const kanaRomajiMap = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", を: "wo", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
    ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
    ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
    ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
    ゔ: "vu", ゎ: "wa"
};

function katakanaToHiragana(text) {
    return text.replace(/[ァ-ヶ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

function hiraganaToKatakana(text) {
    return text.replace(/[ぁ-ゖ]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60));
}

function kanaToRomaji(kanaText) {
    let result = "";
    let isGeminate = false;

    for (let i = 0; i < kanaText.length; i += 1) {
        const currentChar = kanaText[i];
        const nextChar = kanaText[i + 1] || "";
        const digraph = currentChar + nextChar;

        if (currentChar === "っ") {
            isGeminate = true;
            continue;
        }

        if (currentChar === "ー") {
            const lastVowel = result.match(/[aeiou](?!.*[aeiou])/);
            if (lastVowel) {
                result += lastVowel[0];
            }
            continue;
        }

        if (kanaDigraphRomajiMap[digraph]) {
            let syllable = kanaDigraphRomajiMap[digraph];
            if (isGeminate && syllable.length > 0) {
                syllable = syllable[0] + syllable;
                isGeminate = false;
            }
            result += syllable;
            i += 1;
            continue;
        }

        if (kanaRomajiMap[currentChar]) {
            let syllable = kanaRomajiMap[currentChar];
            if (isGeminate && syllable.length > 0) {
                syllable = syllable[0] + syllable;
                isGeminate = false;
            }
            result += syllable;
            continue;
        }

        isGeminate = false;
        result += currentChar;
    }

    return result;
}

async function getJapaneseRomaji(text) {
    const romajiDesuRomaji = await getJapaneseRomajiFromRomajiDesu(text);
    if (romajiDesuRomaji) {
        return romajiDesuRomaji;
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=t&dt=rm&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetchWithTimeout(url, {}, 2500);
        if (!response.ok) {
            throw new Error("Romaji request failed");
        }

        const data = await response.json();
        const sentenceParts = Array.isArray(data?.[0]) ? data[0] : [];
        const romajiParts = sentenceParts
            .map((part) => (Array.isArray(part) ? part[3] : ""))
            .filter((part) => typeof part === "string" && part.trim().length > 0);

        if (romajiParts.length > 0) {
            return romajiParts.join(" ");
        }
    } catch {
    }

    return null;
}

async function getJapaneseRomajiFromRomajiDesu(text) {
    const romajiDesuUrl = `https://www.romajidesu.com/translator/${encodeURIComponent(text)}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(romajiDesuUrl)}`;

    try {
        const response = await fetchWithTimeout(proxyUrl, {}, 2200);
        if (!response.ok) {
            throw new Error("RomajiDesu request failed");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const romajiContainer = doc.querySelector("#res_romaji");

        if (!romajiContainer) {
            return null;
        }

        const romajiText = romajiContainer.textContent
            ?.replace(/\s+/g, " ")
            .trim();

        if (!romajiText) {
            return null;
        }

        return romajiText;
    } catch {
        return null;
    }
}

function buildJapaneseOutput(text, romajiText) {
    const hiraganaText = katakanaToHiragana(text);
    const katakanaText = hiraganaToKatakana(hiraganaText);

    return [
        `Kanji/Kana: ${text}`,
        `Hiragana: ${hiraganaText}`,
        `Katakana: ${katakanaText}`,
        `English Characters (Romaji): ${romajiText}`
    ].join("\n");
}

function containsNonEnglishLetters(text) {
    return /[^A-Za-z0-9\s.,!?"'()\-:;\[\]{}<>/@#$%^&*_+=|\\`~]/.test(text);
}

function toEnglishLettersFallback(text) {
    const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const asciiOnly = normalized.replace(/[^A-Za-z0-9\s.,!?"'()\-:;\[\]{}<>/@#$%^&*_+=|\\`~]/g, "");
    return asciiOnly.replace(/\s+/g, " ").trim();
}

async function getEnglishLetterTransliteration(text, sourceLanguageCode) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sourceLanguageCode)}&tl=en&dt=t&dt=rm&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetchWithTimeout(url, {}, 2600);
        if (!response.ok) {
            throw new Error("Transliteration request failed");
        }

        const data = await response.json();
        const sentenceParts = Array.isArray(data?.[0]) ? data[0] : [];
        const transliterationParts = sentenceParts
            .map((part) => (Array.isArray(part) ? part[3] : ""))
            .filter((part) => typeof part === "string" && part.trim().length > 0);

        if (transliterationParts.length > 0) {
            return transliterationParts.join(" ");
        }
    } catch {
    }

    return null;
}

function updateResourceLinks() {
    const text = inputText.value.trim();
    const targetCode = languageSelect.value || "en";
    const targetLanguageName = languageNameByCode[targetCode] || "Selected Language";

    const googleBase = "https://translate.google.com/?sl=auto";
    const googleTextParam = `&text=${encodeURIComponent(text)}`;
    googleTranslateLink.href = `${googleBase}&tl=${encodeURIComponent(targetCode)}${googleTextParam}&op=translate`;

    const urbanBase = "https://www.urbandictionary.com/define.php?term=";
    const urbanQuery = text ? `${text} ${targetLanguageName}` : targetLanguageName;
    urbanDictionaryLink.href = `${urbanBase}${encodeURIComponent(urbanQuery)}`;
    urbanDictionaryLink.textContent = `Urban Dictionary (${targetLanguageName})`;
    languageDictionaryLink.href = getLanguageDictionaryUrl(targetCode, text);
    languageDictionaryLink.textContent = `Dictionary (${targetLanguageName})`;

    const romajiSourceText = targetCode === "ja" && latestJapaneseTranslation
        ? latestJapaneseTranslation
        : text;
    romajiDesuText.value = romajiSourceText;
}

const fallbackTranslations = {
    "hello": {
        es: "hola",
        fr: "bonjour",
        de: "hallo",
        "zh-CN": "你好",
        ja: "こんにちは",
        ar: "مرحبًا",
        hi: "नमस्ते",
        ru: "привет",
        pt: "olá",
        en: "hello"
    },
    "thank you": {
        es: "gracias",
        fr: "merci",
        de: "danke",
        "zh-CN": "谢谢",
        ja: "ありがとうございます",
        ar: "شكرًا",
        hi: "धन्यवाद",
        ru: "спасибо",
        pt: "obrigado",
        en: "thank you"
    }
};

async function translateText(text, selectedLanguage) {
    const japaneseSource = await convertRomajiToJapanese(text);

    if (!japaneseSource) {
        return "Could not interpret that romaji text right now. Please try a clearer romaji phrase.";
    }

    if (selectedLanguage === "ja") {
        return japaneseSource;
    }

    const targetCode = selectedLanguage;

    try {
        const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=${encodeURIComponent(targetCode)}&dt=t&q=${encodeURIComponent(japaneseSource)}`;
        const googleResponse = await fetchWithTimeout(googleUrl, {}, 3000);

        if (googleResponse.ok) {
            const googleData = await googleResponse.json();
            const translatedFromGoogle = googleData?.[0]?.map((part) => part?.[0] || "").join("").trim();

            if (translatedFromGoogle) {
                return translatedFromGoogle;
            }
        }

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(japaneseSource)}&langpair=ja|${encodeURIComponent(targetCode)}`;
        const response = await fetchWithTimeout(url, {}, 3500);

        if (!response.ok) {
            throw new Error("Translation request failed");
        }

        const data = await response.json();
        const translated = data?.responseData?.translatedText;

        if (!translated) {
            throw new Error("No translated text in response");
        }

        return translated;
    } catch {
        const normalizedText = text.trim().toLowerCase();
        const fallback = fallbackTranslations[normalizedText]?.[selectedLanguage];

        if (fallback) {
            return fallback;
        }

        return `Translation unavailable right now for ${languageNameByCode[selectedLanguage] || selectedLanguage}. Please try again.`;
    }
}

translateButton.addEventListener("click", async () => {
    const requestId = ++activeTranslationRequestId;
    const text = inputText.value.trim();
    const selectedLanguage = languageSelect.value;

    updateResourceLinks();

    if (!text) {
        outputText.value = "Please enter text to translate.";
        return;
    }

    outputText.value = "Translating...";
    const result = await translateText(text, selectedLanguage);
    if (requestId !== activeTranslationRequestId) {
        return;
    }

    if (selectedLanguage === "ja") {
        if (result.startsWith("Could not interpret") || result.startsWith("Translation unavailable")) {
            latestJapaneseTranslation = "";
            updateResourceLinks();
            outputText.value = result;
            return;
        }

        latestJapaneseTranslation = result;
        updateResourceLinks();

        const quickRomaji = kanaToRomaji(katakanaToHiragana(result));
        outputText.value = buildJapaneseOutput(result, quickRomaji);

        getJapaneseRomaji(result).then((betterRomaji) => {
            if (!betterRomaji) {
                return;
            }

            if (requestId !== activeTranslationRequestId || languageSelect.value !== "ja") {
                return;
            }

            outputText.value = buildJapaneseOutput(result, betterRomaji);
        });
        return;
    }

    latestJapaneseTranslation = "";
    updateResourceLinks();

    if (!containsNonEnglishLetters(result)) {
        outputText.value = result;
        return;
    }

    outputText.value = `Translation: ${result}\nEnglish Characters: Converting...`;
    const transliteration = await getEnglishLetterTransliteration(result, selectedLanguage);

    if (requestId !== activeTranslationRequestId || languageSelect.value !== selectedLanguage) {
        return;
    }

    const fallbackEnglishLetters = toEnglishLettersFallback(result);
    const englishLetters = transliteration || fallbackEnglishLetters || "Not available";
    outputText.value = `Translation: ${result}\nEnglish Characters: ${englishLetters}`;
});

romajiDesuLink.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedLanguage = languageSelect.value;
    const text = inputText.value.trim();
    const romajiSourceText = selectedLanguage === "ja" && latestJapaneseTranslation
        ? latestJapaneseTranslation
        : text;

    if (!romajiSourceText) {
        window.open("https://www.romajidesu.com/translator/", "_blank", "noopener,noreferrer");
        return;
    }

    romajiDesuText.value = romajiSourceText;
    romajiDesuForm.submit();
});

inputText.addEventListener("input", updateResourceLinks);
languageSelect.addEventListener("change", updateResourceLinks);

populateLanguageDropdown();
updateResourceLinks();

document.addEventListener("keydown", (event) => {
    if (!event.ctrlKey || !event.shiftKey || event.key.toLowerCase() !== "d") {
        return;
    }

    event.preventDefault();
    document.body.classList.toggle("debug-overflow");
});
