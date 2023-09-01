var cardPowerText = [
  {
    power: 'Draw 1 if you generate 3 or more hype'
  },
  {
    power: 'If you generate excitement, generate 1 more'
  },
  {
    power: 'If this is in position 1, gain 1 hype'
  },
  {
    power: '+2 hype if this is the only card committed'
  },
  {
    power: 'If this is in the last position, draw 1 card'
  },
  {
    power: '+X hype, where X is the position of the card slot'
  },
  // {
  //   power: 'Next round, lose 0 excitement if this is placed last'
  // }
  {
    power: '+2 excitement if both components of this card are active'
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
