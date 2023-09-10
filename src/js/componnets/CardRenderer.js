class CardRenderer {
  getCardEl(card) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    const text = cardPowerText[card.powerIndex];

    cardEl.innerHTML = `
      <div class="card__component card__component--${card.colorLeft}"></div>
      <div class="card__component">
        <em class="card__word">"${text.word}"</em>
      </div>
      <div class="card__component">
        <h4>${card.value}</h4>
        <p>${text.power}</p>
      </div>
      <div class="card__component card__component--${card.colorRight}"></div>
    `;
    return cardEl;
  }
}

var cardRenderer = new CardRenderer();
