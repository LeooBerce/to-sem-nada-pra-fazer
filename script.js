let quizData = {
    age: null, weight: null, height: null,
    selectedSport: null, selectedFrequency: null
};

// Gerador de partículas de fundo
function initBackgroundParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}vw`;
        p.style.width = p.style.height = `${Math.random() * 3 + 2}px`;
        p.style.animationDelay = `${Math.random() * 6}s`;
        p.style.animationDuration = `${Math.random() * 5 + 6}s`;
        container.appendChild(p);
    }
}

// Controle de Navegação das Etapas
function nextStep(current, next) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
}

// Validador de dados corporais
function validateBiometrics() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
        alert('CRITICAL_ERROR: Parâmetros corporais inválidos.');
        return;
    }
    quizData.age = age; quizData.weight = weight; quizData.height = height;
    nextStep('biometrics', 'sports');
}

// Seleção de Esportes e Frequência
function selectSport(sport, el) {
    el.parentElement.querySelectorAll('.premium-option-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    quizData.selectedSport = sport;
}

function validateSport() {
    if (!quizData.selectedSport) {
        alert('CRITICAL_ERROR: Selecione uma preferência cinética.');
        return;
    }
    nextStep('sports', 'frequency');
}

function selectFrequency(freq, el) {
    el.parentElement.querySelectorAll('.premium-option-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    quizData.selectedFrequency = freq;
}

// --- ENGINE DE ANIMAÇÃO HOLOGRÁFICA DO CORPO ---
function runDataExtractionAnimation() {
    if (quizData.selectedFrequency === null) {
        alert('CRITICAL_ERROR: Frequência operacional não selecionada.');
        return;
    }

    document.getElementById('step-frequency').classList.remove('active');
    
    const scanStep = document.getElementById('step-scanning');
    scanStep.style.display = 'flex';
    // Pequeno delay para forçar a renderização do display flex antes da animação
    setTimeout(() => { scanStep.classList.add('active'); }, 50);

    // Gerar as partículas dentro do holograma
    const partContainer = document.getElementById('data-particles');
    partContainer.innerHTML = '';
    for (let i = 0; i < 35; i++) {
        const chunk = document.createElement('div');
        chunk.classList.add('data-chunk');
        chunk.style.left = `${Math.random() * 50 + 25}%`;
        chunk.style.animationDelay = `${Math.random() * 1.2}s`;
        partContainer.appendChild(chunk);
    }

    // Gerador de logs do terminal
    const logs = [
        "Estabilizando canal de conexão molecular...",
        "Calculando densidade e índices de massa corpórea...",
        "Mapeando perfil dinâmico cinético: " + quizData.selectedSport.toUpperCase(),
        "Interpretando variáveis de frequência cronológica...",
        "Processando modelo de eficiência adaptativa...",
        "De-identificando logs para total confidencialidade...",
        "SUCESSO: Relatório gerado com integridade."
    ];
    
    const feed = document.getElementById('terminal-feed');
    feed.innerHTML = '';
    logs.forEach((log, index) => {
        setTimeout(() => {
            feed.innerHTML += `<div>[SYSTEM] ${log}</div>`;
            feed.scrollTop = feed.scrollHeight;
        }, index * 350);
    });

    // Encerrar animação e calcular
    setTimeout(() => {
        scanStep.style.display = 'none';
        scanStep.classList.remove('active');
        calculateResults();
    }, 2800);
}

function calculateResults() {
    const heightInMeters = quizData.height / 100;
    const bmi = quizData.weight / (heightInMeters * heightInMeters);
    
    let bmiScore = 0;
    if (bmi >= 18.5 && bmi <= 24.9) bmiScore = 40;
    else if ((bmi >= 25 && bmi <= 29.9) || (bmi >= 17 && bmi < 18.5)) bmiScore = 25;
    else bmiScore = 10;

    let freqScore = quizData.selectedFrequency === 0 ? 0 : 
                    quizData.selectedFrequency <= 2 ? 25 : 
                    quizData.selectedFrequency <= 4 ? 50 : 60;

    let bonus = (quizData.selectedSport !== 'low' && quizData.selectedFrequency > 0) ? 10 : 0;
    let finalPercentage = Math.min(bmiScore + freqScore + bonus, 100);

    // Ajuste dinâmico do anel gráfico circular
    const circle = document.getElementById('progress-bar-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (finalPercentage / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    
    // Contador numérico central
    let currentPct = 0;
    const counterInterval = setInterval(() => {
        if (currentPct >= finalPercentage) {
            clearInterval(counterInterval);
        } else {
            currentPct++;
            document.getElementById('percentage-val').innerText = `${currentPct}%`;
        }
    }, 15);

    // Atualização de cores com base no resultado
    const statusBadge = document.getElementById('health-status');
    const neonEmerald = '#10b981';
    const neonCyan = '#00f0ff';
    const neonRose = '#f43f5e';

    if (finalPercentage >= 80) {
        statusBadge.innerText = "SINAL BIO-EFICIENTE // EXCELENTE";
        statusBadge.style.color = neonEmerald;
        circle.style.stroke = neonEmerald;
    } else if (finalPercentage >= 50) {
        statusBadge.innerText = "SINAL EM ADAPTAÇÃO // MODERADO";
        statusBadge.style.color = neonCyan;
        circle.style.stroke = neonCyan;
    } else {
        statusBadge.innerText = "ALERTA DE EFICIÊNCIA // REESTRUTURAÇÃO REQUERIDA";
        statusBadge.style.color = neonRose;
        circle.style.stroke = neonRose;
    }

    document.getElementById('feedback-tips').innerHTML = generateAdvancedTips(finalPercentage);
    document.getElementById('step-result').classList.add('active');
}

function generateAdvancedTips(pct) {
    if (pct >= 80) {
        return `<strong>Diretriz Nutricional:</strong> Mantenha um balanço normocalórico balanceado. Priorize fontes de proteínas limpas de alto valor biológico e gorduras insaturadas.<br><br><strong>Planejamento Físico:</strong> Sustente a consistência atual. Recomenda-se introduzir estratégias de microciclos de força e choque metabólico para manter o corpo em evolução contínua.`;
    } else if (pct >= 50) {
        return `<strong>Diretriz Nutricional:</strong> Correção metabólica ativa. Otimize sua hidratação basal para 35ml por quilograma e elimine alimentos ultraprocessados da rotina semanal.<br><br><strong>Planejamento Físico:</strong> Expanda sua frequência operacional adicionando um dia extra na semana dedicado à modalidade escolhida para consolidar adaptações fisiológicas profundas.`;
    } else {
        return `<strong>Diretriz Nutricional:</strong> Protocolo anti-inflamatório emergencial. Restrinja carboidratos refinados e insira vegetais folhosos e fibras de forma obrigatória em suas refeições principais.<br><br><strong>Planejamento Físico:</strong> Reversão imediata do quadro de inércia celular. Implemente sessões curtas e diárias de caminhadas aceleradas (25 min) ou pequenos circuitos funcionais estruturados para ativar o metabolismo.`;
    }
}

function restartQuiz() {
    quizData = { age: null, weight: null, height: null, selectedSport: null, selectedFrequency: null };
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.querySelectorAll('.premium-option-card').forEach(c => c.classList.remove('selected'));
    
    document.getElementById('step-result').classList.remove('active');
    nextStep('result', 'welcome');
}

window.onload = () => {
    initBackgroundParticles();
};