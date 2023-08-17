function getColorName(color) {
  const entries = Object.entries(COLORS);
  return entries.find(entry => entry[1] === color)[0];
}

function generateRandomColors(count = 1) {
  let colorEntries = Object.entries(COLORS);
  const result = [];
  do {
    const value = colorEntries[random(0, colorEntries.length - 1)][1];
    result.push(value);
    colorEntries = colorEntries.filter(entry => entry[1] !== value);
  } while (result.length < count);

  return result;
}

function generatePerCoatOfArms() {
  const coatOfArms = getCoatOfArmsTemplate();
  const colors = generateRandomColors(2);
  switch (random(0, 4)) {
    case 0:
      coatOfArms.perPale = colors;
      break;
    case 1:
      coatOfArms.perFesse = colors;
      break;
    case 2:
      coatOfArms.perBend = colors;
      break;
    case 3:
      coatOfArms.perBendSinister = colors;
      break;
  }

  return coatOfArms;
}

function generateNonPerCoatOfArms() {
  const coatOfArms = getCoatOfArmsTemplate();
  const colors = generateRandomColors(5);
  coatOfArms.field = colors[0];

  let loaded = 0.2;
  let nextColor = 1;

  if (Math.random() > loaded) {
    coatOfArms.chief = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.fesse = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.base = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.dexter = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.pale = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.sinister = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  if (Math.random() > loaded) {
    coatOfArms.bend = nextColor;
    loaded += 0.2;
    nextColor++;
  }

  return coatOfArms;
}

function generateCoatOfArms() {
  const heraldryScreen = document.querySelector('.blazon');

  const coatOfArms =
    Math.random() < 0.5 ? generatePerCoatOfArms() : generateNonPerCoatOfArms();
  heraldryScreen.textContent = generateBlazon(coatOfArms);
  drawCoatOfArms(coatOfArms);
  drawTemplates();
}

function generateBlazon(coatOfArms) {
  let blazon = '';
  if (coatOfArms.field) {
    blazon += getColorName(coatOfArms.field);

    if (coatOfArms.chief) {
      blazon += ` a chief ${getColorName(coatOfArms.chief)}`;
    }

    if (coatOfArms.fesse) {
      blazon += ` a fesse ${getColorName(coatOfArms.fesse)}`;
    }

    if (coatOfArms.base) {
      blazon += ` a base ${getColorName(coatOfArms.base)}`;
    }

    if (coatOfArms.dexter) {
      blazon += ` dexter ${getColorName(coatOfArms.dexter)}`;
    }

    if (coatOfArms.pale) {
      blazon += ` a pale ${getColorName(coatOfArms.pale)}`;
    }

    if (coatOfArms.sinister) {
      blazon += ` a pale ${getColorName(coatOfArms.sinister)}`;
    }

    if (coatOfArms.bend) {
      blazon += ` a bend ${getColorName(coatOfArms.bend)}`;
    }

    if (coatOfArms.bendSinister) {
      blazon += ` a bend sinister ${getColorName(coatOfArms.bend)}`;
    }
  } else {
    if (coatOfArms.perFesse.length) {
      blazon += `per fesse ${getColorName(
        coatOfArms.perFesse[0]
      )} ${getColorName(coatOfArms.perFesse[1])}`;
    }

    if (coatOfArms.perPale.length) {
      blazon += `per pale ${getColorName(coatOfArms.perPale[0])} ${getColorName(
        coatOfArms.perPale[1]
      )}`;
    }

    if (coatOfArms.perBend.length) {
      blazon += `per bend ${getColorName(coatOfArms.perBend[0])} ${getColorName(
        coatOfArms.perBend[1]
      )}`;
    }

    if (coatOfArms.perBendSinister.length) {
      blazon += `per bend sinister ${getColorName(
        coatOfArms.perBendSinister[0]
      )} ${getColorName(coatOfArms.perBendSinister[1])}`;
    }
  }

  return blazon;
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

function drawCoatOfArms(coatOfArms) {
  const canvas = document.querySelector('.heraldry--right canvas');
  canvas.width = 440;
  canvas.height = 440;
  const ctx = canvas.getContext('2d');

  //clip
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(420, 20);
  ctx.lineTo(420, 267.2);
  ctx.bezierCurveTo(420, 360, 230, 420, 230, 420);
  ctx.bezierCurveTo(230, 420, 20, 360, 20, 267.2);
  ctx.closePath();
  ctx.clip();

  if (coatOfArms.field) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.field)];
    ctx.fillRect(20, 20, 400, 400);

    if (coatOfArms.chief) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.chief)];
      ctx.fillRect(20, 20, 400, 133.3);
    }

    if (coatOfArms.fesse) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.fesse)];
      ctx.fillRect(20, 153.3, 400, 133.3);
    }

    if (coatOfArms.base) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.base)];
      ctx.fillRect(20, 287, 400, 133.3);
    }

    if (coatOfArms.dexter) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.dexter)];
      ctx.fillRect(20, 20, 133.3, 400);
    }

    if (coatOfArms.pale) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.pale)];
      ctx.fillRect(153.3, 20, 133.3, 400);
    }

    if (coatOfArms.sinister) {
      ctx.fillStyle = _canvasColors[getColorName(coatOfArms.sinister)];
      ctx.fillRect(287, 20, 134, 400);
    }
  }

  if (coatOfArms.perFesse.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perFesse[0])];
    ctx.fillRect(20, 20, 400, 400);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perFesse[1])];
    ctx.fillRect(20, 220, 400, 200);
  }

  if (coatOfArms.perPale.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perPale[0])];
    ctx.fillRect(20, 20, 400, 400);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perPale[1])];
    ctx.fillRect(220, 20, 200, 400);
  }

  if (coatOfArms.perBend.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBend[1])];
    ctx.fillRect(20, 20, 400, 400);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBend[0])];
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(420, 320);
    ctx.lineTo(420, 20);
    ctx.closePath();
    ctx.fill();
  }

  if (coatOfArms.perBendSinister.length) {
    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBendSinister[1])];
    ctx.fillRect(20, 20, 400, 400);

    ctx.fillStyle = _canvasColors[getColorName(coatOfArms.perBendSinister[0])];
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 320);
    ctx.lineTo(420, 20);
    ctx.closePath();
    ctx.fill();
  }
}

function drawTemplates() {
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

  ctx.fillRect(0, 0, 100, 33);
  let img = document.querySelector('li:nth-child(1) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 100, 33);

  ctx.fillRect(0, 33, 100, 33);
  img = document.querySelector('li:nth-child(2) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 33, 100, 33);

  ctx.fillRect(0, 0, 33, 100);
  img = document.querySelector('li:nth-child(3) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 33, 100);

  ctx.fillRect(33, 0, 33, 100);
  img = document.querySelector('li:nth-child(4) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(33, 0, 33, 100);

  ctx.fillRect(67, 0, 33, 100);
  img = document.querySelector('li:nth-child(5) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(67, 0, 33, 100);

  ctx.fillRect(0, 0, 100, 50);
  img = document.querySelector('li:nth-child(6) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 100, 50);

  ctx.fillRect(0, 0, 50, 100);
  img = document.querySelector('li:nth-child(7) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 50, 100);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 80);
  ctx.lineTo(100, 0);
  ctx.closePath();
  ctx.fill();
  img = document.querySelector('li:nth-child(7) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 100, 100);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 80);
  ctx.lineTo(104, 0);
  ctx.closePath();
  ctx.fill();
  img = document.querySelector('li:nth-child(8) img');
  img.src = canvas.toDataURL('image/png');
  ctx.clearRect(0, 0, 100, 100);
}

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
  }

  selectKnight(knight) {
    this.state.selectKnight(knight);

    this._renderSelectedKnight(knight, this.state.selectedKnights.length);
  }

  showState() {
    const stateKnightsEl = document.querySelector('.state__knights');

    this.state.knights.forEach(knight => {
      const rendering = getKnightRendering(knight);
      stateKnightsEl.appendChild(rendering);
      rendering.addEventListener('click', () => selectKnight(knight));
    });
  }

  _renderSelectedKnight(knight, index) {
    const slot = document.querySelector(
      `.state__knights--choosen__slot:nth-child(${index})`
    );
    const rendering = getKnightRendering(knight);
    slot.appendChild(rendering);
  }
}
