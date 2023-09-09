class CardRenderer {
  getCardEl(card) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    cardEl.innerHTML = `
      <div class="card__component card__component--${card.colorLeft}"></div>
      <div class="card__component">
        <em class="card__word">"${card.word}"</em>
      </div>
      <div class="card__component">
        <h4>${card.value}</h4>
        <p>${this._getCardPowerText(card.powerIndex)}</p>
      </div>
      <div class="card__component card__component--${card.colorRight}"></div>
    `;
    return cardEl;
  }

  _getCardPowerText(powerIndex) {
    return cardPowerText[powerIndex].power;
  }
}

var cardRenderer = new CardRenderer();
