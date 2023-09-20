function getColorName(color) {
  const entries = Object.entries(COLORS);
  return entries.find(entry => entry[1] === color)[0];
}

const _canvasColors = {
  azure: '#2c67ad',
  gules: '#da3833',
  purpur: '#7b4b97',
  sable: '#000000',
  vert: '#62aa56',
  argent: '#ffffff',
  or: '#fdf151'
};

function getCoatOfArmsImage(coatOfArms) {
  const canvas = document.createElement('canvas');
  canvas.width = 104;
  canvas.height = 104;
  const ctx = canvas.getContext('2d');
  //clip
  ctx.beginPath();
  ctx.moveTo(4, 4);
  ctx.lineTo(100, 4);
  ctx.lineTo(100, 61.8);
  ctx.bezierCurveTo(100, 90, 50, 100, 50, 100);
  ctx.bezierCurveTo(50, 100, 4, 90, 4, 61.8);
  ctx.closePath();
  ctx.stroke();
  ctx.clip();

  if (coatOfArms.field) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.field)];
    ctx.fillRect(2, 2, 100, 100);

    if (coatOfArms.chief) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.chief)];
      ctx.fillRect(2, 2, 100, 35.3);
    }

    if (coatOfArms.fesse) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.fesse)];
      ctx.fillRect(2, 35, 100, 33.3);
    }

    if (coatOfArms.base) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.base)];
      ctx.fillRect(2, 2, 100, 33, 3);
    }

    if (coatOfArms.dexter) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.dexter)];
      ctx.fillRect(2, 2, 33.3, 100);
    }

    if (coatOfArms.pale) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.pale)];
      ctx.fillRect(35.3, 2, 33.3, 100);
    }

    if (coatOfArms.sinister) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.sinister)];
      ctx.fillRect(67, 2, 34, 100);
    }
  }

  if (coatOfArms.perFesse.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perFesse[0])];
    ctx.fillRect(2, 2, 100, 100);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perFesse[1])];
    ctx.fillRect(2, 51, 100, 50);
  }

  if (coatOfArms.perPale.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perPale[0])];
    ctx.fillRect(2, 2, 100, 100);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perPale[1])];
    ctx.fillRect(50, 2, 50, 100);
  }

  if (coatOfArms.perBend.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBend[1])];
    ctx.fillRect(2, 2, 100, 100);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBend[0])];
    ctx.beginPath();
    ctx.moveTo(2, 2);
    ctx.lineTo(100, 80);
    ctx.lineTo(100, 2);
    ctx.closePath();
    ctx.fill();
  }

  if (coatOfArms.perBendSinister.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBendSinister[1])];
    ctx.fillRect(2, 2, 100, 100);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBendSinister[0])];
    ctx.beginPath();
    ctx.moveTo(2, 2);
    ctx.lineTo(2, 80);
    ctx.lineTo(100, 2);
    ctx.closePath();
    ctx.fill();
  }

  const img = document.createElement('img');
  img.width = 104;
  img.height = 104;
  img.src = canvas.toDataURL('image/png');

  return img;
}

function getKnightRendering(knight) {
  const div = document.createElement('div');
  div.classList.add('state__knight');
  const img = getCoatOfArmsImage(knight.coastOfArms);
  const name = document.createElement('h4');
  name.classList.add('state__knight__name');
  name.textContent = knight.name;
  div.appendChild(img);
  div.appendChild(name);
  return div;
}

class Herardly {
  constructor(state) {
    this.state = state;

    this.gameEvents = new GameEvents(state);
    this.gameEvents.init();

    this._renderRecords();
    this.gameEvents.render();
  }

  nextEvent() {
    this.gameEvents.next();
  }

  render() {
    this._renderRecords();
  }

  chooseReward(cardIndex, event) {
    event.target.parentNode.childNodes.forEach(node =>
      node.classList.remove('battle-end-screen__reward--selected')
    );
    event.target.classList.add('battle-end-screen__reward--selected');
    this.state.addCard(cardIndex);
  }

  toggleBattleEndScreen() {
    const rewardsEl = document.querySelector('.battle-end-screen');
    rewardsEl.classList.toggle('battle-end-screen--show');
  }

  showRewards() {
    const rewardsEl = document.querySelector('.battle-end-screen__rewards');
    const cards = this.state.getRewards();
    let html = '';
    cards.forEach(cardIndex => {
      html += `<li onclick="chooseReward(${cardIndex}, event)">${cardPowerText[cardIndex].power}</li>`;
    });

    rewardsEl.innerHTML = html;
  }

  _renderSelectedKnight(knight, index) {
    const slot = document.querySelector(
      `.state__knights--choosen__slot:nth-child(${index})`
    );
    const rendering = getKnightRendering(knight);
    slot.appendChild(rendering);
  }

  _renderRecords() {
    const recordsEl = document.querySelector('.records');
    let html = '';
    for (let i = 0; i < 3; i++) {
      if (this.state.records[i]) {
        html += '<li class="record--win" />';
      } else if (this.state.records[i] === false) {
        html += '<li class="record--loss" />';
      } else {
        html += '<li />';
      }
    }
    console.log('HTML ', html, this.state.records);
    recordsEl.innerHTML = html;
  }
}
