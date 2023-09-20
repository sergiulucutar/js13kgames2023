class Tournament {
  constructor(state) {
    this.state = state;
  }

  initBattle() {
    console.log('INIT BATTLE');
    this.battle = new BattleMelee(this.state);
  }
}
