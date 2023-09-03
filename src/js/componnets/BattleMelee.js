class BattleMelee {
  constructor(state) {
    this.state = state;
    this.attackingKnightIndex = 0;
    this.audience = {
      meter: 0,
      excitement: 0,
      margin: 1,
      percentage: {
        faith: Math.round((Math.random() * 0.15 + 0.1) * 10),
        cunning: Math.round((Math.random() * 0.15 + 0.1) * 10),
        strength: Math.round((Math.random() * 0.15 + 0.1) * 10),
        noblesse: Math.round((Math.random() * 0.15 + 0.1) * 10)
      }
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
    this.cardsEl = document.querySelector('.battlefield__cards__wrapper');
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
    this._renderPlaceHolders();

    this.hand.drawUntilFull();
    this.hand.render();
    this._renderAudience();
    this._renderAudienceHypePreview();
    this._renderAudiencePercentages();
    this._renderKnightsStats();

    this._registerEvents();
  }

  generateAttackCard() {
    this.attackCard = random(2, 6);
  }

  getCommittedCardsTotal() {
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
    return sum;
  }

  takeBack() {
    if (this.committedCards.length) {
      const card = this.committedCards.pop().card;
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

    if (
      this.strikesCount >= 8 ||
      this.state.selectedKnights.every(knight => knight.health <= 0)
    ) {
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
    this._renderPlaceHolders();

    this.battleRing._render();
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

  getGeneratedCheersTotal(difference) {
    let total = difference * this.audience.percentage.mix;
    for (let i = 0; i < this.committedCards.length - 1; i++) {
      if (this.committedCards[i].meta.isRightActive) {
        switch (this.committedCards[i].colorRight) {
          case COLORS_PREFIX.argent:
            total += difference * this.audience.percentage.faith;
            break;
          case COLORS_PREFIX.gules:
            total += difference * this.audience.percentage.strength;
            break;
          case COLORS_PREFIX.purpur:
            total += difference * this.audience.percentage.noblesse;
            break;
          case COLORS_PREFIX.sable:
            total += difference * this.audience.percentage.cunning;
            break;
        }
      }
    }
    console.log('total ', total);
    return total;
  }

  resolveAttack() {
    const { audience } = this;
    let committedValue = this.getCommittedCardsTotal();

    audience.meter += this._getCommittedCardBonus();
    const hypeDifference = committedValue - audience.meter;

    let generatedExcitement = 0;
    if (Math.abs(hypeDifference) > audience.margin) {
      generatedExcitement =
        hypeDifference - this.audience.margin * Math.sign(hypeDifference);
      console.log(
        'Generated excitement ',
        generatedExcitement,
        ' Total ',
        this.getGeneratedCheersTotal(generatedExcitement)
      );
      audience.excitement += this.getGeneratedCheersTotal(generatedExcitement);
    }

    audience.meter = Math.max(0, committedValue);
    this._resolveSelectedCardPower(hypeDifference, generatedExcitement);

    const defendingKnight =
      this.state.selectedKnights[+!this.attackingKnightIndex];
    defendingKnight.health -= this.attackCard;
    this.state.selectedKnights[this.attackingKnightIndex].attacks -= 1;
    defendingKnight.health = Math.max(defendingKnight.health, 0);

    this.hand.render();
    this._renderAudience();
    this.battleRing.attackResolved();
    this._renderKnightsStats();
  }

  _resolveSelectedCardPower(generatedHype, generatedExcitement) {
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

  pickCard(index) {
    if (index !== null) {
      if (this.commitCards.length >= this.attackCard) {
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

      this.hand.render();
      this._renderLastPickedCard();
    }
    this._renderAudienceHypePreview();
  }

  /* Private */

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

  _isCardComponentActive(card, testCard, testLeftSize = true) {
    if (testLeftSize) {
      return testCard.colorRight === card.colorLeft;
    }
    return card.colorRight === testCard.colorLeft;
  }

  _renderAudience() {
    this.audienceMeterEl.style.transform = `translateX(${
      this.audience.meter * 100
    }px)`;
    this.audienceExcitementEl.textContent = this.audience.excitement;
  }

  _renderAudienceHypePreview() {
    let totalCommitted = this.getCommittedCardsTotal();
    totalCommitted += this._getCommittedCardBonus();

    this.audienceHypePreviewEl.style.transform = `translateX(-${
      1000 - totalCommitted * 100
    }px)`;
  }

  _renderKnightsStats() {
    let knightStatsLeft = document.querySelector(
      '.battle__knight__stats:first-child'
    );
    let healthEl = knightStatsLeft.querySelector('.battle__knight__health');
    let attacksEl = knightStatsLeft.querySelector('.battle__knight__attacks');

    healthEl.textContent = this.state.selectedKnights[0].health;
    attacksEl.textContent = this.state.selectedKnights[0].attacks;

    knightStatsLeft = document.querySelector(
      '.battle__knight__stats:last-child'
    );
    healthEl = knightStatsLeft.querySelector('.battle__knight__health');
    attacksEl = knightStatsLeft.querySelector('.battle__knight__attacks');

    healthEl.textContent = this.state.selectedKnights[1].health;
    attacksEl.textContent = this.state.selectedKnights[1].attacks;
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
    for (let i = 0; i < this.attackCard; i++) {
      html += '<div class="card__slot"></div>';
    }
    this.cardsEl.innerHTML = html;
  }

  _renderAudiencePercentages() {
    this.audience.percentage.mix =
      10 -
      this.audience.percentage.strength -
      this.audience.percentage.faith -
      this.audience.percentage.cunning -
      this.audience.percentage.noblesse;

    let element = document.querySelector('.audience__percentage--gu');
    element.style.width = `${this.audience.percentage.strength * 10}%`;
    element.textContent = this.audience.percentage.strength;

    element = document.querySelector('.audience__percentage--ar');
    element.style.width = `${this.audience.percentage.faith * 10}%`;
    element.textContent = this.audience.percentage.faith;

    element = document.querySelector('.audience__percentage--sa');
    element.style.width = `${this.audience.percentage.cunning * 10}%`;
    element.textContent = this.audience.percentage.cunning;

    element = document.querySelector('.audience__percentage--pu');
    element.style.width = `${this.audience.percentage.noblesse * 10}%`;
    element.textContent = this.audience.percentage.noblesse;

    element = document.querySelector('.audience__percentage--mix');
    element.style.width = `${this.audience.percentage.mix * 10}%`;
    element.textContent = this.audience.percentage.mix;
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
