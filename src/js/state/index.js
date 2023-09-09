class State {
  constructor() {
    this.level = 1;
    this.reputation = {
      earned: 0,
      required: 3
    };
    this.availableAbilityPoints = 1;

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

    this.defaultDeck = [
      'ar1',
      'ar2',
      'ar3',
      'ar4',
      'ar5',
      'ar6',
      'sa1',
      'sa2',
      'sa3',
      'sa4',
      'ar5',
      'ar6',
      'gu1',
      'gu2',
      'gu3',
      'gu4',
      'gu5',
      'gu6',
      'pu1',
      'pu2',
      'pu3',
      'pu4',
      'pu5',
      'pu6'
    ];

    this.defaultDeck = this._generateDefaultDeck();
    this.abilities = [];
    this.mechanics = [
      {
        levelRequired: 3,
        isUnlocked: false,
        text: 'Present the Winner phase, play all cards in hand'
      },
      {
        levelRequired: 5,
        isUnlocked: false,
        text: 'Present the competitors phase, where you...'
      },
      {
        levelRequired: 8,
        isUnlocked: false,
        text: 'Keen eye. Be able to react to small reactions that the fighter engage in'
      }
    ];
  }

  selectKnight(knight) {
    this.selectedKnights.push(knight);
  }

  addEarnedReputation(amount) {
    this.reputation.earned += amount;

    if (this.reputation.earned >= this.reputation.required) {
      while (this.reputation.earned >= this.reputation.required) {
        this.level += 1;
        this.enableMechanics();
        this.reputation.required = this._getReputationRequired(this.level);
        this.reputation.earned -= this.reputation.required;
        this.reputation.earned = Math.max(0, this.reputation.earned);
      }
    } else if (this.reputation.earned < 0) {
      this.level -= 1;
      this.level = Math.max(1, this.level);
      this.reputation.required = this._getReputationRequired(this.level);
      this.reputation.earned += this.reputation.required;
    }

    this.availableAbilityPoints = this.level;
  }

  enableMechanics() {
    if (this.level >= 3) {
      this.mechanics[0].isUnlocked = true;
    }

    if (this.level >= 5) {
      this.mechanics[1].isUnlocked = true;
    }

    if (this.level >= 8) {
      this.mechanics[2].isUnlocked = true;
    }
  }

  unlockAbility(index) {
    this.abilities.push(index);
    this.availableAbilityPoints -= 1;
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
      const randomPower = random(0, cardPowerText.length);

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
