class GameEvents {
  constructor(state) {
    this.state = state;

    this.eventScreen = document.querySelector('.heraldry--left');
    this.prevEventEl = document.querySelector('.event--prev');
    this.currentEventEventEl = document.querySelector('.event:last-child');
    this.titleEl = document.querySelector('.event__name h1');
    this.subtitleEl = document.querySelector('.event__subtitle em');
  }

  init() {
    this.currentEvent = this._chooseRandomEvent();

    window.nextEvent = () =>
      (this.eventScreen.style.transform = `translateX(-50%)`);
  }

  next() {
    this.prevEventEl.style.display = 'block';
    this.prevEvent = this.currentEvent;
    this.currentEvent = this._chooseRandomEvent();
  }

  render() {
    if (this.prevEvent) {
      this._renderEvent(this.prevEvent, this.prevEventEl);
    }
    this._renderEvent(this.currentEvent, this.currentEventEventEl);
  }

  _renderEvent(event, element) {
    const titleEl = element.querySelector('.event__name h1');
    const subtitleEl = element.querySelector('.event__subtitle em');
    titleEl.textContent = event.name;
    subtitleEl.textContent = event.subtitle;
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
