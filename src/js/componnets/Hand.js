class Hand {
  constructor(state) {
    this.cards = [];
    this.deck = [...state.defaultDeck];
    this.defaultSize = 5;
    this.discardPile = [];

    this.el = document.querySelector('.tournament__hand ul');
  }

  addCard(card) {
    this.cards.push(card);
  }

  addToDiscard(card) {
    this.discardPile.push(card);
  }

  adjustCardValues(committedCards) {
    this.cards.forEach(card => {
      if (committedCards.find(c => c.powerIndex === card.powerIndex)) {
        card.value = 0;
      } else {
        card.value += 1;
      }
    });
  }

  pickCard(cardIndex) {
    const card = this.cards[cardIndex];
    this.cards.splice(cardIndex, 1);
    return card;
  }

  drawUntilFull() {
    const cardNeeded = this.defaultSize - this.cards.length;
    if (cardNeeded > this.deck.length) {
      this.deck = [...this.deck, this.discardPile];
      this.discardPile = [];
    }

    while (this.cards.length < this.defaultSize) {
      this.cards.push(this.drawRandomCard());
    }
  }

  drawRandomCard() {
    const randomIndex = random(0, this.deck.length - 1);
    const card = this.deck[randomIndex];
    this.deck.splice(randomIndex, 1);
    return card;
  }

  _getCardPowerText(cardValue) {
    return cardPowerText[parseInt(cardValue) - 1].power || '';
  }

  render() {
    this.el.innerHTML = '';
    this.cards.forEach((card, index) => {
      const cardEl = cardRenderer.getCardEl(card);
      cardEl.addEventListener('mousedown', event => pickCard(index, event));
      this.el.appendChild(cardEl);
    });
  }
}
