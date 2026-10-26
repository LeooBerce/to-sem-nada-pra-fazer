let quizData = {
    age: null, weight: null, height: null,
    selectedSport: null, selectedFrequency: null
};

// Inicializar partículas decorativas no plano de fundo
function initBackgroundParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}vw`;
        p.style.width = p.style.height = `${Math.random() * 4 + 2}px`;
        p.style.animationDelay = `${Math.random() * 7}s`;
        p.style.animationDuration = `${Math.random() * 5 + 6}s`;
        container.appendChild(p);
    }
}

// Navegação entre cartões
function nextStep(current, next) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
}

function validateBiometrics() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
        alert('CRITICAL_ERROR: Dados corporais inconsistentes ou ausentes.');
        return;
    }
    quizData.age = age; quizData.weight = weight; quizData.height = height;
    nextStep('biometrics', 'sports');
}

// Selecionar categoria de esporte
function selectSport(sport, el) {
    el.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    quizData.selectedSport = sport;
}

function validateSport() {
    if (!quizData.selectedSport) {
        alert('CRITICAL_ERROR: Selecione um vetor operacional.');
        return;
    }
    nextStep('sports', 'frequency');
}

// Selecionar frequência semanal
function selectFrequency(freq, el) {
    el.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    quizData.selectedFrequency = freq;
}

// --- ANIMAÇÃO HOLOGRÁFICA DE EXTRAÇÃO DE DADOS ---
function runDataExtractionAnimation() {
    if (quizData.selectedFrequency === null) {
        alert('CRITICAL_ERROR: Selecione a frequência operacional.');
        return;
    }

    document.getElementById('step-frequency').classList.remove('active');
    document.getElementById('step-scanning').style.display = 'flex';

    // Gerar partículas subindo do corpo humano
    const partContainer = document.getElementById('data-particles');
    partContainer.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const chunk = document.createElement('div');
        chunk.classList.add('data-chunk');
        chunk.style.left = `${Math.random() * 60 + 20}%`;
        chunk.style.animationDelay = `${Math.random() * 1.5}s`;
        partContainer.appendChild(chunk);
    }

    // Logs técnicos correndo na tela
    const logs = [
        "Connecting to bio-receptors...",
        "Extracting mass indexes...",
        "Analyzing kinetic profile: " + quizData.selectedSport.toUpperCase(),
        "Compiling chronological variables...",
        "Calculating metabolic efficiency...",
        "De-identifying final data logs...",
        "SUCCESS: Bio-Report ready."
    ];
    
    const feed = document.getElementById('terminal-feed');
    feed.innerHTML = '';
    logs.forEach((log, index) => {
        setTimeout(() => {
            feed.innerHTML += `<div>> ${log}</div>`;
            feed.scrollTop = feed.scrollHeight;
        }, index * 350);
    });

    // Avança para a tela de resultados após a animação acabar
    setTimeout(() => {
        document.getElementById('step-scanning').style.display = 'none';
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

    // Animar círculo de progresso
    const circle = document.getElementById('progress-bar-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (finalPercentage / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    
    // Contador numérico de 0% até o valor final
    let currentPct = 0;
    const counterInterval = setInterval(() => {
        if (currentPct >= finalPercentage) {
            clearInterval(counterInterval);
        } else {
            currentPct++;
            document.getElementById('percentage-val').innerText = `${currentPct}%`;
        }
    }, 15);

    // Mudar cores neon conforme o nível atingido
    const statusBadge = document.getElementById('health-status');
    const neonGreen = '#39ff14';
    const neonCyan = '#00f0ff';
    const neonMagenta = '#ff007f';

    if (finalPercentage >= 80) {
        statusBadge.innerText = "NÍVEL: ALTA EFICIÊNCIA BIOLÓGICA (ÓTIMO)";
        statusBadge.style.color = neonGreen;
        circle.style.stroke = neonGreen;
    } else if (finalPercentage >= 50) {
        statusBadge.innerText = "NÍVEL: ADAPTAÇÃO INTERMEDIÁRIA (MODERADO)";
        statusBadge.style.color = neonCyan;
        circle.style.stroke = neonCyan;
    } else {
        statusBadge.innerText = "NÍVEL: CRÍTICO // ENGENHARIA DE HÁBITOS REQUERIDA";
        statusBadge.style.color = neonMagenta;
        circle.style.stroke = neonMagenta;
    }

    // Injetar os feedbacks customizados
    document.getElementById('feedback-tips').innerHTML = generateAdvancedTips(finalPercentage);
    document.getElementById('step-result').classList.add('active');
}

function generateAdvancedTips(pct) {
    if (pct >= 80) {
        return `<strong>Protocolo Nutricional:</strong> Balanço normocalórico. Priorize proteínas magras de alta absorção e carboidratos de baixo índice glicêmico para sustentar glicogênio.<br><br><strong>Planejamento Cinético:</strong> Mantenha a periodização atual e aplique técnicas de sobrecarga progressiva para quebrar platôs adaptativos.`;
    } else if (pct >= 50) {
        return `<strong>Protocolo Nutricional:</strong> Reestruturação metabólica. Incremente o consumo hídrico basal diário (35ml/kg) e reduza xenobióticos (ultraprocessados).<br><br><strong>Planejamento Cinético:</strong> Incremente 1 ciclo semanal extra na modalidade escolhida para forçar adaptações cardiovasculares estáveis.`;
    } else {
        return `<strong>Protocolo Nutricional:</strong> Choque anti-inflamatório. Redução agressiva de açúcares refinados e inserção obrigatória de micronutrientes folhosos em 100% das grandes refeições.<br><br><strong>Planejamento Cinético:</strong> Quebra do estado de inércia celular. Realize caminhadas diárias contínuas de 25 minutos em jejum ou pós-refeição.`;
    }
}

function restartQuiz() {
    quizData = { age: null, weight: null, height: null, selectedSport: null, selectedFrequency: null };
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    
    document.getElementById('step-result').classList.remove('active');
    nextStep('result', 'welcome');
}

window.onload = () => {
    initBackgroundParticles();
};
