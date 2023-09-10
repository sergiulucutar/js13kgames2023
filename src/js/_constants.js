var cardPowerText = [
  {
    word: 'unrelenting',
    power: `Adjacent cards value are equal to this cards value`
  },
  {
    word: 'thunderous',
    power: 'Gain excitement equal to half my value.'
  },
  {
    word: 'powerful',
    power: '<strong>(3)</strong>: +3 hype'
  },
  {
    word: 'devastating',
    power: 'Double the hype if this is the only committed card'
  },
  {
    word: 'ruthless',
    power: '<strong>(5): Adjacent cards have +2 value'
  },
  {
    word: 'cataclysmic',
    power: '<strong>(8)</strong>: Draw 2 cards and gain 2 excitement'
  },
  {
    word: 'calculated',
    power: 'If value is less or equal to 2, draw 1 card and gain 1 excitement'
  },
  {
    word: 'strategic',
    power: 'Add card positions number to the value of the card'
  },
  {
    word: 'prudent',
    power: "Prevent excitement from being lost equal to this card's value"
  },
  {
    word: 'deliberate',
    power:
      'If this is the first or last card, draw X cards and gain X excitement equal to half the value'
  },
  {
    word: 'reflective',
    power: "Gain hype equal to this card's position - this card's value"
  },
  {
    word: 'sagacious',
    power:
      "If value - position < 0, draw X cards, else gain X excitement, where X is this card's value"
  },
  {
    word: 'graceful',
    power: '+3 value if this has 2 adjacent committed cards'
  },
  {
    word: 'chivalrous',
    power:
      "You cannot gain or lose excitement unless hype exceeds this card's value"
  },
  {
    word: 'refined',
    power: 'Gain excitement based on this card value - this card position'
  },
  {
    word: 'gallant',
    power:
      'Prevent X excitement from being lost, where X is the position of teh card'
  },
  {
    word: 'majestic',
    power: 'Draw a card for each excitement earned this round'
  },
  {
    word: 'exquisite',
    power: '+X value, where x is half of gained excitement rounded down'
  }
];

var BattleTypes = {
  MeleeCombat: 1,
  Jousting: 2,
  Archery: 3
};

var gameEvents = [
  {
    name: 'Tavern Brawl',
    reputationLevel: [1, 2],
    subtitle:
      'Your friend gets caught up in a tavern brawl. Spotting the opportunity, and aided by the mead your body, you take a spot on a table and start enthralling the audience.',
    battles: [1]
  },
  {
    name: 'Fight at the market',
    reputationLevel: [1, 2],
    subtitle:
      'Your friend gets caught up in a tavern brawl. Spotting the opportunity, and aided by the mead your body, you take a spot on a table and start enthralling the audience.',
    battles: [1]
  },
  {
    name: 'Duel at the Manor',
    reputationLevel: [2, 4],
    subtitle:
      'Seeing for potential, a noble took interest in you. Thus, you arrived at his manor in order to oversee the duel between him and his rival.',
    battles: [1]
  },
  {
    name: 'Feast after hunt',
    reputationLevel: [2, 4],
    subtitle:
      'Your increase in reputation caused you to meet a noblewoman which offered you teh change to entertain teh audience during some duels.',
    battles: [3]
  },
  {
    name: 'A small melee tourney',
    reputationLevel: [3, 5],
    subtitle:
      'Celebrating the saint of vertu, a king organizes a small tourney.',
    battles: [1, 1, 1]
  },
  {
    name: 'The Summer tournament',
    reputationLevel: [4, 6],
    subtitle:
      'Your prestige has earned you the great privilege to be a herald that hols the annual Summer Tournament',
    battles: [1, 2, 3, 1, 2]
  }
];
