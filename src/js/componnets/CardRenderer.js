class CardRenderer {
  getCardEl(card) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    cardEl.innerHTML = `
      <div class="card__component card__component--${card.colorLeft}"></div>
      <div class="card__component">
        <em class="card__word">"${this._getCardWord()}"</em>
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

  _getCardWord() {
    const words = [
      'powerful',
      'strong',
      'elegant',
      'precise',
      'sharp',
      'mighty',
      'fast',
      'calculated',
      'cunning'
    ];

    const randomIndex = random(0, words.length);
    return words[randomIndex];
  }
}

var cardRenderer = new CardRenderer();
