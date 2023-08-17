class State {
  constructor() {
    this.knights = [
      {
        name: 'Geoffrey of Wycliffe',
        coastOfArms: {
          field: 5,
          chief: 1,
          fesse: 2,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 3,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Marllow of WhiteCastle',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [4, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Arthur of RedBarrow',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [2, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'John of East Marshes',
        coastOfArms: {
          field: 6,
          chief: 0,
          fesse: 1,
          base: 0,
          dexter: 2,
          pale: 3,
          sinister: 4,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'George of Sparrow Spire',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [1, 2],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      },
      {
        name: 'Tomas Gregorry',
        coastOfArms: {
          field: 6,
          chief: 1,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 2,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        }
      }
    ];

    this.selectedKnights = [
      {
        name: 'Marllow of WhiteCastle',
        coastOfArms: {
          field: 0,
          chief: 0,
          fesse: 0,
          base: 0,
          dexter: 0,
          pale: 0,
          sinister: 0,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [4, 6],
          perChevron: [],
          perPile: [],
          perCross: []
        },
        colors: [4, 6]
      },
      {
        name: 'John of East Marshes',
        coastOfArms: {
          field: 6,
          chief: 0,
          fesse: 1,
          base: 0,
          dexter: 2,
          pale: 3,
          sinister: 4,
          bend: 0,
          sinisterBend: 0,
          cross: 0,
          perPale: [],
          perFesse: [],
          perBend: [],
          perBendSinister: [],
          perChevron: [],
          perPile: [],
          perCross: []
        },
        colors: [2, 3, 4]
      }
    ];

    this.defaultDeck = [
      'ar1',
      'ar2',
      'ar3',
      'ar4',
      'ar5',
      'sa1',
      'sa2',
      'sa3',
      'sa4',
      'sa5',
      'gu1',
      'gu2',
      'gu3',
      'gu4',
      'gu5',
      'pu1',
      'pu2',
      'pu3',
      'pu4',
      'pu5'
    ];
  }

  selectKnight(knight) {
    this.selectedKnights.push(knight);
  }
}
