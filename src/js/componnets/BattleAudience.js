class BattleAudience {
  constructor() {
    this.meter = 0;
    this.excitement = 0;
    this.margin = 1;
    this.percentage = {
      faith: Math.round((Math.random() * 0.15 + 0.1) * 10),
      cunning: Math.round((Math.random() * 0.15 + 0.1) * 10),
      strength: Math.round((Math.random() * 0.15 + 0.1) * 10),
      noblesse: Math.round((Math.random() * 0.15 + 0.1) * 10)
    };
    this.percentage.mix =
      10 -
      this.percentage.strength -
      this.percentage.faith -
      this.percentage.cunning -
      this.percentage.noblesse;

    this.hypePreviewEl = document.querySelector('.hype-meter__marker__preview');
    this.meterEl = document.querySelector('.hype-meter__marker__audience');
    this.excitementEl = document.querySelector(
      '.battlefield__audience__excitement span'
    );
  }

  deflate() {
    this.meter -= 1;
    if (this.meter < 0) {
      this.meter = 0;
      this.excitement -= 1;
    }
  }

  getGeneratedCheersTotal(difference, committedCards) {
    let total = difference * this.percentage.mix;
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

    element = document.querySelector('.audience__percentage--mix');
    element.style.width = `${this.percentage.mix * 10}%`;
    element.textContent = this.percentage.mix;
  }

  renderMeters() {
    this.meterEl.style.transform = `translateX(${this.meter * 100}px)`;
    this.excitementEl.textContent = this.excitement;
  }

  renderHypePreview(committedValue) {
    this.hypePreviewEl.style.transform = `translateX(-${
      1000 - committedValue * 100
    }px)`;
  }
}
