class BattleMelee {
  constructor(state) {
    this.state = state;
    this.attackingKnightIndex = 0;

    this.attackValue = 0;
    this.committedCards = [];

    this.audience = new BattleAudience();
    this.audienceCanvas = new AudienceCanvas();
    this.audienceCanvas.animate();

    this.battleRing = new BattleRing(state);
    this.battleRing.init(this.attackingKnightIndex, 5);

    this.knightsStats = new BattleKnightStatus(state);

    this.hand = new Hand(state);

    this.messageRenderer = new MessageRenderer();

    /* DOM ELEMENTS */
    this.cardsEl = document.querySelector('.battlefield__cards__wrapper');
    this.slotCardEl = document.querySelector('.battlefield__cards__slot');

    this._generateAttackValue();
    this._renderPlaceHolders();

    this.hand.drawUntilFull();
    this.hand.render();

    this.audience.renderHypePreview(0);
    this.audience.renderPercentages();

    this.knightsStats.render();

    this._registerEvents();
  }

  commitCards() {
    this.cardsEl.parentNode.classList.add('battlefield__cards--committed');
    this._animateMessage();
    this._resolveAttack();
    this.audienceCanvas.addExcitement(random(1, 8));

    setTimeout(() => {
      this.nextBattleStep();
      this.cardsEl.parentNode.classList.remove('battlefield__cards--committed');
    }, 2000);
  }

  nextBattleStep() {
    this.committedCards = [];

    if (this._isBattleEnded()) {
      onBattleEnded({
        generatedExcitement: this.audience.excitement
      });
      return;
    }

    this.audience.deflate();
    this.audience.renderMeters();

    this.attackingKnightIndex = +!this.attackingKnightIndex;
    this.battleRing.initAttack(this.attackingKnightIndex);
    this._generateAttackValue();

    this._renderPlaceHolders();
    this.battleRing._render();
    this.audience.renderHypePreview(0);
  }

  pickCard(index) {
    if (this.committedCards.length >= this.attackValue) {
      return;
    }

    const card = this.hand.pickCard(index);
    this.committedCards.push({
      ...card,
      meta: {
        isLeftActive: false,
        isRightActive: false
      }
    });

    if (this.committedCards.length >= 2) {
      const currentCard = this.committedCards[this.committedCards.length - 1];
      const prevCard = this.committedCards[this.committedCards.length - 2];
      currentCard.meta.isLeftActive = this._isCardComponentActive(
        currentCard,
        prevCard
      );
      prevCard.meta.isRightActive = currentCard.meta.isLeftActive;
    }

    this._renderLastPickedCard();
    this.audience.renderHypePreview(this._getAudienceHypePreview());
    this.hand.render();
  }

  refillHand() {
    this.audience.renderHypePreview(0);
    this.commitCards();

    this.hand.drawUntilFull();
    this.hand.render();
  }

  // TODO: Refatcor
  // takeBack() {
  //   if (this.committedCards.length) {
  //     const card = this.committedCards.pop().card;
  //     if (card === 'flip') {
  //       this.hand.addCard(this._flippedCommittedCard.pop());
  //     } else {
  //       this.hand.addCard(card);
  //     }
  //     this.battlefieldCards.removeChild(this.battlefieldCards.lastChild);
  //     this.hand.render();
  //   }
  // }

  /* Private */

  _generateAttackValue() {
    this.attackValue = random(2, 6);
  }

  _getAudienceHypePreview() {
    let totalCommitted = this._getCommittedCardsTotal();
    totalCommitted += this._getCommittedCardBonus();
    return totalCommitted;
  }

  _getCardPowerText(cardValue) {
    return cardPowerText[parseInt(cardValue) - 1].power || '';
  }

  _getCommittedCardBonus() {
    let bonus = 0;
    if (this.committedCards[4]) {
      bonus += 1;
    }

    if (this.committedCards[5]) {
      bonus += 2;
    }

    return bonus;
  }

  _getCommittedCardsTotal() {
    let sum = 0;
    this.committedCards.forEach((card, index) => {
      sum += card.value;

      // Add card power if it gives hype
      switch (card.powerIndex) {
        case 2:
          if (index === 0) {
            sum += 1;
          }
          break;
        case 3:
          if (this.committedCards.length === 1) {
            sum += 2;
          }
          break;
        case 5:
          sum += index + 1;
          break;
        default:
      }
    });

    sum += this._getCommittedCardBonus();
    return sum;
  }

  _isBattleEnded() {
    return (
      this.state.selectedKnights.some(knight => knight.health <= 0) ||
      this.state.selectedKnights.every(knight => knight.attacks <= 0)
    );
  }

  _isCardComponentActive(card, testCard, testLeftSize = true) {
    if (testLeftSize) {
      return testCard.colorRight === card.colorLeft;
    }
    return card.colorRight === testCard.colorLeft;
  }

  _resolveAttack() {
    const { audience } = this;
    let committedValue = this._getCommittedCardsTotal();

    const hypeDifference = committedValue - audience.meter;

    let generatedExcitement = 0;
    if (Math.abs(hypeDifference) > audience.margin) {
      generatedExcitement =
        hypeDifference - this.audience.margin * Math.sign(hypeDifference);

      audience.excitement += this.audience.getGeneratedCheersTotal(
        generatedExcitement,
        this.committedCards
      );
    }

    audience.meter = Math.max(0, committedValue);
    this._resolveSelectedCardPower(generatedExcitement);
    this.knightsStats.update(this.attackingKnightIndex, this.attackValue);

    this.audience.renderMeters();
    this.battleRing.attackResolved();
    this.knightsStats.render();
    this.hand.render();
  }

  _resolveSelectedCardPower(generatedExcitement) {
    this.committedCards.forEach((card, index) => {
      switch (card.powerIndex) {
        case 0:
          if (this.audience.meter >= 3) {
            this.hand.addCard(this.hand.drawRandomCard());
          }
          break;
        case 1:
          if (generatedExcitement > 0) {
            this.audience.excitement += 1;
          }
          break;
        case 4:
          if (index === this.committedCards.length - 1) {
            this.hand.addCard(this.hand.drawRandomCard());
          }
          break;
        case 6:
          if (card.meta.isLeftActive && card.meta.isRightActive) {
            this.audience.excitement += 2;
          }
          break;
        default:
      }
    });
  }

  /* Renders */

  _animateMessage() {
    const cards = document.querySelectorAll(
      '.battlefield__cards__wrapper .card'
    );
    const destination = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    cards.forEach(card => {
      card.style.transform = `translate(${
        destination.x - card.getBoundingClientRect().x - 114
      }px, ${
        destination.y - card.getBoundingClientRect().y - 100
      }px) scale(0.01)`;
    });
    this.messageRenderer.animate(this.committedCards);
  }

  _renderLastPickedCard() {
    const index = this.committedCards.length - 1;
    const pickedCard = this.committedCards[index];
    const card = cardRenderer.getCardEl(pickedCard);
    this.cardsEl
      .querySelector(`.card__slot:nth-child(${index + 1})`)
      .appendChild(card);
  }

  _renderPlaceHolders() {
    let html = '';
    for (let i = 0; i < this.attackValue; i++) {
      html += '<div class="card__slot"></div>';
    }
    this.cardsEl.innerHTML = html;
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
