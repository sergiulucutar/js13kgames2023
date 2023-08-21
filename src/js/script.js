var COLORS = {
  azure: 1,
  gules: 2,
  purpur: 3,
  sable: 4,
  vert: 5,
  argent: 6,
  or: 7
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
  heraldry.showState();
  tournament.initBattle();
  tournament.renderBattle();
  // generateCoatOfArms();

  const audienceCanvas = new AudienceCanvas();

  window.pickCard = cardIndex => tournament.pickCard(cardIndex);

  window.refillHand = () => tournament.refillHand();

  window.selectKnight = knight => {
    heraldry.selectKnight(knight);
  };

  window.onBattleEnded = () => {
    heraldryScreen.classList.add('screen--visible');
    tournamentScreen.classList.remove('screen--visible');
  };

  document
    .querySelector('.host-battle__button')
    .addEventListener('click', () => {
      heraldryScreen.classList.remove('screen--visible');
      tournamentScreen.classList.add('screen--visible');

      audienceCanvas.init();
      audienceCanvas.addExcitment(8);
      audienceCanvas.animate();
    });
};
