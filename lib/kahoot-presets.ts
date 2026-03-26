import type { KahootQuestion } from "./kahoot-types";

export interface KahootPreset {
  id: string;
  title: string;
  emoji: string;
  subject: string;
  level: string;
  color: string;
  questions: KahootQuestion[];
}

export const KAHOOT_PRESETS: KahootPreset[] = [
  /* ─── MATEMÁTICAS PRIMARIA ─── */
  {
    id: "mate-primaria",
    title: "Matemáticas Primaria",
    emoji: "🔢",
    subject: "Matemáticas",
    level: "Primaria",
    color: "#e21b3c",
    questions: [
      { text: "¿Cuánto es 7 × 8?", timeLimit: 20, correct: 1,
        options: ["54", "56", "48", "63"] },
      { text: "¿Cuál es la mitad de 100?", timeLimit: 15, correct: 0,
        options: ["50", "25", "40", "75"] },
      { text: "¿Cuánto es 144 ÷ 12?", timeLimit: 20, correct: 2,
        options: ["11", "13", "12", "14"] },
      { text: "¿Cuál es el resultado de 15² (15 al cuadrado)?", timeLimit: 25, correct: 3,
        options: ["175", "200", "215", "225"] },
      { text: "Si tengo 3 docenas de huevos, ¿cuántos huevos tengo?", timeLimit: 20, correct: 1,
        options: ["24", "36", "30", "48"] },
      { text: "¿Cuánto es 1,000 − 357?", timeLimit: 25, correct: 0,
        options: ["643", "653", "647", "663"] },
      { text: "¿Qué número es primo?", timeLimit: 20, correct: 2,
        options: ["15", "21", "17", "9"] },
      { text: "¿Cuántos lados tiene un hexágono?", timeLimit: 15, correct: 1,
        options: ["5", "6", "7", "8"] },
    ],
  },

  /* ─── MATEMÁTICAS KINDER ─── */
  {
    id: "mate-kinder",
    title: "Números para Kinder",
    emoji: "🔢",
    subject: "Matemáticas",
    level: "Kinder",
    color: "#e21b3c",
    questions: [
      { text: "¿Cuánto es 2 + 2?", timeLimit: 15, correct: 1,
        options: ["3", "4", "5", "6"] },
      { text: "¿Cuántos dedos tiene una mano?", timeLimit: 10, correct: 2,
        options: ["3", "4", "5", "6"] },
      { text: "¿Qué número va después del 7?", timeLimit: 10, correct: 0,
        options: ["8", "6", "9", "10"] },
      { text: "¿Cuánto es 3 + 1?", timeLimit: 15, correct: 3,
        options: ["2", "3", "5", "4"] },
      { text: "¿Cuántas patas tiene un perro?", timeLimit: 10, correct: 1,
        options: ["2", "4", "6", "3"] },
      { text: "¿Cuál es el número más grande?", timeLimit: 15, correct: 2,
        options: ["5", "7", "9", "6"] },
    ],
  },

  /* ─── ESPAÑOL ─── */
  {
    id: "espanol-primaria",
    title: "Español y Literatura",
    emoji: "📖",
    subject: "Español",
    level: "Primaria",
    color: "#1368ce",
    questions: [
      { text: "¿Cuál es el sinónimo de 'feliz'?", timeLimit: 20, correct: 2,
        options: ["triste", "enojado", "contento", "cansado"] },
      { text: "¿Qué tipo de palabra es 'rápidamente'?", timeLimit: 25, correct: 1,
        options: ["sustantivo", "adverbio", "adjetivo", "verbo"] },
      { text: "¿Cuál de estas palabras lleva acento escrito?", timeLimit: 20, correct: 3,
        options: ["mesa", "libro", "casa", "árbol"] },
      { text: "¿Cuántas sílabas tiene la palabra 'mariposa'?", timeLimit: 20, correct: 2,
        options: ["3", "2", "4", "5"] },
      { text: "¿Qué es un sustantivo?", timeLimit: 25, correct: 0,
        options: ["Nombre de personas, animales o cosas", "Acción o estado", "Característica de algo", "Reemplaza al nombre"] },
      { text: "¿Cuál es el antónimo de 'oscuro'?", timeLimit: 15, correct: 1,
        options: ["negro", "claro", "gris", "noche"] },
      { text: "¿Qué signo va al inicio de una pregunta en español?", timeLimit: 15, correct: 0,
        options: ["¿", "?", "¡", "!"] },
      { text: "La oración 'El perro corre rápido' tiene... ¿cuántas palabras?", timeLimit: 20, correct: 3,
        options: ["3", "2", "5", "4"] },
    ],
  },

  /* ─── GEOGRAFÍA ─── */
  {
    id: "geografia",
    title: "Geografía del Mundo",
    emoji: "🌍",
    subject: "Geografía",
    level: "Primaria / Secundaria",
    color: "#26890c",
    questions: [
      { text: "¿Cuál es la capital de México?", timeLimit: 15, correct: 0,
        options: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"] },
      { text: "¿Cuál es el río más largo del mundo?", timeLimit: 20, correct: 1,
        options: ["Nilo", "Amazonas", "Misisipi", "Yangtsé"] },
      { text: "¿En qué continente está Brasil?", timeLimit: 15, correct: 2,
        options: ["África", "Europa", "América del Sur", "Asia"] },
      { text: "¿Cuál es el océano más grande del mundo?", timeLimit: 20, correct: 0,
        options: ["Pacífico", "Atlántico", "Índico", "Ártico"] },
      { text: "¿Cuántos países tiene América del Norte?", timeLimit: 25, correct: 1,
        options: ["2", "3", "4", "5"] },
      { text: "¿En qué país está la Torre Eiffel?", timeLimit: 15, correct: 3,
        options: ["Italia", "España", "Alemania", "Francia"] },
      { text: "¿Cuál es el desierto más grande del mundo?", timeLimit: 20, correct: 2,
        options: ["Gobi", "Sahara", "Antártico", "Arábigo"] },
      { text: "¿Cuál es la montaña más alta del mundo?", timeLimit: 20, correct: 0,
        options: ["Everest", "K2", "Aconcagua", "Kilimanjaro"] },
    ],
  },

  /* ─── INGLÉS ─── */
  {
    id: "ingles",
    title: "English Time! 🇺🇸",
    emoji: "🇺🇸",
    subject: "Inglés",
    level: "Primaria / Secundaria",
    color: "#d89e00",
    questions: [
      { text: "¿Cómo se dice 'manzana' en inglés?", timeLimit: 15, correct: 1,
        options: ["orange", "apple", "banana", "grape"] },
      { text: "What is the past tense of 'go'?", timeLimit: 20, correct: 2,
        options: ["goed", "goes", "went", "gone"] },
      { text: "¿Qué significa 'butterfly'?", timeLimit: 15, correct: 0,
        options: ["mariposa", "abeja", "libélula", "mosca"] },
      { text: "How do you say '¿Cuántos años tienes?' in English?", timeLimit: 25, correct: 3,
        options: ["What's your name?", "Where are you from?", "How are you?", "How old are you?"] },
      { text: "¿Cuál es el plural de 'child'?", timeLimit: 20, correct: 1,
        options: ["childs", "children", "childes", "childern"] },
      { text: "¿Qué significa 'I'm hungry'?", timeLimit: 15, correct: 2,
        options: ["Tengo sueño", "Tengo sed", "Tengo hambre", "Tengo frío"] },
      { text: "Which one is a color?", timeLimit: 15, correct: 0,
        options: ["purple", "table", "happy", "run"] },
      { text: "¿Cómo se dice 'biblioteca' en inglés?", timeLimit: 20, correct: 3,
        options: ["bookstore", "school", "office", "library"] },
    ],
  },

  /* ─── CIENCIAS NATURALES ─── */
  {
    id: "ciencias",
    title: "Ciencias Naturales",
    emoji: "🔬",
    subject: "Ciencias",
    level: "Primaria / Secundaria",
    color: "#7c3aed",
    questions: [
      { text: "¿Cuántos planetas tiene el Sistema Solar?", timeLimit: 15, correct: 1,
        options: ["7", "8", "9", "10"] },
      { text: "¿Qué gas respiramos principalmente?", timeLimit: 15, correct: 0,
        options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"] },
      { text: "¿Cuántos huesos tiene el cuerpo humano adulto?", timeLimit: 20, correct: 2,
        options: ["150", "200", "206", "220"] },
      { text: "¿Qué planeta es el más grande del Sistema Solar?", timeLimit: 15, correct: 1,
        options: ["Saturno", "Júpiter", "Urano", "Neptuno"] },
      { text: "¿Qué proceso usan las plantas para producir su alimento?", timeLimit: 20, correct: 3,
        options: ["Respiración", "Digestión", "Fermentación", "Fotosíntesis"] },
      { text: "¿A cuántos grados Celsius hierve el agua?", timeLimit: 15, correct: 0,
        options: ["100°C", "90°C", "80°C", "110°C"] },
      { text: "¿Cuál es el animal terrestre más rápido?", timeLimit: 20, correct: 2,
        options: ["León", "Guepardo", "Guepardo", "Caballo"] },
      { text: "¿Qué órgano bombea la sangre en el cuerpo?", timeLimit: 15, correct: 1,
        options: ["Pulmón", "Corazón", "Hígado", "Riñón"] },
    ],
  },

  /* ─── HISTORIA ─── */
  {
    id: "historia",
    title: "Historia Universal",
    emoji: "🏛️",
    subject: "Historia",
    level: "Secundaria",
    color: "#b45309",
    questions: [
      { text: "¿En qué año llegó Colón a América?", timeLimit: 20, correct: 2,
        options: ["1488", "1500", "1492", "1510"] },
      { text: "¿Quién fue el primer presidente de México?", timeLimit: 25, correct: 0,
        options: ["Guadalupe Victoria", "Benito Juárez", "Miguel Hidalgo", "Vicente Guerrero"] },
      { text: "¿Qué civilización construyó las pirámides de Egipto?", timeLimit: 15, correct: 1,
        options: ["Griega", "Egipcia", "Romana", "Fenicia"] },
      { text: "¿En qué año inició la Segunda Guerra Mundial?", timeLimit: 20, correct: 3,
        options: ["1935", "1937", "1938", "1939"] },
      { text: "¿Quién fue Simón Bolívar?", timeLimit: 20, correct: 0,
        options: ["Libertador de varios países de América del Sur", "Presidente de México", "Rey de España", "Explorador portugués"] },
      { text: "¿Cuál fue la primera civilización en desarrollar escritura?", timeLimit: 25, correct: 2,
        options: ["Egipcia", "China", "Sumeria", "Griega"] },
      { text: "¿En qué año cayó el Muro de Berlín?", timeLimit: 20, correct: 1,
        options: ["1985", "1989", "1991", "1993"] },
      { text: "¿Quién fue la primera mujer en ganar un Premio Nobel?", timeLimit: 25, correct: 3,
        options: ["Ada Lovelace", "Frida Kahlo", "Florence Nightingale", "Marie Curie"] },
    ],
  },
];
