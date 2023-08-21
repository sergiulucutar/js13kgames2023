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
  constructor() {
    this.canvas = '';
    this.people = [];
    this.emoji = [];

    this.headSize = 20;
    this.perRow = Math.round(window.innerWidth / 23);
  }

  init() {
    this.canvas = document.querySelector('.battlefield__audience canvas');
    this.emojiWrapperEl = document.querySelector('.audience__emoji');
    this.resizeCanvas();
    this.ctx = this.canvas.getContext('2d');
    for (let i = 0; i < 240; i++) {
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
      this.people.push({
        yPositionOffset: -Math.random() * this.headSize,
        headSize: this.headSize * size,
        skinColor: randomSkinColor,
        clothsColor: [randomClothColor1, randomClothColor2],
        size,
        excitmentLevel: random(4, 9),
        jumpingAnimationOffset: 0
      });
    }
  }

  animate() {
    this.render();
    this.renderEmoji();
    requestAnimationFrame(this.animate.bind(this));
  }

  addExcitment(level) {
    this.people.forEach(
      pep => pep.excitmentLevel <= level && (pep.jumpingAnimationOffset = 1)
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
    this.canvas.width = 1900;
    this.canvas.height = 218;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let x, y;
    this.people.forEach((pep, i) => {
      y =
        Math.floor(i / this.perRow) * (this.headSize * 2.5) +
        (1 - pep.size) * pep.headSize * 6 +
        pep.yPositionOffset;

      if (pep.jumpingAnimationOffset > 0) {
        y -= Math.sin(3.14 * pep.jumpingAnimationOffset) * pep.headSize * 2;
        pep.jumpingAnimationOffset -= 0.1;
      }

      x =
        (i % this.perRow) * this.headSize * 1.2 +
        (this.headSize / 2) * Math.floor(i / this.perRow);

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
    });
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
}
