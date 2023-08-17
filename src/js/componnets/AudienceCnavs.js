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
  }

  init() {
    this.canvasEl = document.querySelector('.battlefield__audience canvas');
    const randomSkinColor = random(0, audienceSkinColorPalette.length);
    const randomClothColor1 = random(0, audienceClothsColorPalette.length);
    const randomClothColor2 = random(0, audienceClothsColorPalette.length);
    for (let i = 0; i < 100; i++) {
      this.people.push({
        skinColor: randomSkinColor,
        clothsColor: [randomClothColor1, randomClothColor2]
      });
    }
  }
}
