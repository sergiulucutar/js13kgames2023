var COLORS = {
  azure: 1,
  gules: 2,
  purpur: 3,
  sable: 4,
  vert: 5,
  argent: 6,
  or: 7
};

var COLORS_PREFIX = {
  gules: 'gu',
  purpur: 'pu',
  sable: 'sa',
  argent: 'ar'
};

var ZONES = {
  chief: 'c',
  fesse: 'f',
  base: 'b',
  dexter: 'd',
  pale: 'p',
  sinister: 's',
  bend: 'be',
  sinisterBend: 'sbe'
};

window.onload = () => {
  const heraldryScreen = document.querySelector('.screen:nth-child(1)');
  const tournamentScreen = document.querySelector('.screen:nth-child(2)');

  const state = new State();
  const heraldry = new Herardly(state);
  const tournament = new Tournament(state);

  window.addEventListener('contextmenu', e => e.preventDefault());

  window.onBattleEnded = data => {
    heraldryScreen.classList.add('screen--visible');
    tournamentScreen.classList.remove('screen--visible');

    state.addEarnedReputation(data.generatedExcitement);
    heraldry.toggleBattleEndScreen();
    if (state.showRewards) {
      heraldry.showRewards();
    }
    heraldry.gameEvents.render();
  };

  window.storyContinue = () => {
    heraldry.toggleBattleEndScreen();
  };

  window.nextEvent = () => {
    heraldry.nextEvent();
  };

  window.chooseReward = (cardIndex, event) => {
    heraldry.chooseReward(cardIndex, event);
  };

  document
    .querySelector('.host-battle__button')
    .addEventListener('click', () => {
      heraldryScreen.classList.remove('screen--visible');
      tournamentScreen.classList.add('screen--visible');

      tournament.initBattle();
    });

  heraldry.render();

  // onBattleEnded({ generatedExcitement: 10 });
};
