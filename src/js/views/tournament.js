class Tournament {
  constructor(state) {
    this.state = state;
  }

  initBattle() {
    this.battle = new BattleMelee(this.state);
  }
}
