/**
 * Explorando a Austrália 🇦🇺 - Módulo Principal Interativo
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de todos os módulos
    initQuizEngine();
    initSlangGenerator();
    initFactCounter();
    initSoundEffects();
    initEasterEgg();
});

/* ==========================================================================
   1. QUIZ INTERATIVO AVANÇADO
   ========================================================================== */
const quizData = [
    {
        question: "Qual é a verdadeira capital da Austrália?",
        options: ["Sydney", "Melbourne", "Camberra", "Brisbane"],
        correct: 2,
        explanation: "Camberra foi planejada do zero no meio do caminho entre Sydney e Melbourne para resolver a disputa entre as duas cidades!"
    },
    {
        question: "Qual destes animais NÃO é nativo do continente australiano?",
        options: ["Ornitorrinco", "Tigre-de-sundarbans", "Diabo da Tasmânia", "Wombat"],
        correct: 1,
        explanation: "Tigres são nativos do continente asiático, enquanto os outros são espécies exclusivamente da Australásia!"
    },
    {
        question: "Quantas praias existem aproximadamente na Austrália?",
        options: ["Cerca de 1.000", "Aproximadamente 5.000", "Mais de 10.000", "Exatamente 500"],
        correct: 2,
        explanation: "São mais de 10.600 praias! Se você visitasse uma nova praia todos os dias, levaria mais de 29 anos."
    },
    {
        question: "O que é o 'Outback' australiano?",
        options: [
            "Um restaurante famoso",
            "A vasta região interior, semiárida e remota do país",
            "Uma floresta tropical no sul",
            "O nome da maior praia de surfe"
        ],
        correct: 1,
        explanation: "O Outback cobre a maior parte da Austrália e é conhecido por suas terras avermelhadas e paisagens desérticas."
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

function initQuizEngine() {
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");

    // Se as tags do quiz não existirem no HTML, interrompe a execução suavemente
    if (!questionEl || !optionsEl) return;

    renderQuestion();
}

function renderQuestion() {
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");

    if (feedbackEl) feedbackEl.innerText = "";

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.innerText = `[${currentQuestionIndex + 1}/${quizData.length}] ${currentQuiz.question}`;
    optionsEl.innerHTML = "";

    currentQuiz.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.className = "quiz-option";
        button.innerText = optionText;
        button.addEventListener("click", () => handleAnswerSelect(index));
        optionsEl.appendChild(button);
    });
}

function handleAnswerSelect(selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById("quiz-feedback");
    const scoreEl = document.getElementById("score");
    const allButtons = document.querySelectorAll(".quiz-option");

    // Desabilita botões para evitar cliques duplos
    allButtons.forEach(btn => btn.style.pointerEvents = "none");

    if (selectedIndex === currentQuiz.correct) {
        userScore += 10;
        if (feedbackEl) {
            feedbackEl.style.color = "#4ade80";
            feedbackEl.innerText = "✨ Correto! " + currentQuiz.explanation;
        }
    } else {
        if (feedbackEl) {
            feedbackEl.style.color = "#f87171";
            feedbackEl.innerText = "❌ Ops! " + currentQuiz.explanation;
        }
    }

    if (scoreEl) scoreEl.innerText = userScore;

    // Próxima pergunta após 3.5 segundos
    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
        renderQuestion();
    }, 3500);
}

/* ==========================================================================
   2. GERADOR DE GÍRIAS (DICIONÁRIO AUSSIE)
   ========================================================================== */
const aussieSlangs = [
    { term: "G'day", meaning: "Olá / Bom dia!", example: "G'day mate, how are you going?" },
    { term: "Barbie", meaning: "Churrasco (Barbecue)", example: "Let's put some bangers on the barbie!" },
    { term: "Arvo", meaning: "Tarde (Afternoon)", example: "See you this arvo!" },
    { term: "Brekky", meaning: "Café da manhã", example: "Time for a big brekky." },
    { term: "No worries", meaning: "Sem problemas / De nada", example: "Thanks for helping! - No worries!" },
    { term: "Dunny", meaning: "Banheiro", example: "Where is the dunny?" },
    { term: "Chock-a-block", meaning: "Completamente cheio", example: "The beach was chock-a-block today." }
];

function initSlangGenerator() {
    const slangDisplay = document.getElementById("slang-display");
    if (!slangDisplay) return;

    displayRandomSlang();
}

function displayRandomSlang() {
    const slangDisplay = document.getElementById("slang-display");
    if (!slangDisplay) return;

    const randomIndex = Math.floor(Math.random() * aussieSlangs.length);
    const item = aussieSlangs[randomIndex];

    // Efeito visual de fade suave ao trocar
    slangDisplay.style.opacity = "0";
    setTimeout(() => {
        slangDisplay.innerHTML = `<strong>"${item.term}"</strong> = ${item.meaning}<br><small style="font-size: 0.9rem; opacity: 0.8; font-style: italic;">Exemplo: "${item.example}"</small>`;
        slangDisplay.style.opacity = "1";
    }, 200);
}

// Expõe a função globalmente para o botão do HTML
window.nextSlang = displayRandomSlang;

/* ==========================================================================
   3. CONTADOR ANIMADO DE ESTATÍSTICAS
   ========================================================================== */
function initFactCounter() {
    const statsData = [
        { id: "stat-beaches", target: 10685, suffix: " praias" },
        { id: "stat-roos", target: 50, suffix: " milhões de cangurus" },
        { id: "stat-endemic", target: 80, suffix: "% de espécies únicas" }
    ];

    // Animação simples de incremento numérico
    statsData.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (!el) return;

        let current = 0;
        const step = Math.ceil(stat.target / 50);
        const timer = setInterval(() => {
            current += step;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            el.innerText = `${current.toLocaleString()}${stat.suffix}`;
        }, 30);
    });
}

/* ==========================================================================
   4. EFEITOS DE AUDIO & FEEDBACK INTERATIVO (OPCIONAL)
   ========================================================================== */
function initSoundEffects() {
    // Adiciona feedback tátil/visual suave aos botões da página
    const buttons = document.querySelectorAll("button, .card");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            btn.style.transition = "transform 0.2s ease";
        });
    });
}

/* ==========================================================================
   5. EASTER EGG DA AUSTRÁLIA (DE CABEÇA PARA BAIXO!)
   ========================================================================== */
function initEasterEgg() {
    let keysTyped = "";
    const secretCode = "aussie";

    window.addEventListener("keydown", (e) => {
        keysTyped += e.key.toLowerCase();
        if (keysTyped.length > secretCode.length) {
            keysTyped = keysTyped.substr(keysTyped.length - secretCode.length);
        }

        if (keysTyped === secretCode) {
            triggerDownUnderMode();
        }
    });
}

function triggerDownUnderMode() {
    alert("🦘 Você ativou o Modo Land Down Under! Bem-vindo ao lado oposto do mundo!");
    document.body.style.transition = "transform 1.5s ease-in-out";
    document.body.style.transform = "rotate(180deg)";
    
    setTimeout(() => {
        document.body.style.transform = "rotate(0deg)";
    }, 5000);
}
