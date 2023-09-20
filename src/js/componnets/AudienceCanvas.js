const audienceClothsColorPalette = [
  '#514B23',
  '#656839',
  '#333232',
  '#BCA371',
  '#9B2915',
  '#E9B44C',
  '#1C110A',
  '#0B4F6C'
];
const audienceSkinColorPalette = [
  '#f5f1e6',
  '#f1bfa8',
  '#efd7ca',
  '#e1a185',
  '#c58063',
  '#ac7058',
  '#8a4e34',
  '#683925'
];
class AudienceCanvas {
  constructor(state) {
    this.state = state;
    this.canvas = '';
    this.people = [];
    this.emoji = [];

    this.headSize = 16;
    this.perRow = Math.round(window.innerWidth / 23);
    this.init();
  }

  init() {
    this.canvas = document.querySelector('.battlefield__audience canvas');
    this.emojiWrapperEl = document.querySelector('.audience__emoji');
    this.resizeCanvas();
    this.ctx = this.canvas.getContext('2d');

    const audienceCount = Math.min(this.state.level * 30, 250);
    // A set number I found working fine during testing
    this.perRow = audienceCount / 2;
    this.rowOffset =
      window.innerWidth / 2 - (this.perRow * this.headSize * 1.3) / 2;

    for (let i = 0; i < audienceCount; i++) {
      const randomSkinColor =
        audienceSkinColorPalette[random(0, audienceSkinColorPalette.length)];
      const randomClothColor1 =
        audienceClothsColorPalette[
          random(0, audienceClothsColorPalette.length)
        ];
      const randomClothColor2 =
        audienceClothsColorPalette[
          random(0, audienceClothsColorPalette.length)
        ];
      const size = Math.random() * 0.3 + 0.8;
      const pep = {
        yPositionOffset: -Math.random() * this.headSize,
        headSize: this.headSize * size,
        skinColor: randomSkinColor,
        clothsColor: [randomClothColor1, randomClothColor2],
        size,
        excitementLevel: random(4, 9),
        jumpingAnimationOffset: 0,
        positionReachAnimOffset: 1,
        positionReached: false
      };
      pep.position = this._getPepPosition(pep, this.people.length);
      pep.startPositionOffset = [
        random(0, window.innerHeight) - pep.position.x,
        -random(100, 400) - pep.position.y
      ];
      this.people.push(pep);
    }
  }

  animate() {
    this.render();
    this.renderEmoji();
    requestAnimationFrame(this.animate.bind(this));
  }

  addExcitement(level) {
    this.people.forEach(
      pep => pep.excitementLevel <= level && (pep.jumpingAnimationOffset = 1)
    );

    const emojiCount = 20;
    let index = 0;
    while (index < emojiCount) {
      const emoji = document.createElement('span');
      emoji.classList.add('emoji');
      emoji.style.opacity = 1;
      emoji.style.left = random(100, this.canvas.width - 100) + 'px';
      emoji.style.top = random(10, this.canvas.height - 100) + 'px';
      emoji.innerHTML = '&#128513;';
      this.emoji.push(emoji);
      this.emojiWrapperEl.appendChild(emoji);
      index += 1;
    }
  }

  resizeCanvas() {
    const bounds = this.canvas.getBoundingClientRect();
    this.canvas.width = bounds.width;
    this.canvas.height = bounds.height;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let index = this.people.length - 1,
      pep,
      x,
      y;
    while (index >= 0) {
      pep = this.people[index];
      index -= 1;

      x = pep.position.x;
      y = pep.position.y;

      if (!pep.positionReached) {
        x += pep.startPositionOffset[0] * pep.positionReachAnimOffset;
        y += pep.startPositionOffset[1] * pep.positionReachAnimOffset;
        pep.positionReachAnimOffset -= 0.004 * pep.excitementLevel;

        if (pep.positionReachAnimOffset <= 0.05) {
          pep.positionReached = true;
        }
      }

      if (pep.jumpingAnimationOffset > 0) {
        y -= Math.sin(3.14 * pep.jumpingAnimationOffset) * pep.headSize * 2;
        pep.jumpingAnimationOffset -= 0.05;
      }

      this.ctx.fillStyle = pep.skinColor;
      this.ctx.fillRect(x, y, pep.headSize, pep.headSize);
      this.ctx.fillStyle = pep.clothsColor[0];
      this.ctx.fillRect(x, y + pep.headSize, pep.headSize, pep.headSize * 3);
      this.ctx.fillStyle = pep.clothsColor[1];
      this.ctx.fillRect(
        x,
        y + pep.headSize * 4,
        pep.headSize,
        pep.headSize * 2
      );
    }
  }

  renderEmoji() {
    if (this.emoji.length) {
      this.emoji.forEach(emoji => {
        emoji.style.opacity -= 0.05;
        emoji.style.top = `${emoji.offsetTop - 1}px`;
      });
      this.emoji = this.emoji.filter(emoji => emoji.style.opacity > 0);
    }
  }

  _getPepPosition(pep, index) {
    let y =
      this.canvas.height -
      pep.headSize * 7 -
      Math.floor(index / this.perRow) * (this.headSize * 2.5) -
      (1 - pep.size) * pep.headSize * 6 +
      pep.yPositionOffset;

    let x =
      (index % this.perRow) * this.headSize * 1.2 +
      this.rowOffset +
      (this.headSize / 2) * Math.floor(index / this.perRow);

    y -= Math.sin(3.14 * (x / window.innerWidth)) * 260;

    return {
      x,
      y
    };
  }
}
