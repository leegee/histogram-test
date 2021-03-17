// Data structure
// {
//     red: new Array(256), // Count of the number of times a value appears in the red channel
//     green: new Array(256), // Count of the number of times a value appears in the green channel
//     blue: new Array(256), // Count of the number of times a value appears in the blue channel
//     alpha: new Array(256), // Count of the number of times a value appears in the alpha channel

//     colors: {
//         rgb: 0, // Number of unique RGB colors
//         rgba: 0 // Number of unique RGBA colors
//     },

//     palettes: {
//         rgb: [], // Array of unique colors in hex notation
//         rgba: [] // Array of unique colors in hexa notation
//     },

//     greyscale: true, // Indicates whether all colors are greyscale or not
//     alphachannel: false // Indicates that one or more pixels are translucent
// }


const expect = require('chai').expect;
const getHsls = require('../src/getHsls');

const fileName = './test/so-safe.jpg';

describe('getHsl', async () => {
    it('average', async () => {
        const hsl = await getHsls(fileName);
        console.log(hsl);
        expect(hsl.length, 'HSL').to.equal(3);
        expect(hsl).to.deep.equal(
            [0.05882352941176471, 0.2537313432835821, 0.2627450980392157]
        );
    });
})
