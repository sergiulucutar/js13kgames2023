class GameEvents {
  constructor(state) {
    this.state = state;

    this.titleEl = document.querySelector('.event__name h1');
    this.subtitleEl = document.querySelector('.event__subtitle em');
    this.battlesEl = document.querySelector('.event__tournament');
  }

  init() {
    this.currentEvent = this._chooseRandomEvent();
  }

  render() {
    this.titleEl.textContent = this.currentEvent.name;
    this.subtitleEl.textContent = this.currentEvent.subtitle;

    let html = '';
    this.currentEvent.battles.forEach(battle => {
      switch (battle) {
        case 1:
          html += '<li>Melee Combat</li>';
          break;
        case 2:
          html += '<li>Jousting</li>';
          break;
        case 3:
          html += '<li>Archery</li>';
          break;
      }
    });
    this.battlesEl.innerHTML = html;
  }

  _chooseRandomEvent() {
    const currentReputation = this.state.level;
    const possibleEvents = gameEvents.filter(
      event =>
        event.reputationLevel[0] <= currentReputation &&
        event.reputationLevel[1] >= currentReputation
    );
    const randomEvent = random(0, possibleEvents.length);

    return possibleEvents[randomEvent];
  }
}
