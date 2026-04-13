# Projeto AHP Web

## Descrição
Este projeto é uma aplicação web simples para resolver problemas de decisão com o método **AHP (Analytic Hierarchy Process)**.

A aplicação permite que o usuário informe:
- o **nome do problema**;
- os **critérios de decisão**;
- as **alternativas de escolha**;
- a **matriz de comparação entre critérios** usando a **escala de Saaty**;
- as **matrizes de comparação das alternativas para cada critério**.

Ao final, o sistema calcula:
- os **pesos dos critérios**;
- a **matriz de prioridade**;
- o **ranking final das alternativas**;
- a **razão de consistência (CR)** da matriz de critérios.

---

## Objetivo da atividade
O objetivo do projeto é atender à proposta da disciplina de **Sistema de Apoio à Decisão**, implementando uma página web capaz de aplicar o algoritmo AHP a partir das entradas informadas pelo usuário.

A estrutura do sistema segue as etapas apresentadas na aula:
1. definir o problema, critérios e alternativas;
2. construir as matrizes de comparação;
3. normalizar as matrizes;
4. obter os pesos;
5. gerar a matriz de prioridade;
6. calcular o resultado final.

---

## Tecnologias utilizadas
- **HTML5** → estrutura da página
- **CSS3** → estilização e layout
- **JavaScript** → lógica do algoritmo AHP e cálculos

---

## Estrutura dos arquivos
```bash
.
├── ahp_index.html
├── ahp_styles.css
├── ahp_script.js
└── README_AHP.md
```

### Função de cada arquivo
- **ahp_index.html**: contém a estrutura da interface.
- **ahp_styles.css**: contém o layout, cores, espaçamentos e responsividade visual.
- **ahp_script.js**: contém toda a lógica do sistema, incluindo criação das matrizes, preenchimento automático dos recíprocos, cálculos do AHP, pesos, consistência e ranking final.

---

## Como executar o projeto
1. Baixe os arquivos do projeto.
2. Coloque todos os arquivos na **mesma pasta**.
3. Abra o arquivo **`ahp_index.html`** no navegador.

Não é necessário instalar bibliotecas ou dependências externas.

---

## Como usar

### 1. Informar os dados iniciais
Na primeira etapa, o usuário deve preencher:
- **nome do problema**;
- **lista de critérios**;
- **lista de alternativas**.

### 2. Comparar os critérios
Na matriz de comparação dos critérios, o usuário informa a importância relativa entre eles usando a **escala fundamental de Saaty**.

Exemplo de interpretação:
- valor **1** → critérios com igual importância;
- valor **3** → importância fraca;
- valor **5** → importância forte;
- valor **7** → importância muito forte;
- valor **9** → importância absoluta;
- valores **recíprocos** (1/3, 1/5, 1/7...) → quando o critério da coluna é mais importante que o da linha.

> Importante: cada célula compara o **item da linha** com o **item da coluna**.

### 3. Comparar as alternativas por critério
Para cada critério informado, o sistema gera automaticamente uma matriz de comparação entre as alternativas.

O usuário deve preencher cada matriz usando a mesma lógica da escala de Saaty.

### 4. Visualizar os resultados
Após o preenchimento, o sistema exibe:
- os **pesos dos critérios**;
- a **matriz de prioridade**;
- o **ranking final** das alternativas;
- a **melhor alternativa encontrada**.

---

## Lógica do cálculo
O sistema executa as seguintes etapas do método AHP:

### 1. Montagem das matrizes de comparação
São montadas:
- uma matriz para comparar os **critérios entre si**;
- uma matriz para comparar as **alternativas em relação a cada critério**.

### 2. Preenchimento automático do recíproco
Quando o usuário escolhe um valor acima da diagonal principal, o sistema preenche automaticamente o valor recíproco abaixo da diagonal.

Exemplo:
- se A é **5** vezes mais importante que B,
- então B será automaticamente **1/5** em relação a A.

### 3. Normalização
Cada valor da matriz é dividido pela soma da sua coluna.

### 4. Cálculo dos pesos
Depois da normalização, o peso de cada elemento é obtido pela média dos valores da linha.

### 5. Matriz de prioridade
A matriz de prioridade reúne os pesos das alternativas para cada critério.

### 6. Resultado final
O ranking final é calculado por uma **média ponderada**, multiplicando:
- os valores da matriz de prioridade
**pelos**
- pesos dos critérios.

---

## Consistência da matriz
O sistema também calcula a consistência da matriz de critérios.

São exibidos:
- **λmáx**
- **CI (Índice de Consistência)**
- **CR (Razão de Consistência)**

### Interpretação
- **CR < 0,10** → julgamentos considerados consistentes.
- **CR ≥ 0,10** → julgamentos podem estar inconsistentes e devem ser revistos.

---

## Exemplo de uso
Um exemplo clássico de aplicação do AHP é a **escolha entre ofertas de emprego**, considerando critérios como:
- salário;
- oportunidades profissionais;
- localização;
- custo de vida.

Nesse caso, a aplicação permite comparar os empregos em cada critério e depois calcular qual alternativa apresenta o melhor resultado final.

---

## Pontos positivos do projeto
- interface simples;
- separação entre estrutura, estilo e lógica;
- uso da escala de Saaty com descrições textuais;
- preenchimento automático do recíproco;
- cálculo automático dos pesos e do ranking;
- validação da consistência da matriz principal.

---

## Possíveis melhorias futuras
- permitir editar ou remover critérios e alternativas já inseridos;
- exportar o resultado em PDF;
- salvar análises localmente;
- validar consistência também nas matrizes das alternativas;
- adicionar gráficos para facilitar a interpretação do ranking.

---

## Autor
Projeto desenvolvido para a disciplina de **Sistema de Apoio à Decisão**, com foco na implementação do método **AHP** em uma página web.
