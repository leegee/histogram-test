const conversions = require('./color-conversions');
const canvasPrebuilt = require('canvas-prebuilt');
const Canvas = canvasPrebuilt.Canvas;
const Image = canvasPrebuilt.Image;

const getCanvasImageData = async function (imageBuffer) {
  return new Promise( (resolve, reject) => {
    const canvasImage = new Image();
    canvasImage.crossOrigin = 'Anonymous';

    canvasImage.onerror = function () {
      return reject( new Error('error reading from input stream') );
    };

    canvasImage.onload = function () {
      const ctx = new Canvas(canvasImage.width, canvasImage.height).getContext('2d');
      ctx.drawImage(canvasImage, 0, 0);
      resolve(
        ctx.getImageData(0, 0, canvasImage.width, canvasImage.height).data
      );
    };

    canvasImage.src = imageBuffer;
  });
};

module.exports = async function (imageBuffer) {
  if (['string', 'object'].indexOf(typeof imageBuffer) === -1) {
      throw new TypeError('Expected imageBuffer to be a string or a buffer');
  }

  const data = await getCanvasImageData(imageBuffer);
  
  const hsls = {};

  for (let i = 0; i < data.length; i += 4) {
    const red   = data[i];
    const green = data[i + 1];
    const blue  = data[i + 2];
    const alpha = data[i + 3];

    const hsl = conversions.rgbToHsl(red, green, blue);
    const key = hsl.join(',');

    if (hsls.hasOwnProperty(key)) {
      hsls[key].count ++
    } else {
      hsls[key] = {
        count: 1,
        hsl
      };
    }
  }

  return Object.values(hsls);
};
