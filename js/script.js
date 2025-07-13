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
    });
  }
   // Nascondi il form all’inizio
  form.classList.add('d-none');

  // Mostro subito i numeri
  showNumbers();

  // Imposto il countdown a 30 secondi
  let timeLeft = 30;
  // Visualizzo subito il valore iniziale sul timer
  countdownEl.textContent = timeLeft;
 // Avvio il timer: ogni secondo decrementa e aggiorna il DOM
 const timerInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft === 20) {
      // Nascondi i numeri
      numbersList.classList.add('d-none');
      instructions.textContent = 'Inserisci i numeri che hai visto';
      // Mostra il form
      form.classList.remove('d-none');
    }
    // Quando il timer termina (0 s), fermo tutto e valuto
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      evaluateAnswers(); 
    }
  }, 1000);
  // Chiarire eventuali messaggi e classi di errore
  function clearValidation() {
    messageEl.textContent = '';
    inputs.forEach(i => i.classList.remove('is-invalid'));
  }
  // Controlla vuoti, range e duplicati
  function validateInputs(values) {
      // Vuoti o non-numeri
    if (values.some(v => v.trim() === '' || isNaN(v))) {
      messageEl.textContent = 'Inserisci numeri validi.';
      return false;
    }
    const nums = values.map(v => Number(v));
      // Fuori range 1–50
    if (nums.some(n => n < 1 || n > 50)) {
      messageEl.textContent = 'I numeri devono essere tra 1 e 50.';
      return false;
    }
      // Duplicati
    if (new Set(nums).size < nums.length) {
      messageEl.textContent = 'Non puoi inserire numeri ripetuti.';
      return false;
    }
    return true;
  }
   // Valuta le risposte, usando clearValidation() e validateInputs()
  function evaluateAnswers() { 
    // Pulisco errori precedenti
    clearValidation();
    // Prendo tutti i valori                                       
    const values = Array.from(inputs).map(i => i.value);      
    // Se la validazione fallisce, evidenzio gli input e esco
    if (!validateInputs(values)) {
      inputs.forEach(i => i.classList.add('is-invalid'));
      return;
    }
    // Altrimenti trasformo in numeri e filtro i corretti
    const nums = values.map(v => Number(v));
    // Ricavo i corretti, eliminando duplicati con indexOf
    const correct = nums.filter((n, i) => 
        randomNumbers.includes(n) && nums.indexOf(n) === i );
});
