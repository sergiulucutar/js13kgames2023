class BattleMelee {
  constructor(state) {
    this.state = state;
    this.attackingKnightIndex = 0;
    this.audience = {
      meter: 1,
      excitement: 0,
      margin: 2
    };

    this.attackCard = '';
    this.selectedCard = '';
    this.committedCards = [];
    this._flippedCommittedCard = [];

    this.strikesCount = 0;

    this.audienceCanvas = new AudienceCanvas();
    this.audienceCanvas.animate();
    this.hand = new Hand(state);
    this.battleRing = new BattleRing(state);
    this.battleRing.init(this.attackingKnightIndex, 5);

    /* DOM ELEMENTS */
    this.attackValueEL = document.querySelector(
      '.battlefield__cards__attack h3'
    );
    this.battlefieldCards = document.querySelector(
      '.battlefield__cards__committed'
    );
    this.slotCardEl = document.querySelector('.battlefield__cards__slot');
    this.audienceHypePreviewEl = document.querySelector(
      '.hype-meter__marker__preview'
    );
    this.audienceMeterEl = document.querySelector(
      '.hype-meter__marker__audience'
    );
    this.audienceExcitementEl = document.querySelector(
      '.battlefield__audience__excitement span'
    );

    this.generateAttackCard();
    this.hand.drawUntilFull();
    this.hand.render();
    this._renderAudience();
    this._renderAudienceHypePreview();

    this._registerEvents();
  }

  generateAttackCard() {
    this.attackValueEL.parentElement.classList.remove.apply(
      this.attackValueEL.parentElement.classList,
      Array.from(this.attackValueEL.parentElement.classList).filter(v =>
        v.startsWith('card--')
      )
    );

    const attackValue = random(1, 6);
    this.attackCard = attackValue;
    this.attackValueEL.textContent = attackValue;
  }

  getCommittedCardsTotal() {
    return this.committedCards.reduce((sum, card) => {
      if (card === 'flip') {
        sum += 1;
      } else {
        sum += parseInt(card[2] || 0);
      }
      return sum;
    }, 0);
  }

  takeBack() {
    if (this.committedCards.length) {
      const card = this.committedCards.pop();
      if (card === 'flip') {
        this.hand.addCard(this._flippedCommittedCard.pop());
      } else {
        this.hand.addCard(card);
      }
      this.battlefieldCards.removeChild(this.battlefieldCards.lastChild);
      this.hand.render();
    }
  }

  nextBattleStep() {
    this.committedCards = [];
    this.strikesCount++;

    if (this.strikesCount >= 8) {
      console.log('GENERATED excitement ', this.audience.excitement);

      onBattleEnded({
        generatedExcitement: this.audience.excitement
      });
      return;
    }

    this.audience.meter -= 1;
    if (this.audience.meter < 0) {
      this.audience.meter = 0;
      this.audience.excitement -= 1;
    }
    this._renderAudience();

    this.attackingKnightIndex = +!this.attackingKnightIndex;

    this.battleRing.initAttack(this.attackingKnightIndex);

    this.generateAttackCard();
    this.hand.addToDiscard(this.selectedCard);
    this.selectedCard = '';

    this.battleRing._render();
    this._renderCommittedCardsReset();
    this._renderAudienceHypePreview();
  }

  commitCards() {
    this.resolveAttack();
    this.audienceCanvas.addExcitement(random(1, 8));

    setTimeout(() => {
      this.nextBattleStep();
    }, 1000);
  }

  refillHand() {
    this.pickCard(null);
    this.hand.drawUntilFull();
    this.hand.render();
    this.commitCards();
  }

  resolveAttack() {
    const { audience } = this;
    let max = this.getCommittedCardsTotal();

    const hypeDifference = max - audience.meter;
    const generatedExcitement =
      hypeDifference - audience.margin * Math.sign(hypeDifference);

    if (Math.abs(hypeDifference) > audience.margin) {
      audience.excitement += generatedExcitement;
    }

    audience.meter = max;
    this._resolveSelectedCardPower(hypeDifference, generatedExcitement);
    this.hand.render();
    this._renderAudience();
    this.battleRing.attackResolved();
  }

  _resolveSelectedCardPower(generatedHype, generatedExcitement) {
    this.committedCards.forEach(card => {
      const cardValue = parseInt(card[2]);
      switch (cardValue) {
        case 1:
          if (generatedHype >= 3) {
            this.hand.addCard(this.hand.drawRandomCard());
          }
          break;
        case 2:
          if (generatedExcitement > 0) {
            this.audience.excitement += 1;
          }
          break;
        case 4:
          this.hand.addCard(this.hand.drawRandomCard());
          this.hand.addCard(this.hand.drawRandomCard());
          break;
        case 5:
          this.audience.meter += 1;
          if (this.commitCards.length === 1) {
            this.audience.meter += 2;
          }
          break;

        case 6:
          this.audience.meter += 2;
          this.refillHand();
          break;
        default:
      }
    });
  }

  pickCard(index, flip) {
    if (index !== null) {
      if (!flip && this._isAttackValueExceeded(index)) {
        return;
      }

      const card = this.hand.pickCard(index);
      if (flip) {
        this.committedCards.push('flip');
        this._flippedCommittedCard.push(card);
      } else {
        this.committedCards.push(card);
      }
      this.hand.render();
      this._renderLastPickedCard();
    }
    this._renderAudienceHypePreview();
  }

  /* Private */

  _getCardPowerText(cardValue) {
    return cardPowerText[parseInt(cardValue) - 1].power || '';
  }

  _isAttackValueExceeded(newCardIndex) {
    const currentSum = this.getCommittedCardsTotal();
    const newCardValue = parseInt(this.hand.cards[newCardIndex][2]);
    return this.attackCard < currentSum + newCardValue;
  }

  _renderAudience() {
    this.audienceMeterEl.style.transform = `translateX(${
      (this.audience.meter - 1) * 100
    }px)`;
    this.audienceExcitementEl.textContent = this.audience.excitement;
  }

  _renderAudienceHypePreview() {
    const totalCommitted = this.getCommittedCardsTotal();
    this.audienceHypePreviewEl.style.transform = `translateX(-${
      1000 - totalCommitted * 100
    }px)`;
  }

  _renderLastPickedCard() {
    this.slotCardEl.classList.remove('visible');
    const pickedCard = this.committedCards[this.committedCards.length - 1];
    const card = document.createElement('div');
    card.classList.add('card');
    if (pickedCard === 'flip') {
      card.classList.add('card--flip');
    } else {
      card.classList.add(`card--${pickedCard[0] + pickedCard[1]}`);
      card.innerHTML = `<div><h3 class="card__value">${pickedCard[2]}</h3></div>
      <em>${this._getCardPowerText(pickedCard[2])}</em>`;
    }
    this.battlefieldCards.appendChild(card);
  }

  _renderCommittedCardsReset() {
    this.battlefieldCards.innerHTML = '';
    this.slotCardEl.classList.add('visible');
  }
  _registerEvents() {
    window.commitCards = () => this.commitCards();
    window.pickCard = (cardIndex, event) => {
      event.preventDefault();
      this.pickCard(cardIndex, event.which === 3);
    };
    window.refillHand = () => this.refillHand();
    window.takeBack = () => this.takeBack();
  }
}
