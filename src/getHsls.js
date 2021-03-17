const conversions = require('./color-conversions');
const { createCanvas, loadImage } = require('canvas');

const canvas = createCanvas(1000, 1000);

async function getCanvasImageData(filepath) {
  const img = await loadImage(filepath);
  const ctx = createCanvas(img.width, img.height).getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height).data;
}

module.exports = async function (filepath) {
  if (['string', 'object'].indexOf(typeof filepath) === -1) {
    throw new TypeError('Expected imageBuffer to be a string or a buffer');
  }

  const data = await getCanvasImageData(filepath);

  let red = 0, green = 0, blue = 0, alpha = 0;

  for (let i = 0; i < data.length; i += 4) {
    red += data[i];
    green += data[i + 1];
    blue += data[i + 2];
    alpha += data[i + 3];
  }

  const pixelCount = data.length / 4;
  red = Math.floor(red / pixelCount);
  green = Math.floor(green / pixelCount);
  blue = Math.floor(blue / pixelCount);
  alpha = Math.floor(alpha / pixelCount);

  const hsl = conversions.rgbToHsl(red, green, blue);
  return hsl;
};
