class BattleRing {
  constructor(state) {
    this.state = state;
    this.knightsEl = document.querySelector('.battlefield__knights');
    this.knightIdleStepDistance = 20;
    this.pauseForAttack = false;
  }

  init() {
    this.selectedKnights = this.state.selectedKnights.map(knight => {
      const divEl = getKnightRendering(knight);
      this.knightsEl.appendChild(divEl);
      return {
        ...knight,
        element: divEl,
        animationProgress: 0,
        idleStepDirection: 1,
        isAttacking: false,
        isAnimating: false,
        nextAnimationTimestamp: null
      };
    });
    this._render();
  }

  initAttack(attackingKnightIndex) {
    // this.attackingKnightIndex = attackingKnightIndex;
    // this.direction = attackingKnightIndex === 0 ? 1 : -1;
    // this.distance =
    //   this.selectedKnights[0].element.offsetLeft -
    //   this.selectedKnights[1].element.offsetLeft;
    // this.animationProgression = 1;
    // this.animationStep = 0.1;
  }

  attackResolved() {
    this.pauseForAttack = false;
  }

  isCloseEnough() {
    return (
      Math.abs(
        this.selectedKnights[0].element.offsetLeft -
          this.selectedKnights[1].element.offsetLeft
      ) <= 50
    );
  }

  _setNextAnimation(knight) {
    const randomSeconds = random(5, 10);
    knight.nextAnimationTimestamp = Date.now() + randomSeconds * 100;
  }

  _markKnightAttack(knight) {
    knight.element.classList.toggle('state__knight--attacked');
    setTimeout(() => {
      knight.element.classList.toggle('state__knight--attacked');
    }, 2000);
  }

  _render() {
    // if (!this.isCloseEnough()) {
    //   this.knightsEl.children[this.attackingKnightIndex].style.left = `${
    //     this.distance * (1 - this.animationProgression)
    //   }px`;
    //   this.animationProgression -= this.animationStep;

    //   requestAnimationFrame(() => this._render());
    // }

    if (!this.pauseForAttack) {
      this.selectedKnights.forEach((knight, index) => {
        if (knight.isAnimating) {
          if (knight.animationProgress >= 1) {
            if (knight.isAttacking) {
              this._markKnightAttack(
                this.selectedKnights.find(k => k !== knight)
              );
              this.pauseForAttack();
            }
            this._setNextAnimation(knight);
            knight.isAnimating = false;
            knight.animationProgress = 0;
          } else {
            knight.element.style.left = `${
              this.knightIdleStepDistance *
              knight.animationProgress *
              knight.idleStepDirection
            }px`;
            knight.element.style.top = `${
              -this.knightIdleStepDistance *
              Math.sin(1 - knight.animationProgress)
            }px`;
            knight.animationProgress += 0.1;
          }
        } else if (Date.now() > knight.nextAnimationTimestamp) {
          knight.isAnimating = true;
          knight.idleStepDirection = -knight.idleStepDirection;
          if (Math.random() > 0.9) {
            knight.isAttacking = true;
            knight.idleStepDirection = index * -2 + 1;
          }
        }
      });
    }
    requestAnimationFrame(() => this._render());
  }
}
