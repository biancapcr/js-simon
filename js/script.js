// Seleziono gli elementi del DOM
document.addEventListener('DOMContentLoaded', () => {
  // Il contatore che mostrerà i secondi rimanenti
  const countdownEl = document.getElementById('countdown');
  // Il paragrafo con le istruzioni
  const instructions = document.getElementById('instructions');
  // La <ul> in cui andremo a inserire i 5 numeri casuali
  const numbersList = document.getElementById('numbers-list');
  // Il form che contiene gli input per le risposte
  const form = document.getElementById('answers-form');
  form.setAttribute('novalidate', true);
  // Gli input di tipo number dentro al form
  const inputs = form.querySelectorAll('input[type="number"]');
  // Il paragrafo per i messaggi di errore (validazione)
  const messageEl = document.getElementById('message');

  // Genero 5 numeri casuali da 1 a 50
  const randomNumbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 50) + 1
  );

  // Funzione che mostra i numeri nella <ul>
  function showNumbers() {
    // Svuoto la lista
    numbersList.innerHTML = '';
    randomNumbers.forEach(num => {
      const li = document.createElement('li');
      li.textContent = num;
      li.classList.add('fs-2', 'fw-bold');
      numbersList.appendChild(li);
    });
  }

  // Nascondi il form all’inizio
  form.classList.add('d-none');
  // Mostro subito i numeri
  showNumbers();

  // Avvio countdown da 10s
  let timeLeft = 10;
  // Visualizzo subito il valore iniziale sul timer
  countdownEl.textContent = timeLeft;
  const timerInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      // 10 secondi passati: fermo il timer e passo al form
      clearInterval(timerInterval);
      numbersList.classList.add('d-none');
      instructions.textContent = 'Ora inserisci i numeri che hai visto';
      form.classList.remove('d-none');
      countdownEl.textContent = '';
    }
  }, 1000);

  // Pulisce eventuali messaggi e classi di errore
  function clearValidation() {
    messageEl.textContent = '';
    inputs.forEach(i => i.classList.remove('is-invalid'));
  }

  // Controlla vuoti e range
  function validateInputs() {
    clearValidation();
    let valid = true;

    inputs.forEach((input, i) => {
      const v = input.value.trim();
      if (v === '' || isNaN(v) || Number(v) < 1 || Number(v) > 50) {
        input.classList.add('is-invalid');
        valid = false;
      }
    });

    if (!valid) {
      messageEl.textContent = 'Per favore inserisci numeri validi (1-50).';
    }
    return valid;
  }

  // Valuta le risposte, usando clearValidation() e validateInputs()
  function evaluateAnswers() {
    // Ferma subito ogni timer residuo
    clearInterval(timerInterval);
    // Se la validazione fallisce, evidenzio i campi e esco
    if (!validateInputs()) return;

    // Altrimenti trasformo in numeri e filtro i corretti
    const nums = Array.from(inputs).map(i => Number(i.value.trim()));
    const correct = nums.filter((n, i) =>
      randomNumbers.includes(n) && nums.indexOf(n) === i
    );

    // Mostro il risultato nella sezione istruzioni
    instructions.textContent = `Hai indovinato ${correct.length} ${correct.length === 1 ? 'numero' : 'numeri'}: ` +
  (correct.length ? correct.join(', ') : '—');
    // Nascondo il form
    form.classList.add('d-none');
  }
    // Gestione form
    form.addEventListener('submit', e => {
    e.preventDefault();
    evaluateAnswers();
  });
});
