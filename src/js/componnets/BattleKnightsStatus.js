class BattleKnightStatus {
  constructor(state) {
    this.state = state;

    let knightStatsLeft = document.querySelector(
      '.battle__knight__stats:first-child'
    );
    this.leftHealthEl = knightStatsLeft.querySelector(
      '.battle__knight__health'
    );
    this.leftAttacksEl = knightStatsLeft.querySelector(
      '.battle__knight__attacks'
    );

    knightStatsLeft = document.querySelector(
      '.battle__knight__stats:last-child'
    );
    this.rightHealthEl = knightStatsLeft.querySelector(
      '.battle__knight__health'
    );
    this.rightAttacksEl = knightStatsLeft.querySelector(
      '.battle__knight__attacks'
    );
  }

  update(attackingKnightIndex, attackValue) {
    const defendingKnight = this.state.selectedKnights[+!attackingKnightIndex];
    defendingKnight.health -= attackValue;
    this.state.selectedKnights[attackingKnightIndex].attacks -= 1;
    defendingKnight.health = Math.max(defendingKnight.health, 0);
  }

  render() {
    this.leftAttacksEl.textContent = this.state.selectedKnights[0].attacks;
    this.leftHealthEl.textContent = this.state.selectedKnights[0].health;
    this.rightAttacksEl.textContent = this.state.selectedKnights[1].attacks;
    this.rightHealthEl.textContent = this.state.selectedKnights[1].health;
  }
}
