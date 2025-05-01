// Funções de pertinência simples (pode usar valores entre 0 e 1 como entrada)

function comidaFuzzy(nota) {
    return {
        ruim: Math.max(0, 1 - nota / 10),  // Ex: nota 0 = 1 ruim, nota 10 = 0 ruim
        boa: Math.min(1, nota / 10)        // Ex: nota 0 = 0 boa, nota 10 = 1 boa
    };
}

function servicoFuzzy(nota) {
    return {
        fraco: Math.max(0, 1 - nota / 10),
        forte: Math.min(1, nota / 10)
    };
}

function atendimentoFuzzy(tempo) {
    return {
        demorado: Math.max(0, (tempo - 5) / 5), // tempo > 5 é demorado
        rapido: Math.max(0, 1 - (tempo - 2.5) / 5) // tempo <= 5 é rápido
    };
}

// Regras fuzzy (como você já definiu)
const regras = {
    ruim: {
        fraco: {
            rapido: "Pouca",
            demorado: "Sem"
        },
        forte: {
            rapido: "Media",
            demorado: "Sem"
        }
    },
    boa: {
        fraco: {
            rapido: "Media",
            demorado: "Sem"
        },
        forte: {
            rapido: "Generosa",
            demorado: "Sem"
        }
    }
};

// Saídas mapeadas para valores percentuais
const saidas = {
    Sem: 0,
    Pouca: 5,
    Media: 10,
    Generosa: 20
};

// Função principal para calcular gorjeta
function calcularGorjeta(comidaNota, servicoNota, tempoAtendimento) {
    const comida = comidaFuzzy(comidaNota);
    const servico = servicoFuzzy(servicoNota);
    const atendimento = atendimentoFuzzy(tempoAtendimento);

    let somaPesos = 0;
    let somaSaidas = 0;

    // Percorre todas as combinações possíveis
    for (let c in comida) {
        for (let s in servico) {
            for (let a in atendimento) {
                const intensidade = Math.min(comida[c], servico[s], atendimento[a]); // força da regra
                const saidaLinguistica = regras[c][s][a];
                const valorSaida = saidas[saidaLinguistica];

                somaPesos += intensidade;
                somaSaidas += intensidade * valorSaida;
            }
        }
    }

    if (somaPesos === 0) return 0;
    return (somaSaidas / somaPesos).toFixed(2); // valor crisp da gorjeta
}
