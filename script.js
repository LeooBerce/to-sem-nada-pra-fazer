let quizData = {
    age: null, weight: null, height: null,
    selectedSport: null, selectedFrequency: null
};

// --- MOTOR DE ÁUDIO SINTÉTICO (SEM ARQUIVOS EXTERNOS) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'keypress') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.03);
        osc.start(); osc.stop(audioCtx.currentTime + 0.03);
    } else if (type === 'scan') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 2.5);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.5);
        osc.start(); osc.stop(audioCtx.currentTime + 2.5);
    } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.12);
        osc.frequency.setValueAtTime(900, audioCtx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
        osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    }
}

// Inicializar partículas decorativas no plano de fundo
function initBackgroundParticles() {
    const container = document.getElementById('bg-particles');
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

function selectSport(sport, el) {
    playSound('click');
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

function selectFrequency(freq, el) {
    playSound('click');
    el.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    quizData.selectedFrequency = freq;
}

// --- ANIMAÇÃO EXCLUSIVA DE EXTRAÇÃO DE DADOS (HOLOGRÁFICA) ---
function runDataExtractionAnimation() {
    if (quizData.selectedFrequency === null) {
        alert('CRITICAL_ERROR: Selecione a frequência operacional.');
        return;
    }

    document.getElementById('step-frequency').classList.remove('active');
    document.getElementById('step-scanning').style.display = 'flex';

    // Gerar as partículas subindo do corpo humano
    const partContainer = document.getElementById('data-particles');
    partContainer.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const chunk = document.createElement('div');
        chunk.classList.add('data-chunk');
        chunk.style.left = `${Math.random() * 60 + 20}%`;
        chunk.style.animationDelay = `${Math.random() * 2}s`;
        partContainer.appendChild(chunk);
    }

    // Terminal Logger Feed Fake Sci-Fi simulando a leitura
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
            playSound('keypress');
        }, index * 350);
    });

    // Conclusão do escaneamento e apresentação final
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

    // Animar o anel gráfico circular profissional
    const circle = document.getElementById('progress-bar-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (finalPercentage / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    
    // Contador de numeração subindo dinamicamente
    let currentPct = 0;
    const counterInterval = setInterval(() => {
        if (currentPct >= finalPercentage) {
            clearInterval(counterInterval);
        } else {
            currentPct++;
            document.getElementById('percentage-val').innerText = `${currentPct}%`;
        }
    }, 15);

    // Definição de Cores Neon para o resultado com base no nível
    const statusBadge = document.getElementById('health-status');
    if (finalPercentage >= 80) {
        statusBadge.innerText = "NÍVEL: ALTA EFICIÊNCIA BIOLÓGICA (ÓTIMO)";
        statusBadge.style.color = varColor('--neon-green');
        circle.style.stroke = varColor('--neon-green');
    } else if (finalPercentage >= 50) {
        statusBadge.innerText = "NÍVEL: ADAPTAÇÃO INTERMEDIÁRIA (MODERADO)";
        statusBadge.style.color = varColor('--neon-cyan');
        circle.style.stroke = varColor('--neon-cyan');
    } else {
        statusBadge.innerText = "NÍVEL: CRÍTICO // ENGENHARIA DE HÁBITOS REQUERIDA";
        statusBadge.style.color = varColor('--neon-magenta');
        circle.style.stroke = varColor('--neon-magenta');
    }

    // Geração de Dicas Personalizadas
    document.getElementById('feedback-tips').innerHTML = generateAdvancedTips(finalPercentage);
    
    playSound('success');
    saveToHistory(finalPercentage, statusBadge.innerText);
    document.getElementById('step-result').classList.add('active');
}

function varColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
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

function saveToHistory(pct, status) {
    let history = JSON.parse(localStorage.getItem('cyber_health_history')) || [];
    const date = new Date().toLocaleDateString('pt-BR');
    history.unshift({ date, pct, status: status.split(':')[1] });
    if (history.length > 3) history.pop();
    localStorage.setItem('cyber_health_history', JSON.stringify(history));
renderHistory();
}
function renderHistory() {
const list = document.getElementById('history-list');
let history = JSON.parse(localStorage.getItem('cyber_health_history')) || [];
if (history.length === 0) {
list.innerHTML = "NENHUM LOG ENCONTRADO NO BANCO LOCAL.";
return;
}
list.innerHTML = history.map(h => <li><span>⚡ LOG [${h.date}]</span> <span>EFICIÊNCIA: <strong>${h.pct}%</strong></span></li>).join('');
}
function restartQuiz() {
quizData = { age: null, weight: null, height: null, selectedSport: null, selectedFrequency: null };
document.getElementById('age').value = '';
document.getElementById('weight').value = '';
document.getElementById('height').value = '';
document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
nextStep('result', 'welcome');
}
window.onload = () => {
initBackgroundParticles();
renderHistory();
};