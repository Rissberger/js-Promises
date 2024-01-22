document.addEventListener('DOMContentLoaded', () => {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1. Fetching a new deck and drawing a card
    fetch(`${baseURL}/new/draw/`)
      .then(response => response.json())
      .then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
  
    // 2. Drawing two cards from the same deck
    let firstCard = null;
  
    fetch(`${baseURL}/new/draw/`)
      .then(response => response.json())
      .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return fetch(`${baseURL}/${deckId}/draw/`);
      })
      .then(response => response.json())
      .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(card => {
          console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        });
      });
  
    // 3. Shuffling a deck and drawing a card on button click
    let deckId = null;
    let btn = document.querySelector('button');
    let cardArea = document.getElementById('card-area');
  
    fetch(`${baseURL}/new/shuffle/`)
      .then(response => response.json())
      .then(data => {
        deckId = data.deck_id;
        btn.style.display = 'block';
      });
  
    btn.addEventListener('click', () => {
      fetch(`${baseURL}/${deckId}/draw/`)
        .then(response => response.json())
        .then(data => {
          let cardSrc = data.cards[0].image;
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          let img = document.createElement('img');
          img.src = cardSrc;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          cardArea.appendChild(img);
          if (data.remaining === 0) btn.remove();
        });
    });
  });
  