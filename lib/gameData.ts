import type { GameQuestion } from "./types";

// ─── KINDER ───────────────────────────────────────────────────────────────────

export const kinderNumeros: GameQuestion[] = [
  { instruction: "¿Cuántos hay?", display: "🍎🍎🍎", options: [{ label: "3", correct: true }, { label: "1", correct: false }, { label: "5", correct: false }, { label: "2", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "⭐⭐⭐⭐⭐", options: [{ label: "5", correct: true }, { label: "3", correct: false }, { label: "4", correct: false }, { label: "6", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🐶🐶", options: [{ label: "2", correct: true }, { label: "4", correct: false }, { label: "1", correct: false }, { label: "3", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🌸🌸🌸🌸", options: [{ label: "4", correct: true }, { label: "2", correct: false }, { label: "5", correct: false }, { label: "3", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🦋", options: [{ label: "1", correct: true }, { label: "2", correct: false }, { label: "3", correct: false }, { label: "4", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🐠🐠🐠🐠🐠🐠", options: [{ label: "6", correct: true }, { label: "4", correct: false }, { label: "5", correct: false }, { label: "7", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🍭🍭🍭🍭🍭🍭🍭", options: [{ label: "7", correct: true }, { label: "5", correct: false }, { label: "6", correct: false }, { label: "8", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🎈🎈🎈🎈🎈🎈🎈🎈", options: [{ label: "8", correct: true }, { label: "6", correct: false }, { label: "7", correct: false }, { label: "9", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🌟🌟🌟🌟🌟🌟🌟🌟🌟", options: [{ label: "9", correct: true }, { label: "7", correct: false }, { label: "8", correct: false }, { label: "10", correct: false }] },
  { instruction: "¿Cuántos hay?", display: "🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩", options: [{ label: "10", correct: true }, { label: "8", correct: false }, { label: "9", correct: false }, { label: "7", correct: false }] },
];

export const kinderLetras: GameQuestion[] = [
  { instruction: "¿Qué empieza con la letra...", display: "A", options: [{ label: "✈️ Avión", correct: true }, { label: "🐱 Gato", correct: false }, { label: "🍌 Plátano", correct: false }, { label: "🌸 Flor", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "B", options: [{ label: "🚌 Bus", correct: true }, { label: "🍎 Manzana", correct: false }, { label: "🌙 Luna", correct: false }, { label: "🐸 Rana", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "C", options: [{ label: "🐴 Caballo", correct: true }, { label: "🐶 Perro", correct: false }, { label: "🐸 Rana", correct: false }, { label: "🦁 León", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "D", options: [{ label: "🦷 Diente", correct: true }, { label: "🐱 Gato", correct: false }, { label: "🍎 Manzana", correct: false }, { label: "🌻 Girasol", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "E", options: [{ label: "⭐ Estrella", correct: true }, { label: "🦁 León", correct: false }, { label: "🍕 Pizza", correct: false }, { label: "🐯 Tigre", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "F", options: [{ label: "🌸 Flor", correct: true }, { label: "🌙 Luna", correct: false }, { label: "🐱 Gato", correct: false }, { label: "🦋 Mariposa", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "G", options: [{ label: "🐱 Gato", correct: true }, { label: "✈️ Avión", correct: false }, { label: "🐶 Perro", correct: false }, { label: "🍓 Fresa", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "L", options: [{ label: "🦁 León", correct: true }, { label: "🐸 Rana", correct: false }, { label: "🐯 Tigre", correct: false }, { label: "✈️ Avión", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "M", options: [{ label: "🦋 Mariposa", correct: true }, { label: "🐶 Perro", correct: false }, { label: "🌸 Flor", correct: false }, { label: "⭐ Estrella", correct: false }] },
  { instruction: "¿Qué empieza con la letra...", display: "P", options: [{ label: "🐶 Perro", correct: true }, { label: "🦁 León", correct: false }, { label: "🐱 Gato", correct: false }, { label: "🌙 Luna", correct: false }] },
];

export const kinderColores: GameQuestion[] = [
  { instruction: "¿De qué color es?", display: "🍎", options: [{ label: "Rojo", correct: true, color: "#EF4444" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Amarillo", correct: false, color: "#EAB308" }] },
  { instruction: "¿De qué color es?", display: "🍌", options: [{ label: "Amarillo", correct: true, color: "#EAB308" }, { label: "Rojo", correct: false, color: "#EF4444" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Rosa", correct: false, color: "#EC4899" }] },
  { instruction: "¿De qué color es?", display: "🌿", options: [{ label: "Verde", correct: true, color: "#22C55E" }, { label: "Naranja", correct: false, color: "#F97316" }, { label: "Morado", correct: false, color: "#A855F7" }, { label: "Amarillo", correct: false, color: "#EAB308" }] },
  { instruction: "¿De qué color es?", display: "🌊", options: [{ label: "Azul", correct: true, color: "#3B82F6" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Rojo", correct: false, color: "#EF4444" }, { label: "Rosa", correct: false, color: "#EC4899" }] },
  { instruction: "¿De qué color es?", display: "🌸", options: [{ label: "Rosa", correct: true, color: "#EC4899" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Rojo", correct: false, color: "#EF4444" }] },
  { instruction: "¿De qué color es?", display: "🍊", options: [{ label: "Naranja", correct: true, color: "#F97316" }, { label: "Rosa", correct: false, color: "#EC4899" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Amarillo", correct: false, color: "#EAB308" }] },
  { instruction: "¿De qué color es?", display: "🍇", options: [{ label: "Morado", correct: true, color: "#A855F7" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Naranja", correct: false, color: "#F97316" }, { label: "Rojo", correct: false, color: "#EF4444" }] },
  { instruction: "¿De qué color es?", display: "☁️", options: [{ label: "Blanco", correct: true, color: "#D1D5DB" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Rosa", correct: false, color: "#EC4899" }, { label: "Amarillo", correct: false, color: "#EAB308" }] },
  { instruction: "¿De qué color es?", display: "🌙", options: [{ label: "Amarillo", correct: true, color: "#EAB308" }, { label: "Azul", correct: false, color: "#3B82F6" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Morado", correct: false, color: "#A855F7" }] },
  { instruction: "¿De qué color es?", display: "🐘", options: [{ label: "Gris", correct: true, color: "#6B7280" }, { label: "Rojo", correct: false, color: "#EF4444" }, { label: "Verde", correct: false, color: "#22C55E" }, { label: "Azul", correct: false, color: "#3B82F6" }] },
];

export const kinderPalabras: GameQuestion[] = [
  { instruction: "¿Qué es esto?", display: "🐱", options: [{ label: "Gato", correct: true }, { label: "Perro", correct: false }, { label: "Pájaro", correct: false }, { label: "Pez", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🌞", options: [{ label: "Sol", correct: true }, { label: "Luna", correct: false }, { label: "Nube", correct: false }, { label: "Estrella", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🍎", options: [{ label: "Manzana", correct: true }, { label: "Pera", correct: false }, { label: "Naranja", correct: false }, { label: "Plátano", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🚗", options: [{ label: "Carro", correct: true }, { label: "Moto", correct: false }, { label: "Tren", correct: false }, { label: "Avión", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🌸", options: [{ label: "Flor", correct: true }, { label: "Árbol", correct: false }, { label: "Pasto", correct: false }, { label: "Hoja", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🦋", options: [{ label: "Mariposa", correct: true }, { label: "Abeja", correct: false }, { label: "Mosca", correct: false }, { label: "Hormiga", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🏠", options: [{ label: "Casa", correct: true }, { label: "Escuela", correct: false }, { label: "Tienda", correct: false }, { label: "Parque", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🍦", options: [{ label: "Helado", correct: true }, { label: "Pastel", correct: false }, { label: "Paleta", correct: false }, { label: "Galleta", correct: false }] },
  { instruction: "¿Qué es esto?", display: "⚽", options: [{ label: "Pelota", correct: true }, { label: "Globo", correct: false }, { label: "Rueda", correct: false }, { label: "Naranja", correct: false }] },
  { instruction: "¿Qué es esto?", display: "🌈", options: [{ label: "Arcoíris", correct: true }, { label: "Nube", correct: false }, { label: "Lluvia", correct: false }, { label: "Sol", correct: false }] },
];

export const kinderIngles: GameQuestion[] = [
  { instruction: "¿Cómo se dice en inglés?", display: "🐱 Gato", options: [{ label: "Cat", correct: true }, { label: "Dog", correct: false }, { label: "Bird", correct: false }, { label: "Fish", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "🐶 Perro", options: [{ label: "Dog", correct: true }, { label: "Cat", correct: false }, { label: "Cow", correct: false }, { label: "Frog", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "1️⃣ Uno", options: [{ label: "One", correct: true }, { label: "Two", correct: false }, { label: "Three", correct: false }, { label: "Four", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "2️⃣ Dos", options: [{ label: "Two", correct: true }, { label: "One", correct: false }, { label: "Three", correct: false }, { label: "Five", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "🔴 Rojo", options: [{ label: "Red", correct: true }, { label: "Blue", correct: false }, { label: "Green", correct: false }, { label: "Yellow", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "💛 Amarillo", options: [{ label: "Yellow", correct: true }, { label: "Red", correct: false }, { label: "Pink", correct: false }, { label: "Orange", correct: false }] },
  { instruction: "¿Qué significa en español?", display: "Hello", options: [{ label: "Hola", correct: true }, { label: "Adiós", correct: false }, { label: "Gracias", correct: false }, { label: "Por favor", correct: false }] },
  { instruction: "¿Qué significa en español?", display: "Goodbye", options: [{ label: "Adiós", correct: true }, { label: "Hola", correct: false }, { label: "Sí", correct: false }, { label: "No", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "🍎 Manzana", options: [{ label: "Apple", correct: true }, { label: "Orange", correct: false }, { label: "Banana", correct: false }, { label: "Grape", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "🌙 Luna", options: [{ label: "Moon", correct: true }, { label: "Sun", correct: false }, { label: "Star", correct: false }, { label: "Cloud", correct: false }] },
  { instruction: "¿Qué significa en español?", display: "Thank you", options: [{ label: "Gracias", correct: true }, { label: "Por favor", correct: false }, { label: "Hola", correct: false }, { label: "Perdón", correct: false }] },
  { instruction: "¿Cómo se dice en inglés?", display: "🌞 Sol", options: [{ label: "Sun", correct: true }, { label: "Moon", correct: false }, { label: "Rain", correct: false }, { label: "Wind", correct: false }] },
];

// ─── PRIMARIA MATEMÁTICAS ─────────────────────────────────────────────────────

export const primariaMatematicas: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿Cuánto es?", display: "2 + 3 = ?", options: [{ label: "5", correct: true }, { label: "4", correct: false }, { label: "6", correct: false }, { label: "3", correct: false }] },
    { instruction: "¿Cuánto es?", display: "4 + 4 = ?", options: [{ label: "8", correct: true }, { label: "6", correct: false }, { label: "7", correct: false }, { label: "9", correct: false }] },
    { instruction: "¿Cuánto es?", display: "1 + 6 = ?", options: [{ label: "7", correct: true }, { label: "5", correct: false }, { label: "8", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es?", display: "5 + 3 = ?", options: [{ label: "8", correct: true }, { label: "7", correct: false }, { label: "9", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es?", display: "3 + 3 = ?", options: [{ label: "6", correct: true }, { label: "5", correct: false }, { label: "7", correct: false }, { label: "4", correct: false }] },
    { instruction: "¿Cuánto es?", display: "7 + 2 = ?", options: [{ label: "9", correct: true }, { label: "8", correct: false }, { label: "10", correct: false }, { label: "7", correct: false }] },
    { instruction: "¿Cuánto es?", display: "4 + 6 = ?", options: [{ label: "10", correct: true }, { label: "8", correct: false }, { label: "9", correct: false }, { label: "11", correct: false }] },
    { instruction: "¿Cuánto es?", display: "1 + 1 = ?", options: [{ label: "2", correct: true }, { label: "3", correct: false }, { label: "1", correct: false }, { label: "4", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cuánto es?", display: "12 + 7 = ?", options: [{ label: "19", correct: true }, { label: "18", correct: false }, { label: "20", correct: false }, { label: "17", correct: false }] },
    { instruction: "¿Cuánto es?", display: "15 - 8 = ?", options: [{ label: "7", correct: true }, { label: "6", correct: false }, { label: "8", correct: false }, { label: "9", correct: false }] },
    { instruction: "¿Cuánto es?", display: "11 + 9 = ?", options: [{ label: "20", correct: true }, { label: "19", correct: false }, { label: "21", correct: false }, { label: "18", correct: false }] },
    { instruction: "¿Cuánto es?", display: "18 - 5 = ?", options: [{ label: "13", correct: true }, { label: "12", correct: false }, { label: "14", correct: false }, { label: "11", correct: false }] },
    { instruction: "¿Cuánto es?", display: "14 + 6 = ?", options: [{ label: "20", correct: true }, { label: "18", correct: false }, { label: "19", correct: false }, { label: "21", correct: false }] },
    { instruction: "¿Cuánto es?", display: "20 - 12 = ?", options: [{ label: "8", correct: true }, { label: "7", correct: false }, { label: "9", correct: false }, { label: "10", correct: false }] },
    { instruction: "¿Cuánto es?", display: "13 + 4 = ?", options: [{ label: "17", correct: true }, { label: "16", correct: false }, { label: "18", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es?", display: "16 - 7 = ?", options: [{ label: "9", correct: true }, { label: "8", correct: false }, { label: "10", correct: false }, { label: "7", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cuánto es?", display: "3 × 4 = ?", options: [{ label: "12", correct: true }, { label: "10", correct: false }, { label: "14", correct: false }, { label: "9", correct: false }] },
    { instruction: "¿Cuánto es?", display: "5 × 5 = ?", options: [{ label: "25", correct: true }, { label: "20", correct: false }, { label: "30", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es?", display: "2 × 8 = ?", options: [{ label: "16", correct: true }, { label: "14", correct: false }, { label: "18", correct: false }, { label: "12", correct: false }] },
    { instruction: "¿Cuánto es?", display: "4 × 3 = ?", options: [{ label: "12", correct: true }, { label: "11", correct: false }, { label: "13", correct: false }, { label: "10", correct: false }] },
    { instruction: "¿Cuánto es?", display: "6 × 2 = ?", options: [{ label: "12", correct: true }, { label: "10", correct: false }, { label: "14", correct: false }, { label: "8", correct: false }] },
    { instruction: "¿Cuánto es?", display: "3 × 7 = ?", options: [{ label: "21", correct: true }, { label: "18", correct: false }, { label: "24", correct: false }, { label: "20", correct: false }] },
    { instruction: "¿Cuánto es?", display: "5 × 4 = ?", options: [{ label: "20", correct: true }, { label: "18", correct: false }, { label: "22", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es?", display: "9 × 2 = ?", options: [{ label: "18", correct: true }, { label: "16", correct: false }, { label: "20", correct: false }, { label: "17", correct: false }] },
  ],
  "4": [
    { instruction: "¿Cuánto es?", display: "24 ÷ 6 = ?", options: [{ label: "4", correct: true }, { label: "3", correct: false }, { label: "5", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es?", display: "7 × 8 = ?", options: [{ label: "56", correct: true }, { label: "54", correct: false }, { label: "58", correct: false }, { label: "48", correct: false }] },
    { instruction: "¿Cuánto es?", display: "45 ÷ 9 = ?", options: [{ label: "5", correct: true }, { label: "4", correct: false }, { label: "6", correct: false }, { label: "7", correct: false }] },
    { instruction: "¿Cuánto es?", display: "8 × 7 = ?", options: [{ label: "56", correct: true }, { label: "64", correct: false }, { label: "48", correct: false }, { label: "54", correct: false }] },
    { instruction: "¿Cuánto es?", display: "36 ÷ 4 = ?", options: [{ label: "9", correct: true }, { label: "8", correct: false }, { label: "7", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es?", display: "9 × 9 = ?", options: [{ label: "81", correct: true }, { label: "72", correct: false }, { label: "90", correct: false }, { label: "63", correct: false }] },
    { instruction: "¿Cuánto es?", display: "72 ÷ 8 = ?", options: [{ label: "9", correct: true }, { label: "8", correct: false }, { label: "7", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es?", display: "6 × 9 = ?", options: [{ label: "54", correct: true }, { label: "48", correct: false }, { label: "63", correct: false }, { label: "56", correct: false }] },
  ],
  "5": [
    { instruction: "¿Cuánto es la fracción?", display: "1/2 de 20 = ?", options: [{ label: "10", correct: true }, { label: "5", correct: false }, { label: "15", correct: false }, { label: "8", correct: false }] },
    { instruction: "¿Cuánto es la fracción?", display: "1/4 de 16 = ?", options: [{ label: "4", correct: true }, { label: "8", correct: false }, { label: "2", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto es la fracción?", display: "3/4 de 12 = ?", options: [{ label: "9", correct: true }, { label: "6", correct: false }, { label: "4", correct: false }, { label: "8", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "0.5 + 0.3 = ?", options: [{ label: "0.8", correct: true }, { label: "0.7", correct: false }, { label: "0.9", correct: false }, { label: "1.0", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "1.5 - 0.8 = ?", options: [{ label: "0.7", correct: true }, { label: "0.6", correct: false }, { label: "0.8", correct: false }, { label: "1.0", correct: false }] },
    { instruction: "¿Cuánto es?", display: "1/3 de 9 = ?", options: [{ label: "3", correct: true }, { label: "4", correct: false }, { label: "2", correct: false }, { label: "6", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "2.4 + 1.6 = ?", options: [{ label: "4.0", correct: true }, { label: "3.8", correct: false }, { label: "4.2", correct: false }, { label: "3.6", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "3.0 - 1.5 = ?", options: [{ label: "1.5", correct: true }, { label: "1.0", correct: false }, { label: "2.0", correct: false }, { label: "1.3", correct: false }] },
  ],
  "6": [
    { instruction: "¿Cuánto es el porcentaje?", display: "10% de 200 = ?", options: [{ label: "20", correct: true }, { label: "10", correct: false }, { label: "30", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es el porcentaje?", display: "25% de 80 = ?", options: [{ label: "20", correct: true }, { label: "15", correct: false }, { label: "25", correct: false }, { label: "40", correct: false }] },
    { instruction: "¿Cuánto es?", display: "50% de 150 = ?", options: [{ label: "75", correct: true }, { label: "50", correct: false }, { label: "100", correct: false }, { label: "60", correct: false }] },
    { instruction: "¿Cuánto es?", display: "140 + 260 = ?", options: [{ label: "400", correct: true }, { label: "380", correct: false }, { label: "420", correct: false }, { label: "390", correct: false }] },
    { instruction: "¿Cuánto es?", display: "5² = ?", options: [{ label: "25", correct: true }, { label: "10", correct: false }, { label: "20", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es?", display: "√144 = ?", options: [{ label: "12", correct: true }, { label: "10", correct: false }, { label: "14", correct: false }, { label: "11", correct: false }] },
    { instruction: "¿Cuánto es el porcentaje?", display: "15% de 60 = ?", options: [{ label: "9", correct: true }, { label: "6", correct: false }, { label: "12", correct: false }, { label: "15", correct: false }] },
    { instruction: "¿Cuánto es?", display: "3³ = ?", options: [{ label: "27", correct: true }, { label: "9", correct: false }, { label: "18", correct: false }, { label: "30", correct: false }] },
  ],
};

// ─── PRIMARIA GEOGRAFÍA ───────────────────────────────────────────────────────

export const primariaGeografia: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿En qué país vivimos?", display: "🇲🇽", options: [{ label: "México", correct: true }, { label: "Guatemala", correct: false }, { label: "España", correct: false }, { label: "Argentina", correct: false }] },
    { instruction: "¿Cuál es la capital de México?", display: "🏙️", options: [{ label: "Ciudad de México", correct: true }, { label: "Guadalajara", correct: false }, { label: "Monterrey", correct: false }, { label: "Puebla", correct: false }] },
    { instruction: "¿Cuántos estados tiene México?", display: "🗺️ México", options: [{ label: "32", correct: true }, { label: "30", correct: false }, { label: "28", correct: false }, { label: "34", correct: false }] },
    { instruction: "¿Qué océano está al este de México?", display: "🌊 Este", options: [{ label: "Atlántico", correct: true }, { label: "Pacífico", correct: false }, { label: "Índico", correct: false }, { label: "Ártico", correct: false }] },
    { instruction: "¿Qué océano está al oeste de México?", display: "🌊 Oeste", options: [{ label: "Pacífico", correct: true }, { label: "Atlántico", correct: false }, { label: "Índico", correct: false }, { label: "Ártico", correct: false }] },
    { instruction: "¿Cuál es el país al norte de México?", display: "⬆️ Norte", options: [{ label: "Estados Unidos", correct: true }, { label: "Canadá", correct: false }, { label: "Guatemala", correct: false }, { label: "Cuba", correct: false }] },
    { instruction: "¿Cuál es el continente de México?", display: "🌎", options: [{ label: "América", correct: true }, { label: "Europa", correct: false }, { label: "Asia", correct: false }, { label: "África", correct: false }] },
    { instruction: "¿Cuántos continentes hay en el mundo?", display: "🌍🌎🌏", options: [{ label: "7", correct: true }, { label: "5", correct: false }, { label: "6", correct: false }, { label: "8", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cuál es la capital de Jalisco?", display: "🏙️ Jalisco", options: [{ label: "Guadalajara", correct: true }, { label: "Monterrey", correct: false }, { label: "Puebla", correct: false }, { label: "León", correct: false }] },
    { instruction: "¿Cuál es la capital de Nuevo León?", display: "🏙️ N. León", options: [{ label: "Monterrey", correct: true }, { label: "Saltillo", correct: false }, { label: "Durango", correct: false }, { label: "Tampico", correct: false }] },
    { instruction: "¿Cuál es la capital de Veracruz?", display: "🏙️ Veracruz", options: [{ label: "Xalapa", correct: true }, { label: "Veracruz", correct: false }, { label: "Córdoba", correct: false }, { label: "Orizaba", correct: false }] },
    { instruction: "¿Cuál es la capital de Yucatán?", display: "🏙️ Yucatán", options: [{ label: "Mérida", correct: true }, { label: "Cancún", correct: false }, { label: "Campeche", correct: false }, { label: "Chetumal", correct: false }] },
    { instruction: "¿Cuál es la capital de Oaxaca?", display: "🏙️ Oaxaca", options: [{ label: "Oaxaca de Juárez", correct: true }, { label: "Tuxtla Gutiérrez", correct: false }, { label: "Chilpancingo", correct: false }, { label: "Cuernavaca", correct: false }] },
    { instruction: "¿Cuál es la capital de Sonora?", display: "🏙️ Sonora", options: [{ label: "Hermosillo", correct: true }, { label: "Culiacán", correct: false }, { label: "Chihuahua", correct: false }, { label: "Los Mochis", correct: false }] },
    { instruction: "¿Cuál es la capital de Puebla?", display: "🏙️ Puebla", options: [{ label: "Puebla de Zaragoza", correct: true }, { label: "Tlaxcala", correct: false }, { label: "Pachuca", correct: false }, { label: "Toluca", correct: false }] },
    { instruction: "¿Cuál es la capital de Chihuahua?", display: "🏙️ Chihuahua", options: [{ label: "Chihuahua", correct: true }, { label: "Ciudad Juárez", correct: false }, { label: "Delicias", correct: false }, { label: "Parral", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cuál es la capital de Estados Unidos?", display: "🇺🇸", options: [{ label: "Washington D.C.", correct: true }, { label: "Nueva York", correct: false }, { label: "Los Ángeles", correct: false }, { label: "Chicago", correct: false }] },
    { instruction: "¿Cuál es la capital de Canadá?", display: "🇨🇦", options: [{ label: "Ottawa", correct: true }, { label: "Toronto", correct: false }, { label: "Montreal", correct: false }, { label: "Vancouver", correct: false }] },
    { instruction: "¿Cuál es la capital de Guatemala?", display: "🇬🇹", options: [{ label: "Ciudad de Guatemala", correct: true }, { label: "San Salvador", correct: false }, { label: "Managua", correct: false }, { label: "Tegucigalpa", correct: false }] },
    { instruction: "¿Cuál es la capital de Cuba?", display: "🇨🇺", options: [{ label: "La Habana", correct: true }, { label: "Santiago", correct: false }, { label: "Camagüey", correct: false }, { label: "Holguín", correct: false }] },
    { instruction: "¿Qué río es el más largo de México?", display: "🏞️ Río", options: [{ label: "Río Bravo", correct: true }, { label: "Río Grijalva", correct: false }, { label: "Río Balsas", correct: false }, { label: "Río Lerma", correct: false }] },
    { instruction: "¿Cuál es el volcán más alto de México?", display: "🌋", options: [{ label: "Pico de Orizaba", correct: true }, { label: "Popocatépetl", correct: false }, { label: "Iztaccíhuatl", correct: false }, { label: "Nevado de Toluca", correct: false }] },
    { instruction: "¿Cuál es la capital de Costa Rica?", display: "🇨🇷", options: [{ label: "San José", correct: true }, { label: "Managua", correct: false }, { label: "Panamá", correct: false }, { label: "Tegucigalpa", correct: false }] },
    { instruction: "¿En qué mar se encuentran las costas de Cancún?", display: "🏖️ Cancún", options: [{ label: "Mar Caribe", correct: true }, { label: "Golfo de México", correct: false }, { label: "Océano Pacífico", correct: false }, { label: "Mar Mediterráneo", correct: false }] },
  ],
  "4": [
    { instruction: "¿Cuál es la capital de Brasil?", display: "🇧🇷", options: [{ label: "Brasilia", correct: true }, { label: "São Paulo", correct: false }, { label: "Río de Janeiro", correct: false }, { label: "Salvador", correct: false }] },
    { instruction: "¿Cuál es la capital de Argentina?", display: "🇦🇷", options: [{ label: "Buenos Aires", correct: true }, { label: "Córdoba", correct: false }, { label: "Rosario", correct: false }, { label: "Mendoza", correct: false }] },
    { instruction: "¿Cuál es el río más largo del mundo?", display: "🏞️ Mundo", options: [{ label: "Amazonas", correct: true }, { label: "Nilo", correct: false }, { label: "Misisipi", correct: false }, { label: "Yangtsé", correct: false }] },
    { instruction: "¿Cuál es la capital de Perú?", display: "🇵🇪", options: [{ label: "Lima", correct: true }, { label: "Bogotá", correct: false }, { label: "Quito", correct: false }, { label: "La Paz", correct: false }] },
    { instruction: "¿En qué continente está el Sahara?", display: "🏜️ Sahara", options: [{ label: "África", correct: true }, { label: "Asia", correct: false }, { label: "América", correct: false }, { label: "Australia", correct: false }] },
    { instruction: "¿Cuál es la capital de Colombia?", display: "🇨🇴", options: [{ label: "Bogotá", correct: true }, { label: "Medellín", correct: false }, { label: "Cali", correct: false }, { label: "Cartagena", correct: false }] },
    { instruction: "¿Cuál es la capital de Chile?", display: "🇨🇱", options: [{ label: "Santiago", correct: true }, { label: "Valparaíso", correct: false }, { label: "Concepción", correct: false }, { label: "Antofagasta", correct: false }] },
    { instruction: "¿Cuál es el océano más grande del mundo?", display: "🌊 Mayor", options: [{ label: "Pacífico", correct: true }, { label: "Atlántico", correct: false }, { label: "Índico", correct: false }, { label: "Ártico", correct: false }] },
  ],
  "5": [
    { instruction: "¿Cuál es la capital de Francia?", display: "🇫🇷", options: [{ label: "París", correct: true }, { label: "Lyon", correct: false }, { label: "Marsella", correct: false }, { label: "Burdeos", correct: false }] },
    { instruction: "¿Cuál es la capital de España?", display: "🇪🇸", options: [{ label: "Madrid", correct: true }, { label: "Barcelona", correct: false }, { label: "Sevilla", correct: false }, { label: "Valencia", correct: false }] },
    { instruction: "¿Cuál es la capital de Alemania?", display: "🇩🇪", options: [{ label: "Berlín", correct: true }, { label: "Múnich", correct: false }, { label: "Hamburgo", correct: false }, { label: "Frankfurt", correct: false }] },
    { instruction: "¿Cuál es la capital de Italia?", display: "🇮🇹", options: [{ label: "Roma", correct: true }, { label: "Milán", correct: false }, { label: "Nápoles", correct: false }, { label: "Florencia", correct: false }] },
    { instruction: "¿Cuál es la capital de Japón?", display: "🇯🇵", options: [{ label: "Tokio", correct: true }, { label: "Osaka", correct: false }, { label: "Kyoto", correct: false }, { label: "Hiroshima", correct: false }] },
    { instruction: "¿Cuál es la capital de China?", display: "🇨🇳", options: [{ label: "Beijing", correct: true }, { label: "Shanghái", correct: false }, { label: "Guangzhou", correct: false }, { label: "Shenzhen", correct: false }] },
    { instruction: "¿Cuál es la montaña más alta del mundo?", display: "🏔️ Más alta", options: [{ label: "Everest", correct: true }, { label: "K2", correct: false }, { label: "Kilimanjaro", correct: false }, { label: "Aconcagua", correct: false }] },
    { instruction: "¿Cuál es la capital de Australia?", display: "🇦🇺", options: [{ label: "Canberra", correct: true }, { label: "Sídney", correct: false }, { label: "Melbourne", correct: false }, { label: "Brisbane", correct: false }] },
  ],
  "6": [
    { instruction: "¿Cuál es la capital de Rusia?", display: "🇷🇺", options: [{ label: "Moscú", correct: true }, { label: "San Petersburgo", correct: false }, { label: "Novosibirsk", correct: false }, { label: "Vladivostok", correct: false }] },
    { instruction: "¿Cuál es el país más grande del mundo?", display: "🌍 Mayor", options: [{ label: "Rusia", correct: true }, { label: "Canadá", correct: false }, { label: "China", correct: false }, { label: "Estados Unidos", correct: false }] },
    { instruction: "¿Cuál es la capital de India?", display: "🇮🇳", options: [{ label: "Nueva Delhi", correct: true }, { label: "Bombay", correct: false }, { label: "Calcuta", correct: false }, { label: "Chennai", correct: false }] },
    { instruction: "¿Cuál es el continente más grande?", display: "🌏 Mayor", options: [{ label: "Asia", correct: true }, { label: "África", correct: false }, { label: "América", correct: false }, { label: "Europa", correct: false }] },
    { instruction: "¿Cuál es la capital de Egipto?", display: "🇪🇬", options: [{ label: "El Cairo", correct: true }, { label: "Alejandría", correct: false }, { label: "Luxor", correct: false }, { label: "Asuán", correct: false }] },
    { instruction: "¿Cuál es la capital de Sudáfrica?", display: "🇿🇦", options: [{ label: "Pretoria", correct: true }, { label: "Johannesburgo", correct: false }, { label: "Ciudad del Cabo", correct: false }, { label: "Durban", correct: false }] },
    { instruction: "¿Cuál es la capital de Canadá?", display: "🇨🇦", options: [{ label: "Ottawa", correct: true }, { label: "Toronto", correct: false }, { label: "Vancouver", correct: false }, { label: "Montreal", correct: false }] },
    { instruction: "¿En qué hemisferio está México?", display: "🌎 México", options: [{ label: "Norte", correct: true }, { label: "Sur", correct: false }, { label: "Este", correct: false }, { label: "Oeste", correct: false }] },
  ],
};

// ─── PRIMARIA ESPAÑOL ─────────────────────────────────────────────────────────

export const primariaEspanol: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "Completa la palabra", display: "🍎 M _ N Z A N A", options: [{ label: "A", correct: true }, { label: "E", correct: false }, { label: "O", correct: false }, { label: "I", correct: false }] },
    { instruction: "¿Cuál es el plural?", display: "Casa →", options: [{ label: "Casas", correct: true }, { label: "Casas'", correct: false }, { label: "Casaes", correct: false }, { label: "Casan", correct: false }] },
    { instruction: "¿Cuál es la vocal?", display: "P _ RRO 🐶", options: [{ label: "E", correct: true }, { label: "A", correct: false }, { label: "I", correct: false }, { label: "O", correct: false }] },
    { instruction: "¿Cuál es el plural?", display: "Árbol →", options: [{ label: "Árboles", correct: true }, { label: "Árbolies", correct: false }, { label: "Árbols", correct: false }, { label: "Árbolses", correct: false }] },
    { instruction: "Completa la palabra", display: "🚗 C _ RRO", options: [{ label: "A", correct: true }, { label: "O", correct: false }, { label: "E", correct: false }, { label: "U", correct: false }] },
    { instruction: "¿Cuál es el plural?", display: "Lápiz →", options: [{ label: "Lápices", correct: true }, { label: "Lápizes", correct: false }, { label: "Lápizs", correct: false }, { label: "Lápis", correct: false }] },
    { instruction: "Completa la palabra", display: "🌞 S _ L", options: [{ label: "O", correct: true }, { label: "A", correct: false }, { label: "E", correct: false }, { label: "U", correct: false }] },
    { instruction: "¿Cuál es el plural?", display: "Pez →", options: [{ label: "Peces", correct: true }, { label: "Pezs", correct: false }, { label: "Pezes", correct: false }, { label: "Pecis", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cuál es el sinónimo?", display: "Bonito =", options: [{ label: "Lindo", correct: true }, { label: "Feo", correct: false }, { label: "Grande", correct: false }, { label: "Triste", correct: false }] },
    { instruction: "¿Cuál es el sinónimo?", display: "Veloz =", options: [{ label: "Rápido", correct: true }, { label: "Lento", correct: false }, { label: "Quieto", correct: false }, { label: "Fuerte", correct: false }] },
    { instruction: "¿Cuál es el antónimo?", display: "Frío ≠", options: [{ label: "Caliente", correct: true }, { label: "Tibio", correct: false }, { label: "Fresco", correct: false }, { label: "Húmedo", correct: false }] },
    { instruction: "¿Cuál es el antónimo?", display: "Grande ≠", options: [{ label: "Pequeño", correct: true }, { label: "Enorme", correct: false }, { label: "Gordo", correct: false }, { label: "Largo", correct: false }] },
    { instruction: "¿Cuál es el sinónimo?", display: "Alegre =", options: [{ label: "Feliz", correct: true }, { label: "Triste", correct: false }, { label: "Enojado", correct: false }, { label: "Aburrido", correct: false }] },
    { instruction: "¿Cuál es el antónimo?", display: "Arriba ≠", options: [{ label: "Abajo", correct: true }, { label: "Lado", correct: false }, { label: "Atrás", correct: false }, { label: "Cerca", correct: false }] },
    { instruction: "¿Cuál es el sinónimo?", display: "Comenzar =", options: [{ label: "Iniciar", correct: true }, { label: "Terminar", correct: false }, { label: "Pausar", correct: false }, { label: "Detener", correct: false }] },
    { instruction: "¿Cuál es el antónimo?", display: "Noche ≠", options: [{ label: "Día", correct: true }, { label: "Tarde", correct: false }, { label: "Madrugada", correct: false }, { label: "Amanecer", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cuál es el verbo?", display: "Ella corre muy rápido", options: [{ label: "Corre", correct: true }, { label: "Ella", correct: false }, { label: "Muy", correct: false }, { label: "Rápido", correct: false }] },
    { instruction: "¿Cuál es el sujeto?", display: "El perro ladra fuerte", options: [{ label: "El perro", correct: true }, { label: "Ladra fuerte", correct: false }, { label: "Fuerte", correct: false }, { label: "El", correct: false }] },
    { instruction: "¿Cuál es el predicado?", display: "María come tacos", options: [{ label: "Come tacos", correct: true }, { label: "María", correct: false }, { label: "Tacos", correct: false }, { label: "Come", correct: false }] },
    { instruction: "¿Qué tipo de oración es?", display: "¿Cómo te llamas?", options: [{ label: "Interrogativa", correct: true }, { label: "Exclamativa", correct: false }, { label: "Declarativa", correct: false }, { label: "Negativa", correct: false }] },
    { instruction: "¿Qué tipo de oración es?", display: "¡Qué bello día!", options: [{ label: "Exclamativa", correct: true }, { label: "Interrogativa", correct: false }, { label: "Negativa", correct: false }, { label: "Declarativa", correct: false }] },
    { instruction: "¿Cuál es el sustantivo?", display: "El gato duerme", options: [{ label: "Gato", correct: true }, { label: "El", correct: false }, { label: "Duerme", correct: false }, { label: "El gato", correct: false }] },
    { instruction: "¿Cuál es el adjetivo?", display: "La casa grande", options: [{ label: "Grande", correct: true }, { label: "Casa", correct: false }, { label: "La", correct: false }, { label: "La casa", correct: false }] },
    { instruction: "¿Cuál es la forma correcta?", display: "Yo ___ al parque", options: [{ label: "Voy", correct: true }, { label: "Va", correct: false }, { label: "Van", correct: false }, { label: "Vamos", correct: false }] },
  ],
  "4": [
    { instruction: "¿En qué tiempo está el verbo?", display: "Ayer comí pizza", options: [{ label: "Pasado", correct: true }, { label: "Presente", correct: false }, { label: "Futuro", correct: false }, { label: "Condicional", correct: false }] },
    { instruction: "¿En qué tiempo está el verbo?", display: "Mañana estudiaré", options: [{ label: "Futuro", correct: true }, { label: "Presente", correct: false }, { label: "Pasado", correct: false }, { label: "Condicional", correct: false }] },
    { instruction: "¿Cuál es el complemento directo?", display: "Ella compró flores", options: [{ label: "Flores", correct: true }, { label: "Ella", correct: false }, { label: "Compró", correct: false }, { label: "Compró flores", correct: false }] },
    { instruction: "¿Cómo se escribe correctamente?", display: "___ber (el vegetal)", options: [{ label: "Jitomate", correct: false }, { label: "Jitomate", correct: false }, { label: "Tomate", correct: true }, { label: "Tomato", correct: false }] },
    { instruction: "¿Cuál va con 'h'?", display: "___ola / ___ ola", options: [{ label: "Hola", correct: true }, { label: "Ola", correct: false }, { label: "Ambas", correct: false }, { label: "Ninguna", correct: false }] },
    { instruction: "¿Cuál es el adverbio?", display: "Ella canta muy bien", options: [{ label: "Muy bien", correct: true }, { label: "Ella", correct: false }, { label: "Canta", correct: false }, { label: "Canta muy", correct: false }] },
    { instruction: "¿Cómo se llama la tilde de interrogación?", display: "¿ ?", options: [{ label: "Signo de interrogación", correct: true }, { label: "Signo de exclamación", correct: false }, { label: "Acento", correct: false }, { label: "Coma", correct: false }] },
    { instruction: "¿Cuál es la conjunción?", display: "Juan y María van", options: [{ label: "Y", correct: true }, { label: "Juan", correct: false }, { label: "Van", correct: false }, { label: "María", correct: false }] },
  ],
  "5": [
    { instruction: "¿Qué figura retórica es?", display: '"El cielo llora" (lluvia)', options: [{ label: "Metáfora", correct: true }, { label: "Símil", correct: false }, { label: "Hipérbole", correct: false }, { label: "Aliteración", correct: false }] },
    { instruction: "¿Qué figura retórica es?", display: '"Tan fuerte como un toro"', options: [{ label: "Símil", correct: true }, { label: "Metáfora", correct: false }, { label: "Hipérbole", correct: false }, { label: "Onomatopeya", correct: false }] },
    { instruction: "¿Cómo se llama este tipo de texto?", display: "Había una vez una princesa…", options: [{ label: "Cuento", correct: true }, { label: "Noticia", correct: false }, { label: "Receta", correct: false }, { label: "Carta", correct: false }] },
    { instruction: "¿Cuál es el conector de tiempo?", display: "___ terminé, salí", options: [{ label: "Cuando", correct: true }, { label: "Aunque", correct: false }, { label: "Porque", correct: false }, { label: "Pero", correct: false }] },
    { instruction: "¿Qué es la moraleja?", display: "Al final de una fábula", options: [{ label: "La enseñanza", correct: true }, { label: "El personaje", correct: false }, { label: "El lugar", correct: false }, { label: "El conflicto", correct: false }] },
    { instruction: "¿Cuál es el verbo en modo subjuntivo?", display: "Espero que ___", options: [{ label: "Vengas", correct: true }, { label: "Vienes", correct: false }, { label: "Viniste", correct: false }, { label: "Vendrás", correct: false }] },
    { instruction: "¿Cuál es el sinónimo de 'arduo'?", display: "Arduo =", options: [{ label: "Difícil", correct: true }, { label: "Fácil", correct: false }, { label: "Corto", correct: false }, { label: "Agradable", correct: false }] },
    { instruction: "¿Qué tipo de narrador es?", display: '"Yo caminé al bosque..."', options: [{ label: "1ª persona", correct: true }, { label: "2ª persona", correct: false }, { label: "3ª persona", correct: false }, { label: "Omnisciente", correct: false }] },
  ],
  "6": [
    { instruction: "¿Qué es un argumento?", display: "En un texto persuasivo", options: [{ label: "Razón para defender una idea", correct: true }, { label: "Resumen del texto", correct: false }, { label: "Introducción del tema", correct: false }, { label: "Conclusión del autor", correct: false }] },
    { instruction: "¿Cuál es la voz pasiva?", display: "Voz activa: María leyó el libro", options: [{ label: "El libro fue leído por María", correct: true }, { label: "María lee el libro", correct: false }, { label: "El libro lo lee María", correct: false }, { label: "María leerá el libro", correct: false }] },
    { instruction: "¿Qué tipo de texto es?", display: "Ingredientes:\n-Harina\n-Huevos\nPreparación: Mezclar…", options: [{ label: "Receta", correct: true }, { label: "Cuento", correct: false }, { label: "Noticia", correct: false }, { label: "Carta", correct: false }] },
    { instruction: "¿Qué significa el prefijo 'in-'?", display: "Incorrecto, inútil", options: [{ label: "Negación", correct: true }, { label: "Repetición", correct: false }, { label: "Antes de", correct: false }, { label: "Dentro de", correct: false }] },
    { instruction: "¿Qué es un ensayo?", display: "Texto académico", options: [{ label: "Texto con opinión y argumentos", correct: true }, { label: "Historia de ficción", correct: false }, { label: "Lista de hechos", correct: false }, { label: "Conversación escrita", correct: false }] },
    { instruction: "¿Cómo se llama el inicio de un texto?", display: "Primera parte", options: [{ label: "Introducción", correct: true }, { label: "Desarrollo", correct: false }, { label: "Conclusión", correct: false }, { label: "Anexo", correct: false }] },
    { instruction: "¿Qué es la coherencia textual?", display: "Calidad del texto", options: [{ label: "Las ideas tienen sentido entre sí", correct: true }, { label: "Usar palabras difíciles", correct: false }, { label: "Texto muy largo", correct: false }, { label: "Tener muchos personajes", correct: false }] },
    { instruction: "¿Qué signo se usa para citas?", display: '"Texto citado"', options: [{ label: "Comillas", correct: true }, { label: "Paréntesis", correct: false }, { label: "Guiones", correct: false }, { label: "Corchetes", correct: false }] },
  ],
};

// ─── PRIMARIA INGLÉS ──────────────────────────────────────────────────────────

export const primariaIngles: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿Cómo se dice en inglés?", display: "🔴 Rojo", options: [{ label: "Red", correct: true }, { label: "Blue", correct: false }, { label: "Green", correct: false }, { label: "Yellow", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "3️⃣ Tres", options: [{ label: "Three", correct: true }, { label: "Two", correct: false }, { label: "Four", correct: false }, { label: "Five", correct: false }] },
    { instruction: "¿Qué significa?", display: "Happy", options: [{ label: "Feliz", correct: true }, { label: "Triste", correct: false }, { label: "Enojado", correct: false }, { label: "Cansado", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "🐱 Gato", options: [{ label: "Cat", correct: true }, { label: "Dog", correct: false }, { label: "Cow", correct: false }, { label: "Bird", correct: false }] },
    { instruction: "¿Qué significa?", display: "Big", options: [{ label: "Grande", correct: true }, { label: "Pequeño", correct: false }, { label: "Alto", correct: false }, { label: "Gordo", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "🏠 Casa", options: [{ label: "House", correct: true }, { label: "School", correct: false }, { label: "Store", correct: false }, { label: "Park", correct: false }] },
    { instruction: "¿Qué significa?", display: "Small", options: [{ label: "Pequeño", correct: true }, { label: "Grande", correct: false }, { label: "Redondo", correct: false }, { label: "Suave", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "👋 Hola", options: [{ label: "Hello", correct: true }, { label: "Bye", correct: false }, { label: "Yes", correct: false }, { label: "No", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cómo se dice en inglés?", display: "👨‍👩‍👧 Familia", options: [{ label: "Family", correct: true }, { label: "Friends", correct: false }, { label: "People", correct: false }, { label: "Team", correct: false }] },
    { instruction: "¿Qué significa?", display: "Mother", options: [{ label: "Mamá", correct: true }, { label: "Papá", correct: false }, { label: "Hermana", correct: false }, { label: "Abuela", correct: false }] },
    { instruction: "¿Qué significa?", display: "Brother", options: [{ label: "Hermano", correct: true }, { label: "Hermana", correct: false }, { label: "Primo", correct: false }, { label: "Amigo", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "👁️ Ojo", options: [{ label: "Eye", correct: true }, { label: "Ear", correct: false }, { label: "Nose", correct: false }, { label: "Mouth", correct: false }] },
    { instruction: "¿Qué significa?", display: "Monday", options: [{ label: "Lunes", correct: true }, { label: "Martes", correct: false }, { label: "Miércoles", correct: false }, { label: "Jueves", correct: false }] },
    { instruction: "¿Qué significa?", display: "Friday", options: [{ label: "Viernes", correct: true }, { label: "Jueves", correct: false }, { label: "Sábado", correct: false }, { label: "Domingo", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "✋ Mano", options: [{ label: "Hand", correct: true }, { label: "Foot", correct: false }, { label: "Arm", correct: false }, { label: "Leg", correct: false }] },
    { instruction: "¿Qué significa?", display: "Sister", options: [{ label: "Hermana", correct: true }, { label: "Madre", correct: false }, { label: "Amiga", correct: false }, { label: "Prima", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cómo se dice en inglés?", display: "📏 Regla", options: [{ label: "Ruler", correct: true }, { label: "Pencil", correct: false }, { label: "Book", correct: false }, { label: "Eraser", correct: false }] },
    { instruction: "Completa: 'I ___ a student'", display: "I ___ a student", options: [{ label: "am", correct: true }, { label: "is", correct: false }, { label: "are", correct: false }, { label: "be", correct: false }] },
    { instruction: "¿Qué significa?", display: "She is tall", options: [{ label: "Ella es alta", correct: true }, { label: "Él es alto", correct: false }, { label: "Somos altos", correct: false }, { label: "Son altas", correct: false }] },
    { instruction: "¿Qué significa?", display: "Notebook", options: [{ label: "Cuaderno", correct: true }, { label: "Libro", correct: false }, { label: "Mochila", correct: false }, { label: "Lápiz", correct: false }] },
    { instruction: "¿Cómo se dice?", display: "We ___ friends", options: [{ label: "are", correct: true }, { label: "am", correct: false }, { label: "is", correct: false }, { label: "be", correct: false }] },
    { instruction: "¿Qué significa?", display: "There is a cat", options: [{ label: "Hay un gato", correct: true }, { label: "Un gato aquí", correct: false }, { label: "Vi un gato", correct: false }, { label: "Hay gatos", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "✏️ Lápiz", options: [{ label: "Pencil", correct: true }, { label: "Pen", correct: false }, { label: "Crayon", correct: false }, { label: "Marker", correct: false }] },
    { instruction: "¿Qué significa?", display: "My name is...", options: [{ label: "Mi nombre es...", correct: true }, { label: "Tu nombre es...", correct: false }, { label: "Su nombre es...", correct: false }, { label: "Nuestro nombre es...", correct: false }] },
  ],
  "4": [
    { instruction: "¿Qué significa?", display: "I like to play", options: [{ label: "Me gusta jugar", correct: true }, { label: "Yo juego bien", correct: false }, { label: "Juego mucho", correct: false }, { label: "Estoy jugando", correct: false }] },
    { instruction: "¿Cuál es el verbo?", display: "She runs every day", options: [{ label: "Runs", correct: true }, { label: "She", correct: false }, { label: "Every", correct: false }, { label: "Day", correct: false }] },
    { instruction: "¿Cómo se dice en inglés?", display: "Yo como pan", options: [{ label: "I eat bread", correct: true }, { label: "I like bread", correct: false }, { label: "I cook bread", correct: false }, { label: "I buy bread", correct: false }] },
    { instruction: "¿Cómo es el plural?", display: "One cat → ___", options: [{ label: "Two cats", correct: true }, { label: "Two cat", correct: false }, { label: "Two cates", correct: false }, { label: "Two catis", correct: false }] },
    { instruction: "¿Qué significa?", display: "He doesn't like pizza", options: [{ label: "A él no le gusta la pizza", correct: true }, { label: "Él ama la pizza", correct: false }, { label: "No hay pizza", correct: false }, { label: "Él come pizza", correct: false }] },
    { instruction: "¿Cómo se pregunta?", display: "_____ you like music?", options: [{ label: "Do", correct: true }, { label: "Does", correct: false }, { label: "Is", correct: false }, { label: "Are", correct: false }] },
    { instruction: "¿Qué significa?", display: "What time is it?", options: [{ label: "¿Qué hora es?", correct: true }, { label: "¿Cómo estás?", correct: false }, { label: "¿Dónde estás?", correct: false }, { label: "¿Cuándo llegaste?", correct: false }] },
    { instruction: "¿Cómo se dice?", display: "Ellos estudian", options: [{ label: "They study", correct: true }, { label: "They studies", correct: false }, { label: "They studying", correct: false }, { label: "They studys", correct: false }] },
  ],
  "5": [
    { instruction: "¿Cuál es la forma correcta?", display: "She ___ (go) to school", options: [{ label: "goes", correct: true }, { label: "go", correct: false }, { label: "going", correct: false }, { label: "goed", correct: false }] },
    { instruction: "¿Qué significa?", display: "I went to the store", options: [{ label: "Fui a la tienda", correct: true }, { label: "Voy a la tienda", correct: false }, { label: "Iré a la tienda", correct: false }, { label: "Estoy en la tienda", correct: false }] },
    { instruction: "¿Cuál es el pasado?", display: "Eat → ___", options: [{ label: "Ate", correct: true }, { label: "Eated", correct: false }, { label: "Eaten", correct: false }, { label: "Eat", correct: false }] },
    { instruction: "¿Qué significa?", display: "She was at home", options: [{ label: "Ella estaba en casa", correct: true }, { label: "Ella está en casa", correct: false }, { label: "Ella irá a casa", correct: false }, { label: "Ella vive en casa", correct: false }] },
    { instruction: "¿Cuál es el pasado?", display: "Run → ___", options: [{ label: "Ran", correct: true }, { label: "Runned", correct: false }, { label: "Running", correct: false }, { label: "Runs", correct: false }] },
    { instruction: "¿Cómo se pregunta en pasado?", display: "_____ he go to the park?", options: [{ label: "Did", correct: true }, { label: "Does", correct: false }, { label: "Do", correct: false }, { label: "Was", correct: false }] },
    { instruction: "¿Qué significa?", display: "We didn't eat lunch", options: [{ label: "No almorzamos", correct: true }, { label: "Almorzamos tarde", correct: false }, { label: "Estamos almorzando", correct: false }, { label: "Ya almorzamos", correct: false }] },
    { instruction: "¿Cuál es el pasado?", display: "See → ___", options: [{ label: "Saw", correct: true }, { label: "Seed", correct: false }, { label: "Seen", correct: false }, { label: "Sawed", correct: false }] },
  ],
  "6": [
    { instruction: "¿Qué tiempo verbal es?", display: "I have eaten already", options: [{ label: "Presente perfecto", correct: true }, { label: "Pasado simple", correct: false }, { label: "Presente simple", correct: false }, { label: "Futuro", correct: false }] },
    { instruction: "¿Cómo se forma?", display: "Presente perfecto = have/has + ___", options: [{ label: "Participio pasado", correct: true }, { label: "Infinitivo", correct: false }, { label: "Gerundio", correct: false }, { label: "Presente", correct: false }] },
    { instruction: "¿Cuál es la forma correcta?", display: "She ___ already left", options: [{ label: "has", correct: true }, { label: "have", correct: false }, { label: "had", correct: false }, { label: "is", correct: false }] },
    { instruction: "¿Qué significa?", display: "I will travel next year", options: [{ label: "Viajaré el año próximo", correct: true }, { label: "Viajé el año pasado", correct: false }, { label: "Estoy viajando", correct: false }, { label: "Me gusta viajar", correct: false }] },
    { instruction: "¿Cómo se forma el futuro con 'will'?", display: "will + ___", options: [{ label: "Infinitivo sin 'to'", correct: true }, { label: "Gerundio (-ing)", correct: false }, { label: "Participio pasado", correct: false }, { label: "Presente simple", correct: false }] },
    { instruction: "¿Qué significa?", display: "They would help if they could", options: [{ label: "Ayudarían si pudieran", correct: true }, { label: "Ellos ayudan siempre", correct: false }, { label: "Ellos ayudaron ayer", correct: false }, { label: "Ellos quieren ayudar", correct: false }] },
    { instruction: "¿Cuál es el participio de 'write'?", display: "Write → ___", options: [{ label: "Written", correct: true }, { label: "Wrote", correct: false }, { label: "Writing", correct: false }, { label: "Writed", correct: false }] },
    { instruction: "¿Qué significa 'although'?", display: "Although it rained...", options: [{ label: "Aunque llovió...", correct: true }, { label: "Porque llovió...", correct: false }, { label: "Cuando llovió...", correct: false }, { label: "Si llovió...", correct: false }] },
  ],
};

// ─── SECUNDARIA ÁLGEBRA ───────────────────────────────────────────────────────

export const secundariaAlgebra: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "Resuelve la ecuación", display: "x + 5 = 12 → x = ?", options: [{ label: "7", correct: true }, { label: "6", correct: false }, { label: "8", correct: false }, { label: "17", correct: false }] },
    { instruction: "Resuelve la ecuación", display: "2x = 14 → x = ?", options: [{ label: "7", correct: true }, { label: "12", correct: false }, { label: "8", correct: false }, { label: "6", correct: false }] },
    { instruction: "Resuelve la ecuación", display: "x - 3 = 9 → x = ?", options: [{ label: "12", correct: true }, { label: "6", correct: false }, { label: "11", correct: false }, { label: "13", correct: false }] },
    { instruction: "Resuelve la ecuación", display: "3x + 1 = 10 → x = ?", options: [{ label: "3", correct: true }, { label: "4", correct: false }, { label: "2", correct: false }, { label: "5", correct: false }] },
    { instruction: "Resuelve la ecuación", display: "x/2 = 6 → x = ?", options: [{ label: "12", correct: true }, { label: "3", correct: false }, { label: "8", correct: false }, { label: "10", correct: false }] },
    { instruction: "Resuelve la ecuación", display: "5x - 5 = 20 → x = ?", options: [{ label: "5", correct: true }, { label: "4", correct: false }, { label: "6", correct: false }, { label: "3", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "Si x=3, entonces 2x+4 = ?", options: [{ label: "10", correct: true }, { label: "9", correct: false }, { label: "11", correct: false }, { label: "8", correct: false }] },
    { instruction: "Resuelve", display: "4(x + 2) = 16 → x = ?", options: [{ label: "2", correct: true }, { label: "3", correct: false }, { label: "1", correct: false }, { label: "4", correct: false }] },
  ],
  "2": [
    { instruction: "Resuelve el sistema", display: "x+y=5, x-y=1 → x=?", options: [{ label: "3", correct: true }, { label: "2", correct: false }, { label: "4", correct: false }, { label: "5", correct: false }] },
    { instruction: "Resuelve el sistema", display: "x+y=5, x-y=1 → y=?", options: [{ label: "2", correct: true }, { label: "3", correct: false }, { label: "1", correct: false }, { label: "4", correct: false }] },
    { instruction: "Factoriza", display: "x² - 9 = ?", options: [{ label: "(x+3)(x-3)", correct: true }, { label: "(x+9)(x-1)", correct: false }, { label: "(x-3)²", correct: false }, { label: "(x+3)²", correct: false }] },
    { instruction: "¿Cuánto vale?", display: "x² cuando x=4", options: [{ label: "16", correct: true }, { label: "8", correct: false }, { label: "12", correct: false }, { label: "20", correct: false }] },
    { instruction: "Simplifica", display: "6x² ÷ 3x = ?", options: [{ label: "2x", correct: true }, { label: "3x", correct: false }, { label: "2x²", correct: false }, { label: "6x", correct: false }] },
    { instruction: "Expande", display: "(x + 3)² = ?", options: [{ label: "x²+6x+9", correct: true }, { label: "x²+3x+9", correct: false }, { label: "x²+9", correct: false }, { label: "x²+6x+6", correct: false }] },
    { instruction: "Resuelve", display: "2x + 3y = 12\nx = 3 → y = ?", options: [{ label: "2", correct: true }, { label: "3", correct: false }, { label: "4", correct: false }, { label: "1", correct: false }] },
    { instruction: "¿Cuál es la pendiente?", display: "y = 3x + 2", options: [{ label: "3", correct: true }, { label: "2", correct: false }, { label: "-3", correct: false }, { label: "1", correct: false }] },
  ],
  "3": [
    { instruction: "Resuelve la cuadrática", display: "x² - 5x + 6 = 0 → x = ?", options: [{ label: "2 y 3", correct: true }, { label: "1 y 6", correct: false }, { label: "-2 y -3", correct: false }, { label: "4 y 1", correct: false }] },
    { instruction: "Usa la fórmula cuadrática", display: "x²- 4 = 0 → x = ?", options: [{ label: "±2", correct: true }, { label: "±4", correct: false }, { label: "±1", correct: false }, { label: "2 sola", correct: false }] },
    { instruction: "¿Cuántas soluciones tiene?", display: "Discriminante > 0", options: [{ label: "Dos soluciones reales", correct: true }, { label: "Una solución", correct: false }, { label: "Sin solución real", correct: false }, { label: "Infinitas", correct: false }] },
    { instruction: "Simplifica", display: "√(x²) = ?", options: [{ label: "|x|", correct: true }, { label: "x", correct: false }, { label: "x²", correct: false }, { label: "2x", correct: false }] },
    { instruction: "¿Cuánto es?", display: "log₁₀(100) = ?", options: [{ label: "2", correct: true }, { label: "10", correct: false }, { label: "1", correct: false }, { label: "100", correct: false }] },
    { instruction: "Factoriza completamente", display: "2x² + 4x = ?", options: [{ label: "2x(x + 2)", correct: true }, { label: "x(2x + 4)", correct: false }, { label: "2(x² + 2x)", correct: false }, { label: "2x² + 4x", correct: false }] },
    { instruction: "¿Cuál es la solución?", display: "x² + 2x + 1 = 0 → x = ?", options: [{ label: "-1", correct: true }, { label: "1", correct: false }, { label: "-2", correct: false }, { label: "2", correct: false }] },
    { instruction: "¿Cuánto es?", display: "2³ × 2² = ?", options: [{ label: "32", correct: true }, { label: "16", correct: false }, { label: "64", correct: false }, { label: "12", correct: false }] },
  ],
};

// ─── SECUNDARIA HISTORIA ──────────────────────────────────────────────────────

export const secundariaHistoria: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿Dónde surgió la civilización mesopotámica?", display: "🏺 Mesopotamia", options: [{ label: "Entre el Tigris y el Éufrates", correct: true }, { label: "Junto al Nilo", correct: false }, { label: "En la India", correct: false }, { label: "En China", correct: false }] },
    { instruction: "¿Quién construyó las pirámides?", display: "🔺 Pirámides de Giza", options: [{ label: "Los egipcios", correct: true }, { label: "Los griegos", correct: false }, { label: "Los romanos", correct: false }, { label: "Los aztecas", correct: false }] },
    { instruction: "¿Cuál fue la primera escritura conocida?", display: "📜 Escritura", options: [{ label: "Cuneiforme (sumeria)", correct: true }, { label: "Jeroglífica", correct: false }, { label: "Griega", correct: false }, { label: "Latina", correct: false }] },
    { instruction: "¿Quién fue Alejandro Magno?", display: "⚔️ Alejandro", options: [{ label: "Rey macedonio que conquistó el mundo conocido", correct: true }, { label: "Filósofo griego", correct: false }, { label: "Emperador romano", correct: false }, { label: "Rey persa", correct: false }] },
    { instruction: "¿En qué ciudad nació la democracia?", display: "🏛️ Democracia", options: [{ label: "Atenas", correct: true }, { label: "Roma", correct: false }, { label: "Esparta", correct: false }, { label: "Alejandría", correct: false }] },
    { instruction: "¿Cuándo comenzó el Imperio Romano?", display: "🦅 Roma", options: [{ label: "27 a.C.", correct: true }, { label: "476 d.C.", correct: false }, { label: "0 d.C.", correct: false }, { label: "753 a.C.", correct: false }] },
    { instruction: "¿Cuál fue la primera gran civilización mesoamericana?", display: "🌽 Mesoamérica", options: [{ label: "Olmeca", correct: true }, { label: "Azteca", correct: false }, { label: "Maya", correct: false }, { label: "Tolteca", correct: false }] },
    { instruction: "¿Dónde se desarrolló la cultura Maya?", display: "🗿 Mayas", options: [{ label: "Yucatán y Centroamérica", correct: true }, { label: "Valle de México", correct: false }, { label: "Costa del Pacífico", correct: false }, { label: "Andes peruanos", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cuándo cayó el Imperio Romano de Occidente?", display: "🏛️ Caída Roma", options: [{ label: "476 d.C.", correct: true }, { label: "1453 d.C.", correct: false }, { label: "330 d.C.", correct: false }, { label: "800 d.C.", correct: false }] },
    { instruction: "¿Qué fue la Edad Media?", display: "🏰 Edad Media", options: [{ label: "S. V al XV d.C.", correct: true }, { label: "S. I al V d.C.", correct: false }, { label: "S. XV al XVIII", correct: false }, { label: "S. X al XIII", correct: false }] },
    { instruction: "¿En qué año llegó Colón a América?", display: "⛵ Colón", options: [{ label: "1492", correct: true }, { label: "1502", correct: false }, { label: "1488", correct: false }, { label: "1519", correct: false }] },
    { instruction: "¿Quién financió el viaje de Colón?", display: "👑 Patrocinadores", options: [{ label: "Reyes Católicos de España", correct: true }, { label: "El rey de Portugal", correct: false }, { label: "El papa de Roma", correct: false }, { label: "El rey de Francia", correct: false }] },
    { instruction: "¿Qué fue el feudalismo?", display: "🏰 Feudalismo", options: [{ label: "Sistema político y social medieval", correct: true }, { label: "Tipo de religión", correct: false }, { label: "Forma de comercio", correct: false }, { label: "Estilo arquitectónico", correct: false }] },
    { instruction: "¿Qué fue la Reconquista española?", display: "⚔️ Reconquista", options: [{ label: "Recuperación de España de los musulmanes", correct: true }, { label: "Conquista de América", correct: false }, { label: "Guerra civil española", correct: false }, { label: "Conquista de Portugal", correct: false }] },
    { instruction: "¿Quién conquistó México-Tenochtitlán?", display: "⚔️ Conquista", options: [{ label: "Hernán Cortés", correct: true }, { label: "Francisco Pizarro", correct: false }, { label: "Cristóbal Colón", correct: false }, { label: "Diego de Almagro", correct: false }] },
    { instruction: "¿En qué año cayó Tenochtitlán?", display: "🏙️ Tenochtitlán", options: [{ label: "1521", correct: true }, { label: "1492", correct: false }, { label: "1519", correct: false }, { label: "1535", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cuándo fue la Revolución Francesa?", display: "🇫🇷 Revolución", options: [{ label: "1789", correct: true }, { label: "1776", correct: false }, { label: "1800", correct: false }, { label: "1848", correct: false }] },
    { instruction: "¿Cuándo fue la Independencia de México?", display: "🇲🇽 Independencia", options: [{ label: "1821", correct: true }, { label: "1810", correct: false }, { label: "1815", correct: false }, { label: "1823", correct: false }] },
    { instruction: "¿Quién inició el movimiento de Independencia de México?", display: "⛪ Inicio", options: [{ label: "Miguel Hidalgo", correct: true }, { label: "José María Morelos", correct: false }, { label: "Agustín de Iturbide", correct: false }, { label: "Vicente Guerrero", correct: false }] },
    { instruction: "¿Cuándo fue la Revolución Mexicana?", display: "🇲🇽 Revolución", options: [{ label: "1910", correct: true }, { label: "1876", correct: false }, { label: "1917", correct: false }, { label: "1900", correct: false }] },
    { instruction: "¿Cuándo fue la Primera Guerra Mundial?", display: "⚔️ I Guerra", options: [{ label: "1914-1918", correct: true }, { label: "1939-1945", correct: false }, { label: "1905-1910", correct: false }, { label: "1918-1922", correct: false }] },
    { instruction: "¿Cuándo fue la Segunda Guerra Mundial?", display: "⚔️ II Guerra", options: [{ label: "1939-1945", correct: true }, { label: "1914-1918", correct: false }, { label: "1936-1940", correct: false }, { label: "1940-1946", correct: false }] },
    { instruction: "¿Qué fue la Guerra Fría?", display: "🌐 Guerra Fría", options: [{ label: "Tensión entre EE.UU. y URSS", correct: true }, { label: "Guerra en el Ártico", correct: false }, { label: "Conflicto en Corea", correct: false }, { label: "Rivalidad económica", correct: false }] },
    { instruction: "¿Cuándo cayó el Muro de Berlín?", display: "🧱 Berlín", options: [{ label: "1989", correct: true }, { label: "1991", correct: false }, { label: "1985", correct: false }, { label: "1979", correct: false }] },
  ],
};

// ─── SECUNDARIA CIENCIAS ──────────────────────────────────────────────────────

export const secundariaCiencias: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿Qué es la célula?", display: "🔬 Célula", options: [{ label: "Unidad básica de la vida", correct: true }, { label: "Parte del ADN", correct: false }, { label: "Tipo de tejido", correct: false }, { label: "Órgano del cuerpo", correct: false }] },
    { instruction: "¿Qué organelo produce energía?", display: "⚡ Energía celular", options: [{ label: "Mitocondria", correct: true }, { label: "Núcleo", correct: false }, { label: "Ribosoma", correct: false }, { label: "Vacuola", correct: false }] },
    { instruction: "¿Qué contiene el núcleo celular?", display: "🧬 Núcleo", options: [{ label: "ADN / Material genético", correct: true }, { label: "Energía", correct: false }, { label: "Proteínas", correct: false }, { label: "Agua", correct: false }] },
    { instruction: "¿Qué es la fotosíntesis?", display: "🌿 Fotosíntesis", options: [{ label: "Las plantas convierten luz en alimento", correct: true }, { label: "Las plantas absorben agua", correct: false }, { label: "Las plantas respiran", correct: false }, { label: "Las plantas crecen", correct: false }] },
    { instruction: "¿Cuántos pares de cromosomas tiene el ser humano?", display: "🧬 Cromosomas", options: [{ label: "23 pares", correct: true }, { label: "46 pares", correct: false }, { label: "24 pares", correct: false }, { label: "12 pares", correct: false }] },
    { instruction: "¿Qué tipo de célula NO tiene núcleo?", display: "🔬 Sin núcleo", options: [{ label: "Procariota", correct: true }, { label: "Eucariota", correct: false }, { label: "Animal", correct: false }, { label: "Vegetal", correct: false }] },
    { instruction: "¿Qué sistema transporta la sangre?", display: "❤️ Sangre", options: [{ label: "Circulatorio", correct: true }, { label: "Respiratorio", correct: false }, { label: "Digestivo", correct: false }, { label: "Nervioso", correct: false }] },
    { instruction: "¿Cuántos huesos tiene el cuerpo humano adulto?", display: "🦴 Huesos", options: [{ label: "206", correct: true }, { label: "300", correct: false }, { label: "150", correct: false }, { label: "250", correct: false }] },
  ],
  "2": [
    { instruction: "¿Cuántos elementos hay en la tabla periódica?", display: "⚗️ Tabla periódica", options: [{ label: "118", correct: true }, { label: "100", correct: false }, { label: "92", correct: false }, { label: "130", correct: false }] },
    { instruction: "¿Cuál es el símbolo del oro?", display: "🥇 Oro", options: [{ label: "Au", correct: true }, { label: "Go", correct: false }, { label: "Or", correct: false }, { label: "Ag", correct: false }] },
    { instruction: "¿Cuál es el símbolo del hierro?", display: "⚙️ Hierro", options: [{ label: "Fe", correct: true }, { label: "Hi", correct: false }, { label: "Ir", correct: false }, { label: "He", correct: false }] },
    { instruction: "¿Qué es una mezcla homogénea?", display: "🧪 Mezcla", options: [{ label: "Composición uniforme (ej. sal en agua)", correct: true }, { label: "Componentes visibles", correct: false }, { label: "Dos líquidos que no se mezclan", correct: false }, { label: "Solo sólidos mezclados", correct: false }] },
    { instruction: "¿Cuál es la fórmula del agua?", display: "💧 Agua", options: [{ label: "H₂O", correct: true }, { label: "HO₂", correct: false }, { label: "H₂O₂", correct: false }, { label: "OH", correct: false }] },
    { instruction: "¿Qué es un ácido?", display: "⚗️ Ácido", options: [{ label: "Sustancia con pH < 7", correct: true }, { label: "Sustancia con pH > 7", correct: false }, { label: "Sustancia con pH = 7", correct: false }, { label: "Sal disuelta en agua", correct: false }] },
    { instruction: "¿Qué es CO₂?", display: "💨 CO₂", options: [{ label: "Dióxido de carbono", correct: true }, { label: "Monóxido de carbono", correct: false }, { label: "Oxígeno", correct: false }, { label: "Nitrógeno", correct: false }] },
    { instruction: "¿Cuánto es el número atómico del oxígeno?", display: "O Oxígeno", options: [{ label: "8", correct: true }, { label: "6", correct: false }, { label: "16", correct: false }, { label: "2", correct: false }] },
  ],
  "3": [
    { instruction: "¿Cuál es la unidad de fuerza?", display: "💪 Fuerza", options: [{ label: "Newton (N)", correct: true }, { label: "Joule (J)", correct: false }, { label: "Watt (W)", correct: false }, { label: "Pascal (Pa)", correct: false }] },
    { instruction: "¿Qué es la velocidad?", display: "🚀 Velocidad", options: [{ label: "Distancia ÷ tiempo", correct: true }, { label: "Masa × aceleración", correct: false }, { label: "Fuerza ÷ masa", correct: false }, { label: "Energía × tiempo", correct: false }] },
    { instruction: "¿Cuánto es la velocidad de la luz?", display: "💡 Luz", options: [{ label: "300,000 km/s", correct: true }, { label: "30,000 km/s", correct: false }, { label: "3,000 km/s", correct: false }, { label: "3,000,000 km/s", correct: false }] },
    { instruction: "Primera ley de Newton: un objeto en reposo...", display: "🔵 1ª Ley Newton", options: [{ label: "Permanece en reposo a menos que actúe una fuerza", correct: true }, { label: "Se mueve con aceleración constante", correct: false }, { label: "Siempre cae hacia abajo", correct: false }, { label: "Gira sobre su eje", correct: false }] },
    { instruction: "F = m × a. Si m=5kg y a=3m/s², ¿F=?", display: "F = m × a", options: [{ label: "15 N", correct: true }, { label: "8 N", correct: false }, { label: "2 N", correct: false }, { label: "10 N", correct: false }] },
    { instruction: "¿Qué es la energía cinética?", display: "⚡ E. Cinética", options: [{ label: "Energía del movimiento", correct: true }, { label: "Energía almacenada", correct: false }, { label: "Energía nuclear", correct: false }, { label: "Energía química", correct: false }] },
    { instruction: "¿Cuál es la unidad de energía?", display: "🔋 Energía", options: [{ label: "Joule (J)", correct: true }, { label: "Newton (N)", correct: false }, { label: "Watt (W)", correct: false }, { label: "Metro (m)", correct: false }] },
    { instruction: "¿Cuánto es la gravedad en la Tierra?", display: "🌍 Gravedad", options: [{ label: "9.8 m/s²", correct: true }, { label: "10.2 m/s²", correct: false }, { label: "6.7 m/s²", correct: false }, { label: "9.0 m/s²", correct: false }] },
  ],
};

// ─── SECUNDARIA INGLÉS ────────────────────────────────────────────────────────

export const secundariaIngles: Record<string, GameQuestion[]> = {
  "1": [
    { instruction: "¿Qué tiempo verbal es?", display: "I have studied all day", options: [{ label: "Presente perfecto", correct: true }, { label: "Pasado simple", correct: false }, { label: "Presente continuo", correct: false }, { label: "Futuro perfecto", correct: false }] },
    { instruction: "¿Cuál es la forma correcta?", display: "She ___ (live) here for 5 years", options: [{ label: "has lived", correct: true }, { label: "lived", correct: false }, { label: "is living", correct: false }, { label: "lives", correct: false }] },
    { instruction: "¿Qué significa?", display: "Have you ever been to Paris?", options: [{ label: "¿Has estado alguna vez en París?", correct: true }, { label: "¿Estás en París?", correct: false }, { label: "¿Fuiste a París?", correct: false }, { label: "¿Te gustó París?", correct: false }] },
    { instruction: "Pasado de 'go'", display: "go → ___", options: [{ label: "went", correct: true }, { label: "goed", correct: false }, { label: "gone", correct: false }, { label: "going", correct: false }] },
    { instruction: "¿Cuál es el participio?", display: "take → ___", options: [{ label: "taken", correct: true }, { label: "took", correct: false }, { label: "taking", correct: false }, { label: "taked", correct: false }] },
    { instruction: "¿Qué significa 'yet'?", display: "I haven't finished yet", options: [{ label: "todavía", correct: true }, { label: "ya", correct: false }, { label: "nunca", correct: false }, { label: "siempre", correct: false }] },
    { instruction: "¿Qué significa 'already'?", display: "I have already eaten", options: [{ label: "Ya", correct: true }, { label: "Todavía", correct: false }, { label: "Nunca", correct: false }, { label: "Antes", correct: false }] },
    { instruction: "¿Cuál es correcto?", display: "I ___ never seen a whale", options: [{ label: "have", correct: true }, { label: "has", correct: false }, { label: "had", correct: false }, { label: "am", correct: false }] },
  ],
  "2": [
    { instruction: "¿Qué tipo de condicional es?", display: "If I have time, I will help you", options: [{ label: "Primer condicional (real)", correct: true }, { label: "Segundo condicional (irreal)", correct: false }, { label: "Tercer condicional (pasado)", correct: false }, { label: "Condicional cero", correct: false }] },
    { instruction: "¿Cuál es correcto? (2nd conditional)", display: "If I ___ rich, I would travel", options: [{ label: "were", correct: true }, { label: "am", correct: false }, { label: "will be", correct: false }, { label: "have been", correct: false }] },
    { instruction: "¿Qué significa?", display: "If it rained, we would stay home", options: [{ label: "Si lloviera, nos quedaríamos en casa", correct: true }, { label: "Cuando llueve, nos quedamos", correct: false }, { label: "Si llueve mañana, quedémonos", correct: false }, { label: "Llovió y nos quedamos", correct: false }] },
    { instruction: "Completa el condicional cero", display: "If you heat water, it ___", options: [{ label: "boils", correct: true }, { label: "will boil", correct: false }, { label: "would boil", correct: false }, { label: "boiled", correct: false }] },
    { instruction: "¿Qué significa 'unless'?", display: "Unless you study...", options: [{ label: "A menos que estudies...", correct: true }, { label: "Si estudias...", correct: false }, { label: "Cuando estudies...", correct: false }, { label: "Aunque estudies...", correct: false }] },
    { instruction: "¿Cuál es correcto? (3rd cond.)", display: "If I ___ studied, I would have passed", options: [{ label: "had", correct: true }, { label: "have", correct: false }, { label: "was", correct: false }, { label: "did", correct: false }] },
    { instruction: "¿Qué tipo de condicional es?", display: "If I had known, I would have helped", options: [{ label: "Tercer condicional", correct: true }, { label: "Primer condicional", correct: false }, { label: "Segundo condicional", correct: false }, { label: "Cero condicional", correct: false }] },
    { instruction: "¿Qué significa 'provided that'?", display: "You can go provided that...", options: [{ label: "Con la condición de que...", correct: true }, { label: "Aunque...", correct: false }, { label: "Porque...", correct: false }, { label: "A pesar de que...", correct: false }] },
  ],
  "3": [
    { instruction: "¿Qué es la voz pasiva?", display: "Active: He wrote the book", options: [{ label: "The book was written by him", correct: true }, { label: "He writes the book", correct: false }, { label: "The book he wrote", correct: false }, { label: "He had written the book", correct: false }] },
    { instruction: "¿Cuál es la forma correcta?", display: "The cake ___ (make) by my mom", options: [{ label: "was made", correct: true }, { label: "made", correct: false }, { label: "is making", correct: false }, { label: "makes", correct: false }] },
    { instruction: "¿Qué significa?", display: "The report must be submitted by Friday", options: [{ label: "El reporte debe entregarse el viernes", correct: true }, { label: "El reporte fue enviado el viernes", correct: false }, { label: "El reporte se envió antes del viernes", correct: false }, { label: "El reporte será enviado", correct: false }] },
    { instruction: "¿Qué es un 'gerund'?", display: "Swimming is fun", options: [{ label: "Verbo usado como sustantivo (-ing)", correct: true }, { label: "Tiempo continuo", correct: false }, { label: "Participio pasado", correct: false }, { label: "Verbo irregular", correct: false }] },
    { instruction: "¿Qué es un 'infinitive'?", display: "I want to go", options: [{ label: "Forma base del verbo (to + verb)", correct: true }, { label: "Verbo en pasado", correct: false }, { label: "Verbo en presente", correct: false }, { label: "Verbo con -ing", correct: false }] },
    { instruction: "Completa con la forma correcta", display: "She enjoys ___ (read)", options: [{ label: "reading", correct: true }, { label: "to read", correct: false }, { label: "reads", correct: false }, { label: "read", correct: false }] },
    { instruction: "¿Cuál es la reportada?", display: "Direct: 'I am happy'", options: [{ label: "She said she was happy", correct: true }, { label: "She said she is happy", correct: false }, { label: "She says she was happy", correct: false }, { label: "She told she is happy", correct: false }] },
    { instruction: "¿Qué significa 'despite'?", display: "Despite the rain...", options: [{ label: "A pesar de la lluvia...", correct: true }, { label: "Debido a la lluvia...", correct: false }, { label: "Si llueve...", correct: false }, { label: "Cuando llueve...", correct: false }] },
  ],
};
