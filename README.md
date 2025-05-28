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

------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------

# Relatório de Análise do Sistema de Inferência Fuzzy para Cálculo de Gorjeta

## Introdução

Este relatório detalha a análise de um Sistema de Inferência Fuzzy (FIS) implementado em JavaScript, cujo código-fonte está disponível no repositório GitHub `sortphy/fuzzy`. O objetivo inicial era comparar os resultados entre diferentes algoritmos fuzzy, conforme solicitado. No entanto, a análise do repositório revelou a presença de uma única implementação de FIS, focada especificamente no cálculo da gorjeta ideal em um restaurante, baseada na qualidade da comida, qualidade do serviço e tempo de atendimento. 

Apesar da ausência de múltiplos algoritmos para uma comparação direta de desempenho ou abordagens, este documento explora em profundidade o funcionamento do sistema existente. Serão abordadas as etapas de fuzzificação das entradas, a estrutura das regras fuzzy, o método de inferência e o processo de defuzzificação para gerar uma saída nítida (crisp) correspondente à porcentagem de gorjeta recomendada. Adicionalmente, discutiremos os componentes do sistema, como as funções de pertinência e a base de regras, e como eles interagem para produzir o resultado final. A análise se baseia nos arquivos `main.js`, `regras.js`, `index.html` e `README.md` presentes no repositório.



## Descrição do Sistema Fuzzy Implementado

O repositório `sortphy/fuzzy` contém uma implementação de um Sistema de Inferência Fuzzy (FIS) do tipo Mamdani, escrito em JavaScript. Este sistema foi projetado para calcular a porcentagem de gorjeta apropriada com base em três variáveis de entrada: a qualidade da comida, a qualidade do serviço e o tempo de atendimento. A implementação segue as etapas clássicas de um FIS, conforme descrito no arquivo `README.md` do próprio repositório.

### Variáveis de Entrada e Fuzzificação

O sistema utiliza três variáveis de entrada:

1.  **Qualidade da Comida:** Avaliada em uma escala numérica de 0 a 10. Esta entrada é fuzzificada em dois conjuntos fuzzy: `ruim` e `boa`. As funções de pertinência, definidas na função `comidaFuzzy(nota)` em `main.js`, são lineares simples. A pertinência ao conjunto `ruim` diminui linearmente de 1 (para nota 0) a 0 (para nota 10), enquanto a pertinência ao conjunto `boa` aumenta linearmente de 0 (para nota 0) a 1 (para nota 10). Matematicamente, `ruim = max(0, 1 - nota / 10)` e `boa = min(1, nota / 10)`.

2.  **Qualidade do Serviço:** Também avaliada em uma escala de 0 a 10. Similarmente à qualidade da comida, esta entrada é fuzzificada em dois conjuntos: `fraco` e `forte`. As funções de pertinência, definidas em `servicoFuzzy(nota)`, seguem a mesma lógica linear: `fraco = max(0, 1 - nota / 10)` e `forte = min(1, nota / 10)`.

3.  **Tempo de Atendimento:** Medido em minutos, com um intervalo de entrada sugerido pela interface `index.html` de 1 a 15 minutos. Esta variável é fuzzificada em dois conjuntos: `demorado` e `rapido`. As funções de pertinência, definidas em `atendimentoFuzzy(tempo)`, são ligeiramente diferentes. O atendimento é considerado `demorado` se o tempo for superior a 5 minutos, com a pertinência aumentando linearmente a partir de 5 minutos (`demorado = max(0, (tempo - 5) / 5)`). É considerado `rapido` se o tempo for igual ou inferior a 5 minutos, com a pertinência diminuindo linearmente a partir de 2.5 minutos (`rapido = max(0, 1 - (tempo - 2.5) / 5)`). Esta definição implica uma sobreposição e transição entre os conceitos de rápido e demorado na faixa de 2.5 a 10 minutos.

A fuzzificação transforma os valores numéricos (crisp) das entradas em graus de pertinência aos conjuntos fuzzy definidos, permitindo que as regras linguísticas sejam aplicadas.

### Base de Regras Fuzzy e Inferência

O coração do sistema reside na sua base de regras, definida na constante `regras` dentro do arquivo `main.js` (e também detalhada em `regras.js`). Estas regras conectam as combinações dos conjuntos fuzzy das entradas com os conjuntos fuzzy da variável de saída (gorjeta). A estrutura das regras segue um formato `SE (condição ANTECEDENTE) ENTÃO (consequência)`.

As regras combinam os estados das três entradas (Comida, Serviço, Atendimento) para determinar uma saída linguística para a gorjeta. Por exemplo, uma regra implícita seria: `SE comida é ruim E serviço é fraco E atendimento é rapido ENTÃO gorjeta é Pouca`. O sistema considera todas as 8 combinações possíveis (2 estados para comida * 2 estados para serviço * 2 estados para atendimento).

O processo de inferência, implementado dentro da função `calcularGorjeta`, determina a força de cada regra. Para cada combinação de estados das entradas (ex: `comida=ruim`, `servico=fraco`, `atendimento=rapido`), a força da regra correspondente é calculada usando o operador `MIN` (implementado com `Math.min`) sobre os graus de pertinência das condições antecedentes. Ou seja, `intensidade = min(pertinencia_comida[c], pertinencia_servico[s], pertinencia_atendimento[a])`.

### Variável de Saída e Defuzzificação

 A variável de saída é a **Porcentagem de Gorjeta**. Ela é representada por quatro termos linguísticos: `Sem` (0%), `Pouca` (5%), `Media` (10%) e `Generosa` (20%). Estes valores percentuais fixos são definidos na constante `saidas`.

O sistema utiliza um método de defuzzificação comum, semelhante ao método do centroide ponderado, para converter as saídas fuzzy combinadas em um único valor numérico (crisp) para a gorjeta. A função `calcularGorjeta` calcula a saída final da seguinte forma:

1.  Para cada uma das 8 regras, calcula-se a força da regra (`intensidade`).
2.  Identifica-se a saída linguística (`saidaLinguistica`) associada a essa regra (ex: 

`Pouca`, `Media`, etc.) e o valor numérico correspondente (`valorSaida`, ex: 5, 10, etc.).
3.  Calcula-se a contribuição ponderada de cada regra para a saída final: `intensidade * valorSaida`.
4.  Somam-se todas as intensidades (`somaPesos`) e todas as contribuições ponderadas (`somaSaidas`).
5.  A saída crisp final é a média ponderada: `gorjeta = somaSaidas / somaPesos`. O resultado é formatado para duas casas decimais.

Este método agrega as contribuições de todas as regras ativadas (aquelas com `intensidade > 0`) para produzir uma recomendação de gorjeta única e quantitativa.

## Análise do Comportamento e Resultados

Como não há múltiplos algoritmos para comparar, a análise se concentra no comportamento do sistema implementado. A interface interativa fornecida em `index.html` é uma ferramenta valiosa para essa análise, pois permite ao usuário ajustar os valores de entrada (qualidade da comida, serviço e tempo) e observar imediatamente a porcentagem de gorjeta resultante, bem como a visualização dos graus de pertinência para cada conjunto fuzzy das entradas.

Observando a interação na página `index.html`, podemos inferir o comportamento do sistema:

*   **Influência das Entradas:** A gorjeta aumenta com a melhoria da qualidade da comida e do serviço e diminui com o aumento do tempo de atendimento. A combinação das três entradas determina qual regra (ou quais regras) terá maior influência.
*   **Sensibilidade:** O sistema demonstra sensibilidade às variações nas entradas, ajustando a gorjeta de forma gradual na maioria dos casos, devido à natureza das funções de pertinência lineares e ao método de defuzzificação por média ponderada.
*   **Limites das Saídas:** As saídas estão limitadas aos valores definidos (`Sem`, `Pouca`, `Media`, `Generosa`), mas a defuzzificação permite valores intermediários. Por exemplo, se múltiplas regras com saídas diferentes forem ativadas, o resultado final será uma média ponderada, podendo resultar em valores como 7.5% ou 12%, etc., embora a interface classifique esses valores nas categorias predefinidas.
*   **Exemplo Prático:** Se a comida for avaliada como 8 (predominantemente `boa`), o serviço como 9 (predominantemente `forte`) e o tempo como 3 minutos (predominantemente `rapido`), a regra `SE comida=boa E servico=forte E atendimento=rapido ENTÃO gorjeta=Generosa` terá uma força significativa. Outras regras podem ter alguma ativação menor, mas o resultado final tenderá fortemente para 20% (Generosa), talvez ligeiramente ajustado pela influência de outras regras menos ativadas.

## Discussão e Limitações

A implementação no repositório `sortphy/fuzzy` serve como um exemplo didático claro de um sistema fuzzy Mamdani simples. No entanto, algumas limitações e pontos para discussão podem ser levantados:

1.  **Ausência de Comparação:** O principal objetivo de comparar diferentes algoritmos não pôde ser cumprido, pois apenas um método foi implementado.
2.  **Simplicidade das Funções de Pertinência:** As funções de pertinência utilizadas são lineares (triangulares/trapézoidais implícitas). Sistemas mais complexos poderiam usar funções gaussianas, sigmoides ou outras formas para modelar a incerteza de maneira diferente.
3.  **Base de Regras Fixa:** As regras são codificadas diretamente. Não há mecanismos de aprendizado ou ajuste automático dessas regras.
4.  **Defuzzificação:** O método de média ponderada é comum, mas outros métodos (como máximo dos máximos) poderiam levar a resultados diferentes.
5.  **Validação:** O repositório não inclui dados de validação ou testes comparando a saída do sistema com avaliações humanas de gorjetas, o que seria útil para avaliar a eficácia do modelo.

## Conclusão

O repositório `sortphy/fuzzy` apresenta uma implementação funcional e educativa de um Sistema de Inferência Fuzzy para o problema de cálculo de gorjetas. Embora não permita uma análise comparativa entre diferentes algoritmos fuzzy devido à presença de uma única implementação, a análise detalhada do código e da interface interativa revela um sistema coerente que aplica os princípios da lógica fuzzy – fuzzificação, inferência baseada em regras e defuzzificação – para mapear entradas subjetivas (qualidade) e objetivas (tempo) em uma recomendação de gorjeta quantitativa. O sistema demonstra a capacidade da lógica fuzzy de lidar com a imprecisão e a linguagem natural em problemas de tomada de decisão.

## Referências

*   Repositório GitHub analisado: [https://github.com/sortphy/fuzzy](https://github.com/sortphy/fuzzy)


