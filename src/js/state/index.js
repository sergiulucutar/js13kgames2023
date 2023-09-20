class State {
  constructor() {
    this.level = 1;
    this.records = [];
    this.unlockedCards = [0, 1, 2, 3, 4];

    this.knights = [
      {
        name: 'Geoffrey of Wycliffe',
        coastOfArms: {
          field: 5,
          chief: 1,
          fesse: 2,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 3,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Marllow of WhiteCastle',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [4, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Arthur of RedBarrow',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [2, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'John of East Marshes',
        coastOfArms: {
          field: 6,
          chief: 0,
          fesse: 1,
          base: 0,
          dexter: 2,
          pale: 3,
          sinister: 4,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'George of Sparrow Spire',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [1, 2],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Tomas Gregorry',
        coastOfArms: {
          field: 6,
          chief: 1,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 2,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      }
    ];

    this.selectedKnights = [
      {
        name: 'Marllow of WhiteCastle',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [4, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        },
        colors: [4, 6],
        health: 20,
        attacksCount: 0
      },
      {
        name: 'John of East Marshes',
        coastOfArms: {
          field: 6,
          chief: 0,
          fesse: 1,
          base: 0,
          dexter: 2,
          pale: 3,
          sinister: 4,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        },
        colors: [2, 3, 4],
        health: 20,
        attacksCount: 0
      }
    ];

    this.defaultDeck = this._generateDefaultDeck();
    this.showRewards = true;
  }

  addCard(cardIndex) {
    this.unlockedCards.push(cardIndex);
    this.defaultDeck = this._generateDefaultDeck();
  }

  addEarnedReputation(goToNextLevel) {
    if (goToNextLevel) {
      this.level += 1;
    }
    this.records.push(goToNextLevel);
    console.log('recods ', this.records);
  }

  getRewards() {
    let availableToUnlock = cardPowerText
      .map((card, index) => !this.unlockedCards.find(i => i === index) && index)
      .filter(i => i);
    const result = [];
    for (let i = 0; i < 3; i++) {
      const chosen = availableToUnlock[random(0, availableToUnlock.length)];
      result.push(chosen);
      availableToUnlock = availableToUnlock.filter(power => power !== chosen);
    }

    return result;
  }

  /* Private */

  _getReputationRequired(level) {
    let a = 1,
      b = 1,
      result = 2;
    while (level > 0) {
      result = a + b;
      a = b;
      b = result;
      level -= 1;
    }

    return result;
  }

  _generateDefaultDeck() {
    const deck = [];
    const colorEntries = Object.entries(COLORS_PREFIX);
    for (let i = 0; i < 20; i++) {
      const randomColor1 = colorEntries[random(0, colorEntries.length)][1];
      const randomColor2 = colorEntries[random(0, colorEntries.length)][1];
      const randomPower =
        this.unlockedCards[random(0, this.unlockedCards.length)];

      deck.push({
        value: random(0, 4),
        colorLeft: randomColor1,
        colorRight: randomColor2,
        powerIndex: randomPower,
        word: this._getCardWord()
      });
    }

    return deck;
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
