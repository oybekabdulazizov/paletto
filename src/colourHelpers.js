import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colours: {},
  };

  for (const level of levels) {
    newPalette.colours[level] = [];
  }

  for (const colour of starterPalette.colours) {
    let scale = generateScale(colour.colour, 10).reverse();
    for (const i in scale) {
      newPalette.colours[levels[i]].push({
        name: `${colour.name} ${levels[i]}`,
        id: colour.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
      });
    }
  }

  return newPalette;
}

function getRange(hexColour) {
  const end = 'fff';
  return [chroma(hexColour).darken(1.4).hex(), hexColour, end];
}

function generateScale(hexColour, numOfColours) {
  return chroma.scale(getRange(hexColour)).mode('lab').colors(numOfColours);
}
