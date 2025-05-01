# Sistema de Inferência Fuzzy (FIS) — Exercício Prof. Claudinei


## 📌 Etapas da Implementação de um FIS

Para calcular a saída de um **FIS (Fuzzy Inference System)**, seguimos as etapas abaixo:

1. **Definir o conjunto de regras fuzzy**;
2. **Fuzzificar as entradas** usando as funções de associação de entrada;
3. **Combinar as entradas fuzzificadas** de acordo com as regras fuzzy para determinar a *força da regra*;
4. **Calcular a consequência da regra**, combinando a força da regra com a função de pertinência da saída (aplica-se ao FIS do tipo *Mamdani*);
5. **Combinar todas as consequências** para obter a distribuição final de saída;
6. **Defuzzificar a distribuição da saída** (caso uma saída *crisp* seja necessária).

---

## ⚙️ Etapas para Projetar um Sistema Fuzzy

Após definir as entradas e saídas da aplicação, o projeto dos parâmetros do sistema fuzzy segue três etapas:

1. **Especificar os conjuntos fuzzy** associados a cada variável;
2. **Definir as regras fuzzy** que governam o comportamento do sistema;
3. **Determinar as funções de pertinência** para cada conjunto fuzzy.

