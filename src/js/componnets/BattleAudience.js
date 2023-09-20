class BattleAudience {
  constructor(level) {
    this.meter = 0;
    this.excitement = 0;
    this.requiredExcitement = level * 20;
    this.margin = 1;

    const base = 15;

    this.percentage = {
      faith: Math.round((Math.random() * 0.3 + 0.1) * base),
      cunning: Math.round((Math.random() * 0.3 + 0.1) * base),
      strength: Math.round((Math.random() * 0.3 + 0.1) * base)
    };
    this.percentage.noblesse =
      base -
      this.percentage.faith -
      this.percentage.cunning -
      this.percentage.strength;

    this.hypePreviewEl = document.querySelector('.audience__hype__new');
    this.meterEl = document.querySelector('.audience__hype__old');
    this.excitementEl = document.querySelector(
      '.battlefield__audience__excitement span'
    );

    this.renderMeters();
    this.renderPercentages();
    this.renderHypePreview();
  }

  deflate() {
    this.meter -= 1;
    if (this.meter < 0) {
      this.meter = 0;
      this.excitement -= 1;
    }
  }

  getGeneratedCheersTotal(difference, committedCards) {
    let total = 0;
    for (let i = 0; i < committedCards.length - 1; i++) {
      if (committedCards[i].meta.isRightActive) {
        switch (committedCards[i].colorRight) {
          case COLORS_PREFIX.argent:
            total += difference * this.percentage.faith;
            break;
          case COLORS_PREFIX.gules:
            total += difference * this.percentage.strength;
            break;
          case COLORS_PREFIX.purpur:
            total += difference * this.percentage.noblesse;
            break;
          case COLORS_PREFIX.sable:
            total += difference * this.percentage.cunning;
            break;
        }
      }
    }
    return total;
  }

  renderPercentages() {
    let element = document.querySelector('.audience__percentage--gu');
    element.style.width = `${this.percentage.strength * 10}%`;
    element.textContent = this.percentage.strength;

    element = document.querySelector('.audience__percentage--ar');
    element.style.width = `${this.percentage.faith * 10}%`;
    element.textContent = this.percentage.faith;

    element = document.querySelector('.audience__percentage--sa');
    element.style.width = `${this.percentage.cunning * 10}%`;
    element.textContent = this.percentage.cunning;

    element = document.querySelector('.audience__percentage--pu');
    element.style.width = `${this.percentage.noblesse * 10}%`;
    element.textContent = this.percentage.noblesse;
  }

  renderMeters() {
    this.meterEl.textContent = `[${this.meter - this.margin}, ${
      this.meter + this.margin
    }]`;
    this.renderExcitement();
  }

  renderExcitement() {
    this.excitementEl.textContent =
      this.excitement + '/' + this.requiredExcitement;
  }

  renderHypePreview(committedValue) {
    this.hypePreviewEl.textContent = committedValue;
    if (committedValue > this.meter) {
      this.hypePreviewEl.parentNode.classList.add('green');
    } else {
      this.hypePreviewEl.parentNode.classList.remove('green');
    }
  }
}
