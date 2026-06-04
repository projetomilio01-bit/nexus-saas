const questions = [
  {
    question: "Quanto tempo livre você possui por dia?",
    answers: [
      "Menos de 1 hora",
      "1 a 2 horas",
      "2 a 4 horas",
      "Mais de 4 horas",
    ],
  },

  {
    question: "Você prefere oportunidades:",
    answers: ["Online", "Presenciais", "Ambos"],
  },

  {
    question: "Qual habilidade mais combina com você?",
    answers: [
      "Comunicação",
      "Criatividade",
      "Tecnologia",
      "Vendas",
      "Organização",
    ],
  },

  {
    question: "Você possui algum valor disponível para começar?",
    answers: ["Nenhum", "Até R$100", "Até R$500", "Mais de R$500"],
  },

  {
    question: "Qual seu principal objetivo hoje?",
    answers: [
      "Renda extra",
      "Sair das dívidas",
      "Liberdade financeira",
      "Trabalhar usando celular",
    ],
  },
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

function renderQuestion() {
  const q = questions[currentQuestion];

  questionEl.innerText = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");

    btn.innerText = answer;

    btn.onclick = nextQuestion;

    answersEl.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    startAnalysis();

    return;
  }

  renderQuestion();
}

function startAnalysis() {
  document.getElementById("quizScreen").style.display = "none";

  document.getElementById("analysisScreen").style.display = "flex";

  setTimeout(() => {
    document.getElementById("analysisScreen").style.display = "none";

    document.getElementById("resultScreen").style.display = "flex";

    const numero = Math.floor(Math.random() * (39 - 31 + 1)) + 31;

    document.getElementById("numeroResultado").innerText = numero;
  }, 4000);
}

renderQuestion();

function showStep(index) {
  const steps = document.querySelectorAll(".timeline-step");
  const cards = document.querySelectorAll(".timeline-card");

  steps.forEach((step) => step.classList.remove("active"));
  cards.forEach((card) => card.classList.remove("active"));

  steps[index].classList.add("active");
  cards[index].classList.add("active");
}
const quizQuestions = [
  {
    question: "Qual sua situação hoje?",
    options: [
      "Trabalho CLT e quero renda extra",
      "Estou buscando uma nova fonte de renda",
      "Quero trabalhar usando celular e internet",
      "Quero mais liberdade financeira",
    ],
  },
  {
    question: "Quanto tempo você consegue dedicar por dia?",
    options: [
      "Menos de 1 hora",
      "Entre 1 e 2 horas",
      "Entre 2 e 4 horas",
      "Mais de 4 horas",
    ],
  },
  {
    question: "Você possui algum dinheiro para começar?",
    options: [
      "Quero começar sem investir",
      "Até R$100",
      "Entre R$100 e R$500",
      "Mais de R$500",
    ],
  },
  {
    question: "Qual dessas frases mais combina com você?",
    options: [
      "Prefiro trabalhar usando celular e internet",
      "Gosto de conversar e ajudar pessoas",
      "Prefiro algo simples e prático",
      "Quero construir algo que cresça no futuro",
    ],
  },
  {
    question: "Qual seu maior desafio hoje?",
    options: [
      "Falta de dinheiro",
      "Falta de direção",
      "Falta de tempo",
      "Medo de começar errado",
    ],
  },
];

let quizIndex = 0;

function startQuiz() {
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = quizQuestions[quizIndex];
  const percent = Math.round(((quizIndex + 1) / quizQuestions.length) * 100);

  document.getElementById("questionCounter").innerText =
    `Pergunta ${quizIndex + 1} de ${quizQuestions.length}`;

  document.getElementById("questionPercent").innerText = `${percent}%`;
  document.getElementById("quizProgressFill").style.width = `${percent}%`;
  document.getElementById("questionTitle").innerText = current.question;

  const optionsArea = document.getElementById("optionsArea");
  optionsArea.innerHTML = "";

  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = option;
    btn.onclick = nextQuizQuestion;
    optionsArea.appendChild(btn);
  });
}

function nextQuizQuestion() {
  quizIndex++;

  if (quizIndex >= quizQuestions.length) {
    startFakeLoading();
  } else {
    renderQuizQuestion();
  }
}

function startFakeLoading() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("loadingScreen").style.display = "block";

  const steps = [
    { percent: 17, text: "Identificando oportunidades compatíveis..." },
    { percent: 46, text: "Analisando seu tempo disponível..." },
    { percent: 72, text: "Calculando perfil de execução..." },
    { percent: 93, text: "Preparando seu plano personalizado..." },
    { percent: 100, text: "Análise concluída com sucesso." },
  ];

  let stepIndex = 0;

  const interval = setInterval(() => {
    const step = steps[stepIndex];

    document.getElementById("fakeProgressFill").style.width = `${step.percent}%`;
    document.getElementById("fakeProgressPercent").innerText = `${step.percent}%`;
    document.getElementById("loadingText").innerText = step.text;

    stepIndex++;

    if (stepIndex >= steps.length) {
      clearInterval(interval);

      setTimeout(() => {
        showQuizResult();
      }, 700);
    }
  }, 900);
}

function showQuizResult() {
  const number = Math.floor(Math.random() * (39 - 31 + 1)) + 31;

  document.getElementById("loadingScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";
  document.getElementById("resultNumber").innerText = number;
}
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".strategy-card, .idea-card");

  cards.forEach(function (card) {
    const title = card.querySelector("h2");
    if (!title) return;

    if (card.querySelector(".ai-plan-btn")) return;

    const button = document.createElement("button");
    button.className = "ai-plan-btn";
    button.textContent = "🤖 Gerar Plano de Ação";

    button.onclick = function () {
      const opportunity = title.innerText.replace(/^\d+\.\s*/, "");

      const prompt =
        "Quero aprender sobre " +
        opportunity +
        " do zero.\n\n" +
        "Crie um plano completo para iniciante contendo:\n\n" +
        "1. O que é " +
        opportunity +
        "\n" +
        "2. Como funciona\n" +
        "3. O que preciso aprender\n" +
        "4. Ferramentas necessárias\n" +
        "5. Como conseguir os primeiros clientes ou vendas\n" +
        "6. Quanto posso cobrar ou ganhar\n" +
        "7. O que pesquisar no YouTube\n" +
        "8. Erros que devo evitar\n" +
        "9. Plano de ação para os próximos 7 dias";

      navigator.clipboard.writeText(prompt);
      alert("Plano copiado! Cole no ChatGPT, Gemini ou Claude.");
    };

    card.appendChild(button);
  });
});