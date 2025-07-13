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
  const randomNumbers = [];
  while (randomNumbers.length < 5) {
    const n = Math.floor(Math.random() * 50) + 1;
    if (!randomNumbers.includes(n)) {
      randomNumbers.push(n);
    }
  }

});