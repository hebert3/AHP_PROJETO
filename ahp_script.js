const saatyOptions = [
  { value: 1, label: '1 - Igual importância' },
  { value: 2, label: '2 - Intermediário entre 1 e 3' },
  { value: 3, label: '3 - Importância fraca' },
  { value: 4, label: '4 - Intermediário entre 3 e 5' },
  { value: 5, label: '5 - Importância forte' },
  { value: 6, label: '6 - Intermediário entre 5 e 7' },
  { value: 7, label: '7 - Importância muito forte' },
  { value: 8, label: '8 - Intermediário entre 7 e 9' },
  { value: 9, label: '9 - Importância absoluta' },
  { value: 1 / 2, label: '1/2 - Recíproco de 2' },
  { value: 1 / 3, label: '1/3 - Recíproco de 3' },
  { value: 1 / 4, label: '1/4 - Recíproco de 4' },
  { value: 1 / 5, label: '1/5 - Recíproco de 5' },
  { value: 1 / 6, label: '1/6 - Recíproco de 6' },
  { value: 1 / 7, label: '1/7 - Recíproco de 7' },
  { value: 1 / 8, label: '1/8 - Recíproco de 8' },
  { value: 1 / 9, label: '1/9 - Recíproco de 9' }
];

const RI_TABLE = {
  1: 0.00,
  2: 0.00,
  3: 0.58,
  4: 0.90,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49
};

const state = {
  problem: '',
  criteria: [],
  alternatives: []
};

const problemName = document.getElementById('problemName');
const criterionInput = document.getElementById('criterionInput');
const alternativeInput = document.getElementById('alternativeInput');
const criteriaList = document.getElementById('criteriaList');
const alternativesList = document.getElementById('alternativesList');
const saatyGuideSection = document.getElementById('saatyGuideSection');
const criteriaMatrixSection = document.getElementById('criteriaMatrixSection');
const alternativesMatricesSection = document.getElementById('alternativesMatricesSection');
const calculateSection = document.getElementById('calculateSection');
const resultsSection = document.getElementById('resultsSection');

function renderLists() {
  criteriaList.innerHTML = state.criteria.map((item, index) => `<li>C${index + 1} - ${item}</li>`).join('');
  alternativesList.innerHTML = state.alternatives.map((item, index) => `<li>A${index + 1} - ${item}</li>`).join('');
}

function addCriterion() {
  const value = criterionInput.value.trim();
  if (!value) return;
  state.criteria.push(value);
  criterionInput.value = '';
  renderLists();
}

function addAlternative() {
  const value = alternativeInput.value.trim();
  if (!value) return;
  state.alternatives.push(value);
  alternativeInput.value = '';
  renderLists();
}

function renderSaatyGuide() {
  const guide = document.getElementById('saatyGuide');
  guide.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Significado</th>
          </tr>
        </thead>
        <tbody>
          ${saatyOptions.map(option => `<tr><td>${formatSaatyDisplay(option.value)}</td><td>${option.label}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function createSaatySelect(matrixType, matrixIndex, row, col) {
  const select = document.createElement('select');
  select.dataset.matrixType = matrixType;
  select.dataset.matrixIndex = matrixIndex;
  select.dataset.row = row;
  select.dataset.col = col;

  saatyOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    if (Number(option.value) === 1) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', handleMatrixChange);
  return select;
}

function formatSaatyDisplay(value) {
  if (value >= 1) return Number(value).toString();
  const denominator = Math.round(1 / value);
  return `1/${denominator}`;
}

function buildMatrixTable(labels, matrixType, matrixIndex, title) {
  const wrapper = document.createElement('div');
  wrapper.className = 'matrix-card';

  const heading = document.createElement('h3');
  heading.textContent = title;
  wrapper.appendChild(heading);

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th></th>${labels.map(label => `<th>${label}</th>`).join('')}`;
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  labels.forEach((rowLabel, row) => {
    const tr = document.createElement('tr');
    const firstCell = document.createElement('th');
    firstCell.textContent = rowLabel;
    tr.appendChild(firstCell);

    labels.forEach((_, col) => {
      const td = document.createElement('td');

      if (row === col) {
        td.textContent = '1';
      } else if (row < col) {
        td.appendChild(createSaatySelect(matrixType, matrixIndex, row, col));
      } else {
        td.innerHTML = `<span id="mirror-${matrixType}-${matrixIndex}-${row}-${col}">1</span>`;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  wrapper.appendChild(tableWrapper);
  return wrapper;
}

function buildMatrices() {
  state.problem = problemName.value.trim();

  if (!state.problem) {
    alert('Informe o nome do problema.');
    return;
  }

  if (state.criteria.length < 2) {
    alert('Adicione pelo menos 2 critérios.');
    return;
  }

  if (state.alternatives.length < 2) {
    alert('Adicione pelo menos 2 alternativas.');
    return;
  }

  renderSaatyGuide();
  saatyGuideSection.classList.remove('hidden');

  const criteriaContainer = document.getElementById('criteriaMatrixContainer');
  criteriaContainer.innerHTML = '';
  criteriaContainer.appendChild(
    buildMatrixTable(state.criteria, 'criteria', 0, 'Comparação entre critérios')
  );
  criteriaMatrixSection.classList.remove('hidden');

  const altContainer = document.getElementById('alternativesMatricesContainer');
  altContainer.innerHTML = '';
  state.criteria.forEach((criterion, index) => {
    altContainer.appendChild(
      buildMatrixTable(
        state.alternatives,
        'alternatives',
        index,
        `Comparação das alternativas para o critério: ${criterion}`
      )
    );
  });
  alternativesMatricesSection.classList.remove('hidden');
  calculateSection.classList.remove('hidden');
  resultsSection.classList.add('hidden');
}

function handleMatrixChange(event) {
  const select = event.target;
  const matrixType = select.dataset.matrixType;
  const matrixIndex = select.dataset.matrixIndex;
  const row = Number(select.dataset.row);
  const col = Number(select.dataset.col);
  const reciprocal = 1 / Number(select.value);

  const mirror = document.getElementById(`mirror-${matrixType}-${matrixIndex}-${col}-${row}`);
  if (mirror) {
    mirror.textContent = formatNumber(reciprocal);
  }
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return Number(value).toFixed(3).replace(/\.000$/, '');
}

function buildMatrixFromDom(labelsLength, matrixType, matrixIndex) {
  const matrix = Array.from({ length: labelsLength }, () => Array(labelsLength).fill(1));

  for (let row = 0; row < labelsLength; row += 1) {
    for (let col = 0; col < labelsLength; col += 1) {
      if (row === col) {
        matrix[row][col] = 1;
      } else if (row < col) {
        const select = document.querySelector(
          `select[data-matrix-type="${matrixType}"][data-matrix-index="${matrixIndex}"][data-row="${row}"][data-col="${col}"]`
        );
        const value = Number(select.value);
        matrix[row][col] = value;
        matrix[col][row] = 1 / value;
      }
    }
  }

  return matrix;
}

function normalizeMatrix(matrix) {
  const size = matrix.length;
  const colSums = Array(size).fill(0);

  for (let col = 0; col < size; col += 1) {
    for (let row = 0; row < size; row += 1) {
      colSums[col] += matrix[row][col];
    }
  }

  const normalized = matrix.map(row => row.map((value, col) => value / colSums[col]));
  const weights = normalized.map(row => row.reduce((sum, value) => sum + value, 0) / size);

  return { normalized, weights, colSums };
}

function calculateConsistency(matrix, weights) {
  const n = matrix.length;
  if (n < 3) {
    return { lambdaMax: n, ci: 0, cr: 0, consistent: true };
  }

  const weightedSum = matrix.map(row => row.reduce((sum, value, index) => sum + value * weights[index], 0));
  const consistencyVector = weightedSum.map((value, index) => value / weights[index]);
  const lambdaMax = consistencyVector.reduce((sum, value) => sum + value, 0) / n;
  const ci = (lambdaMax - n) / (n - 1);
  const ri = RI_TABLE[n] || 1.49;
  const cr = ri === 0 ? 0 : ci / ri;

  return {
    lambdaMax,
    ci,
    cr,
    consistent: cr <= 0.1
  };
}

function createSimpleTable(title, headers, rows) {
  return `
    <div class="matrix-card">
      <h3>${title}</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>${headers.map(item => `<th>${item}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function calculateAHP() {
  const criteriaMatrix = buildMatrixFromDom(state.criteria.length, 'criteria', 0);
  const criteriaResult = normalizeMatrix(criteriaMatrix);
  const criteriaConsistency = calculateConsistency(criteriaMatrix, criteriaResult.weights);

  const alternativeWeightsByCriterion = [];

  for (let index = 0; index < state.criteria.length; index += 1) {
    const matrix = buildMatrixFromDom(state.alternatives.length, 'alternatives', index);
    const result = normalizeMatrix(matrix);
    alternativeWeightsByCriterion.push(result.weights);
  }

  const finalScores = state.alternatives.map((_, altIndex) => {
    return state.criteria.reduce((sum, _, criterionIndex) => {
      return sum + alternativeWeightsByCriterion[criterionIndex][altIndex] * criteriaResult.weights[criterionIndex];
    }, 0);
  });

  renderResults(criteriaResult.weights, alternativeWeightsByCriterion, finalScores, criteriaConsistency);
}

function renderResults(criteriaWeights, alternativeWeightsByCriterion, finalScores, criteriaConsistency) {
  const summary = document.getElementById('problemSummary');
  const criteriaWeightsDiv = document.getElementById('criteriaWeights');
  const priorityMatrixDiv = document.getElementById('priorityMatrix');
  const consistencyInfoDiv = document.getElementById('consistencyInfo');
  const finalRankingDiv = document.getElementById('finalRanking');

  summary.innerHTML = `
    <div class="matrix-card">
      <h3>Resumo do problema</h3>
      <p><strong>Problema:</strong> ${state.problem}</p>
      <p><strong>Quantidade de critérios:</strong> ${state.criteria.length}</p>
      <p><strong>Quantidade de alternativas:</strong> ${state.alternatives.length}</p>
    </div>
  `;

  criteriaWeightsDiv.innerHTML = createSimpleTable(
    'Pesos dos critérios',
    ['Critério', 'Peso'],
    state.criteria.map((criterion, index) => [criterion, criteriaWeights[index].toFixed(4)])
  );

  const priorityHeaders = ['Alternativa', ...state.criteria];
  const priorityRows = state.alternatives.map((alternative, altIndex) => [
    alternative,
    ...state.criteria.map((_, criterionIndex) => alternativeWeightsByCriterion[criterionIndex][altIndex].toFixed(4))
  ]);

  priorityMatrixDiv.innerHTML = createSimpleTable(
    'Matriz de prioridade',
    priorityHeaders,
    priorityRows
  );

  consistencyInfoDiv.innerHTML = `
    <div class="matrix-card">
      <h3>Coerência da matriz de critérios</h3>
      <p><strong>λ máx:</strong> ${criteriaConsistency.lambdaMax.toFixed(4)}</p>
      <p><strong>CI:</strong> ${criteriaConsistency.ci.toFixed(4)}</p>
      <p><strong>CR:</strong> ${criteriaConsistency.cr.toFixed(4)}</p>
      <p>
        <span class="badge ${criteriaConsistency.consistent ? 'success' : 'danger'}">
          ${criteriaConsistency.consistent ? 'Coerência aceitável (CR ≤ 0,10)' : 'Coerência acima do ideal (CR > 0,10)'}
        </span>
      </p>
      <p class="note">
        Em AHP, normalmente considera-se aceitável quando a Razão de Consistência é menor ou igual a 0,10.
      </p>
    </div>
  `;

  const ranking = state.alternatives.map((alternative, index) => ({
    alternative,
    score: finalScores[index]
  })).sort((a, b) => b.score - a.score);

  finalRankingDiv.innerHTML = createSimpleTable(
    'Ranking final',
    ['Posição', 'Alternativa', 'Pontuação', 'Percentual'],
    ranking.map((item, index) => [
      `${index + 1}º`,
      item.alternative,
      item.score.toFixed(4),
      `${(item.score * 100).toFixed(2)}%`
    ])
  ) + `
    <div class="result-highlight">
      Melhor alternativa: ${ranking[0].alternative} (${(ranking[0].score * 100).toFixed(2)}%)
    </div>
  `;

  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('addCriterionBtn').addEventListener('click', addCriterion);
document.getElementById('addAlternativeBtn').addEventListener('click', addAlternative);
document.getElementById('buildMatricesBtn').addEventListener('click', buildMatrices);
document.getElementById('calculateBtn').addEventListener('click', calculateAHP);

criterionInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') addCriterion();
});

alternativeInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') addAlternative();
});
