class MessageRenderer {
  animate(cards) {
    const wrapperEl = document.querySelector('.committed-message');
    const element = wrapperEl.querySelector('em');

    const message = this._getMessage(cards);
    element.textContent = message;
    wrapperEl.classList.add('committed-message--shown');

    setTimeout(() => {
      wrapperEl.classList.remove('committed-message--shown');
    }, 2000);
  }

  _getMessage(cards) {
    return cards.reduce((text, card) => {
      text += `${card.word} `;
      return text;
    }, '');
  }
}
