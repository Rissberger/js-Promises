document.addEventListener('DOMContentLoaded', async () => {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // 1. Fetching a new deck and drawing a card
    async function drawNewCard() {
        let response = await axios.get(`${baseURL}/new/draw/`);
        let { suit, value } = response.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    drawNewCard();

    // 2. Drawing two cards from the same deck
    async function drawTwoCards() {
        let firstResponse = await axios.get(`${baseURL}/new/draw/`);
        let firstCard = firstResponse.data.cards[0];
        let deckId = firstResponse.data.deck_id;

        let secondResponse = await axios.get(`${baseURL}/${deckId}/draw/`);
        let secondCard = secondResponse.data.cards[0];

        [firstCard, secondCard].forEach(card => {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        });
    }
    drawTwoCards();

    // 3. Shuffling a deck and drawing a card on button click
    let deckId = null;
    let btn = document.querySelector('button');
    let cardArea = document.getElementById('card-area');

    async function shuffleDeck() {
        let response = await axios.get(`${baseURL}/new/shuffle/`);
        deckId = response.data.deck_id;
        btn.style.display = 'block';
    }
    shuffleDeck();

    btn.addEventListener('click', async () => {
        let response = await axios.get(`${baseURL}/${deckId}/draw/`);
        let cardSrc = response.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

        let img = document.createElement('img');
        img.src = cardSrc;
        img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
        cardArea.appendChild(img);

        if (response.data.remaining === 0) btn.remove();
    });
});
