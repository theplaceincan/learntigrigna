import { ref, onMounted  } from 'vue';

// Handling theme (just dark/light for now(?))
export let darkTheme = ref(false);
export let websiteTheme = ref("light");
export function changeTheme() {
  if(darkTheme.value) {
      websiteTheme.value = "dark";
      localStorage.setItem("theme", "dark");
  } else {
      websiteTheme.value = "light";
      localStorage.setItem("theme", "light");
  }
}
  // Initialize theme on app mount (so new pages pick up the correct theme)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  darkTheme.value = true;
} else {
  darkTheme.value = false;
}
changeTheme();

// Fidel
export const fidel = [
  { letter: "ሀ", phonetic: "ha" }, { letter: "ሁ", phonetic: "hu" }, { letter: "ሂ", phonetic: "hi" }, { letter: "ሃ", phonetic: "hā" }, { letter: "ሄ", phonetic: "hé" }, { letter: "ህ", phonetic: "he/h" }, { letter: "ሆ", phonetic: "ho" },
  { letter: "ለ", phonetic: "la" }, { letter: "ሉ", phonetic: "lu" }, { letter: "ሊ", phonetic: "li" }, { letter: "ላ", phonetic: "lā" }, { letter: "ሌ", phonetic: "lé" }, { letter: "ል", phonetic: "le/l" }, { letter: "ሎ", phonetic: "lo" },
  { letter: "ሐ", phonetic: "ḥa" }, { letter: "ሑ", phonetic: "ḥu" }, { letter: "ሒ", phonetic: "ḥi" }, { letter: "ሓ", phonetic: "ḥā" }, { letter: "ሔ", phonetic: "ḥé" }, { letter: "ሕ", phonetic: "ḥe/ḥ" }, { letter: "ሖ", phonetic: "ḥo" },
  { letter: "መ", phonetic: "ma" }, { letter: "ሙ", phonetic: "mu" }, { letter: "ሚ", phonetic: "mi" }, { letter: "ማ", phonetic: "mā" }, { letter: "ሜ", phonetic: "mé" }, { letter: "ም", phonetic: "me/m" }, { letter: "ሞ", phonetic: "mo" },
  { letter: "ሠ", phonetic: "śa" }, { letter: "ሡ", phonetic: "śu" }, { letter: "ሢ", phonetic: "śi" }, { letter: "ሣ", phonetic: "śā" }, { letter: "ሤ", phonetic: "śé" }, { letter: "ሥ", phonetic: "śe/ś" }, { letter: "ሦ", phonetic: "śo" },
  { letter: "ረ", phonetic: "ra" }, { letter: "ሩ", phonetic: "ru" }, { letter: "ሪ", phonetic: "ri" }, { letter: "ራ", phonetic: "rā" }, { letter: "ሬ", phonetic: "ré" }, { letter: "ር", phonetic: "re/r" }, { letter: "ሮ", phonetic: "ro" },
  { letter: "ሰ", phonetic: "sa" }, { letter: "ሱ", phonetic: "su" }, { letter: "ሲ", phonetic: "si" }, { letter: "ሳ", phonetic: "sā" }, { letter: "ሴ", phonetic: "sé" }, { letter: "ስ", phonetic: "se/s" }, { letter: "ሶ", phonetic: "so" },
  { letter: "ሸ", phonetic: "ša" }, { letter: "ሹ", phonetic: "šu" }, { letter: "ሺ", phonetic: "ši" }, { letter: "ሻ", phonetic: "šā" }, { letter: "ሼ", phonetic: "šé" }, { letter: "ሽ", phonetic: "še/š" }, { letter: "ሾ", phonetic: "šo" },
  { letter: "ቀ", phonetic: "qa" }, { letter: "ቁ", phonetic: "qu" }, { letter: "ቂ", phonetic: "qi" }, { letter: "ቃ", phonetic: "qā" }, { letter: "ቄ", phonetic: "qé" }, { letter: "ቅ", phonetic: "qe/q" }, { letter: "ቆ", phonetic: "qo" },
  { letter: "ቐ", phonetic: "q̄a" }, { letter: "ቑ", phonetic: "q̄u" }, { letter: "ቒ", phonetic: "q̄i" }, { letter: "ቓ", phonetic: "q̄ā" }, { letter: "ቔ", phonetic: "q̄é" }, { letter: "ቕ", phonetic: "q̄e/q̄" }, { letter: "ቖ", phonetic: "q̄o" },
  { letter: "በ", phonetic: "ba" }, { letter: "ቡ", phonetic: "bu" }, { letter: "ቢ", phonetic: "bi" }, { letter: "ባ", phonetic: "bā" }, { letter: "ቤ", phonetic: "bé" }, { letter: "ብ", phonetic: "be/b" }, { letter: "ቦ", phonetic: "bo" },
  { letter: "ተ", phonetic: "ta" }, { letter: "ቱ", phonetic: "tu" }, { letter: "ቲ", phonetic: "ti" }, { letter: "ታ", phonetic: "tā" }, { letter: "ቴ", phonetic: "té" }, { letter: "ት", phonetic: "te/t" }, { letter: "ቶ", phonetic: "to" },
  { letter: "ቸ", phonetic: "ča" }, { letter: "ቹ", phonetic: "ču" }, { letter: "ቺ", phonetic: "či" }, { letter: "ቻ", phonetic: "čā" }, { letter: "ቼ", phonetic: "čé" }, { letter: "ች", phonetic: "če/č" }, { letter: "ቾ", phonetic: "čo" },
  { letter: "ኀ", phonetic: "ha" }, { letter: "ኁ", phonetic: "hu" }, { letter: "ኂ", phonetic: "hi" }, { letter: "ኃ", phonetic: "hā" }, { letter: "ኄ", phonetic: "hé" }, { letter: "ኅ", phonetic: "he/h" }, { letter: "ኆ", phonetic: "ho" },
  { letter: "ነ", phonetic: "na" }, { letter: "ኑ", phonetic: "nu" }, { letter: "ኒ", phonetic: "ni" }, { letter: "ና", phonetic: "nā" }, { letter: "ኔ", phonetic: "né" }, { letter: "ን", phonetic: "ne/n" }, { letter: "ኖ", phonetic: "no" },
  { letter: "ኘ", phonetic: "ña" }, { letter: "ኙ", phonetic: "ñu" }, { letter: "ኚ", phonetic: "ñi" }, { letter: "ኛ", phonetic: "ñā" }, { letter: "ኜ", phonetic: "ñé" }, { letter: "ኝ", phonetic: "ñe/ñ" }, { letter: "ኞ", phonetic: "ño" },
  { letter: "አ", phonetic: "ʼa" }, { letter: "ኡ", phonetic: "ʼu" }, { letter: "ኢ", phonetic: "ʼi" }, { letter: "ኣ", phonetic: "ʼā" }, { letter: "ኤ", phonetic: "ʼé" }, { letter: "እ", phonetic: "ʼe" }, { letter: "ኦ", phonetic: "ʼo" },
  { letter: "ከ", phonetic: "ka" }, { letter: "ኩ", phonetic: "ku" }, { letter: "ኪ", phonetic: "ki" }, { letter: "ካ", phonetic: "kā" }, { letter: "ኬ", phonetic: "ké" }, { letter: "ክ", phonetic: "ke/k" }, { letter: "ኮ", phonetic: "ko" },
  { letter: "ኸ", phonetic: "xa" }, { letter: "ኹ", phonetic: "xu" }, { letter: "ኺ", phonetic: "xi" }, { letter: "ኻ", phonetic: "xā" }, { letter: "ኼ", phonetic: "xé" }, { letter: "ኽ", phonetic: "xe/x" }, { letter: "ኾ", phonetic: "xo" },
  { letter: "ወ", phonetic: "wa" }, { letter: "ዉ", phonetic: "wu" }, { letter: "ዊ", phonetic: "wi" }, { letter: "ዋ", phonetic: "wā" }, { letter: "ዌ", phonetic: "wé" }, { letter: "ው", phonetic: "we/w" }, { letter: "ዎ", phonetic: "wo" },
  { letter: "ዐ", phonetic: "ʻa" }, { letter: "ዑ", phonetic: "ʻu" }, { letter: "ዒ", phonetic: "ʻi" }, { letter: "ዓ", phonetic: "ʻā" }, { letter: "ዔ", phonetic: "ʻé" }, { letter: "ዕ", phonetic: "ʻe" }, { letter: "ዖ", phonetic: "ʻo" },
  { letter: "ዘ", phonetic: "za" }, { letter: "ዙ", phonetic: "zu" }, { letter: "ዚ", phonetic: "zi" }, { letter: "ዛ", phonetic: "zā" }, { letter: "ዜ", phonetic: "zé" }, { letter: "ዝ", phonetic: "ze/z" }, { letter: "ዞ", phonetic: "zo" },
  { letter: "ዠ", phonetic: "ža" }, { letter: "ዡ", phonetic: "žu" }, { letter: "ዢ", phonetic: "ži" }, { letter: "ዣ", phonetic: "žā" }, { letter: "ዤ", phonetic: "žé" }, { letter: "ዥ", phonetic: "že/ž" }, { letter: "ዦ", phonetic: "žo" },
  { letter: "የ", phonetic: "ya" }, { letter: "ዩ", phonetic: "yu" }, { letter: "ዪ", phonetic: "yi" }, { letter: "ያ", phonetic: "yā" }, { letter: "ዬ", phonetic: "yé" }, { letter: "ይ", phonetic: "ye/y" }, { letter: "ዮ", phonetic: "yo" },
  { letter: "ደ", phonetic: "da" }, { letter: "ዱ", phonetic: "du" }, { letter: "ዲ", phonetic: "di" }, { letter: "ዳ", phonetic: "dā" }, { letter: "ዴ", phonetic: "dé" }, { letter: "ድ", phonetic: "de/d" }, { letter: "ዶ", phonetic: "do" },
  { letter: "ጀ", phonetic: "ǧa" }, { letter: "ጁ", phonetic: "ǧu" }, { letter: "ጂ", phonetic: "ǧi" }, { letter: "ጃ", phonetic: "ǧā" }, { letter: "ጄ", phonetic: "ǧé" }, { letter: "ጅ", phonetic: "ǧe/ǧ" }, { letter: "ጆ", phonetic: "ǧo" },
  { letter: "ገ", phonetic: "ge" }, { letter: "ጉ", phonetic: "gu" }, { letter: "ጊ", phonetic: "gi" }, { letter: "ጋ", phonetic: "gā" }, { letter: "ጌ", phonetic: "gé" }, { letter: "ግ", phonetic: "ge/g" }, { letter: "ጎ", phonetic: "go" },
  { letter: "ጠ", phonetic: "ṭa" }, { letter: "ጡ", phonetic: "ṭu" }, { letter: "ጢ", phonetic: "ṭi" }, { letter: "ጣ", phonetic: "ṭā" }, { letter: "ጤ", phonetic: "ṭé" }, { letter: "ጥ", phonetic: "ṭe/ṭ" }, { letter: "ጦ", phonetic: "ṭo" },
  { letter: "ጨ", phonetic: "ċa" }, { letter: "ጩ", phonetic: "ċu" }, { letter: "ጪ", phonetic: "ċi" }, { letter: "ጫ", phonetic: "ċā" }, { letter: "ጬ", phonetic: "ċé" }, { letter: "ጭ", phonetic: "ċe/ċ" }, { letter: "ጮ", phonetic: "ċo" },
  { letter: "ጰ", phonetic: "p̣a" }, { letter: "ጱ", phonetic: "p̣u" }, { letter: "ጲ", phonetic: "p̣i" }, { letter: "ጳ", phonetic: "p̣ā" }, { letter: "ጴ", phonetic: "p̣é" }, { letter: "ጵ", phonetic: "p̣e/p̣" }, { letter: "ጶ", phonetic: "p̣o" },
  { letter: "ጸ", phonetic: "ṣa" }, { letter: "ጹ", phonetic: "ṣu" }, { letter: "ጺ", phonetic: "ṣi" }, { letter: "ጻ", phonetic: "ṣā" }, { letter: "ጼ", phonetic: "ṣé" }, { letter: "ጽ", phonetic: "ṣe/ṣ" }, { letter: "ጾ", phonetic: "ṣo" },
  { letter: "ፀ", phonetic: "ṡa" }, { letter: "ፁ", phonetic: "ṡu" }, { letter: "ፂ", phonetic: "ṡi" }, { letter: "ፃ", phonetic: "ṡā" }, { letter: "ፄ", phonetic: "ṡé" }, { letter: "ፅ", phonetic: "ṡe/ṡ" }, { letter: "ፆ", phonetic: "ṡo" },
  { letter: "ፈ", phonetic: "fa" }, { letter: "ፉ", phonetic: "fu" }, { letter: "ፊ", phonetic: "fi" }, { letter: "ፋ", phonetic: "fā" }, { letter: "ፌ", phonetic: "fé" }, { letter: "ፍ", phonetic: "fe/f" }, { letter: "ፎ", phonetic: "fo" },
  { letter: "ፐ", phonetic: "pa" }, { letter: "ፑ", phonetic: "pu" }, { letter: "ፒ", phonetic: "pi" }, { letter: "ፓ", phonetic: "pā" }, { letter: "ፔ", phonetic: "pé" }, { letter: "ፕ", phonetic: "pe/p" }, { letter: "ፖ", phonetic: "po" },
  { letter: "ቨ", phonetic: "va" }, { letter: "ቩ", phonetic: "vu" }, { letter: "ቪ", phonetic: "vi" }, { letter: "ቫ", phonetic: "vā" }, { letter: "ቬ", phonetic: "vé" }, { letter: "ቭ", phonetic: "ve/v" }, { letter: "ቮ", phonetic: "vo" }
];