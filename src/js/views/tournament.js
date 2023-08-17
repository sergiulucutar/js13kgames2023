class Tournament {
  constructor(state) {
    this.state = state;

    this.currentBattle = {
      attackingKnightIndex: 0,
      audience: {
        meter: 1,
        excitement: 0,
        margin: 2
      },
      discardPile: [],
      deck: [],
      hand: [],
      attackCard: '',
      selectedCard: '',
      strikesCount: 0
    };

    this.attackValueEL = document.querySelector(
      '.battlefield__cards__attack h3'
    );
    this.battlefieldCards = document.querySelector('.battlefield__cards');
    this.slotCardEl = document.querySelector('.battlefield__cards__slot');
    this.audienceMeterEl = document.querySelector(
      '.battlefield__audience__meter'
    );
    this.audienceExcitmentEl = document.querySelector(
      '.battlefield__audience__excitement span'
    );
  }

  initBattle() {
    this.currentBattle.deck = [...this.state.defaultDeck];
    this.drawUntilFull();
    this.generateAttackCard();
    this._renderCommittedCards();
  }

  endBattle() {
    onBattleEnded();
  }

  nextBattleStep() {
    this.currentBattle.strikesCount++;
    console.log('Strike: ', this.currentBattle.strikesCount);
    if (this.currentBattle.strikesCount >= 5) {
      this.endBattle();
      return;
    }

    this.currentBattle.attackingKnightIndex =
      +!this.currentBattle.attackingKnightIndex;
    this.generateAttackCard();
    this.currentBattle.discardPile.push(this.currentBattle.selectedCard);
    this.currentBattle.selectedCard = '';
    this._renderCommittedCards();
  }

  generateAttackCard() {
    this.attackValueEL.parentElement.classList.remove.apply(
      this.attackValueEL.parentElement.classList,
      Array.from(this.attackValueEL.parentElement.classList).filter(v =>
        v.startsWith('card--')
      )
    );
    const attackValue = random(1, 5);
    const knightColors =
      this.state.selectedKnights[this.currentBattle.attackingKnightIndex]
        .colors;
    const randomColorIndex = random(0, knightColors.length);
    const color = getColorName(knightColors[randomColorIndex]);
    this.currentBattle.attackCard = color[0] + color[1] + attackValue;
    this.attackValueEL.parentElement.classList.add(
      `card--${color[0] + color[1]}`
    );
    this.attackValueEL.textContent = attackValue;
  }

  drawUntilFull() {
    const { deck, hand, discardPile } = this.currentBattle;
    const cardNeeded = 5 - hand.length;
    if (cardNeeded > deck.length) {
      this.currentBattle.deck = [...deck, discardPile];
      this.currentBattle.discardPile = [];
    }

    while (this.currentBattle.hand.length < 5) {
      this.currentBattle.hand.push(this.drawRandomCard());
    }
  }

  renderBattle() {
    const knightsEl = document.querySelector('.battlefield__knights');
    this.state.selectedKnights.forEach(knight => {
      const divEl = getKnightRendering(knight);
      knightsEl.appendChild(divEl);
    });
    this._renderHand();
  }

  drawRandomCard() {
    const randomIndex = random(0, this.currentBattle.deck.length - 1);
    const card = this.currentBattle.deck[randomIndex];
    this.currentBattle.deck.splice(randomIndex, 1);
    return card;
  }

  pickCard(index) {
    if (index !== null) {
      this.currentBattle.selectedCard = this.currentBattle.hand[index];
      this.currentBattle.hand.splice(index, 1);
    }
    this._renderCommittedCards(true);
    this._renderHand();

    setTimeout(() => {
      this.resolveAttack();
    }, 1000);
    setTimeout(() => {
      this.nextBattleStep();
    }, 2000);
  }

  refillHand() {
    this.pickCard(null);
    setTimeout(() => {
      this.drawUntilFull();
      this._renderHand();
    }, 3000);
  }

  resolveAttack() {
    const { attackCard, selectedCard } = this.currentBattle;
    let max = Math.max(parseInt(attackCard[2]), parseInt(selectedCard[2] || 0));

    if (selectedCard) {
      const isSameColor =
        attackCard.substring(0, 2) === selectedCard.substring(0, 2);

      console.log(
        'COLORS ',
        attackCard.substring(0, 2),
        selectedCard.substring(0, 2),
        isSameColor
      );
      if (isSameColor) {
        max = parseInt(attackCard[2]) + parseInt(selectedCard[2]);
      }
    }

    const excitmentDifference = max - this.currentBattle.audience.meter;
    if (Math.abs(excitmentDifference) > this.currentBattle.audience.margin) {
      console.log(
        'ADDING because ',
        excitmentDifference,
        ' > ',
        this.currentBattle.audience.margin
      );
      this.currentBattle.audience.excitement += excitmentDifference;
    }
    this.currentBattle.audience.meter = max;
    this._renderAudience();
  }

  _renderHand() {
    const handEl = document.querySelector('.tournament__hand ul');
    let html = '';
    this.currentBattle.hand.forEach((card, index) => {
      html += `<li class="card card--hand card--${
        card[0] + card[1]
      }" onclick="pickCard(${index})"><h3 class="card__value">${
        card[2]
      }</h3></li>`;
    });
    handEl.innerHTML = html;
  }

  _renderCommittedCards(cardPicked = false) {
    if (cardPicked) {
      this.slotCardEl.classList.remove('visible');
      if (this.currentBattle.selectedCard) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(
          `card--${
            this.currentBattle.selectedCard[0] +
            this.currentBattle.selectedCard[1]
          }`
        );
        card.innerHTML = `<h3 class="card__value">${this.currentBattle.selectedCard[2]}</h3>`;
        this.battlefieldCards.appendChild(card);
      }
    } else {
      if (this.battlefieldCards.children.length > 2) {
        this.battlefieldCards.removeChild(this.battlefieldCards.lastChild);
      }
      this.slotCardEl.classList.add('visible');
    }
  }

  _renderAudience() {
    this.audienceMeterEl.textContent = this.currentBattle.audience.meter;
    this.audienceExcitmentEl.textContent =
      this.currentBattle.audience.excitement;
  }
}
