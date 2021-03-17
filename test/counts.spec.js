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

describe('getHsl', () => {
    it('average', () => {
        getHsls(fileName).then(hsls => {
            console.log(hsls);
            // expect( entries.length, 'Total colors').to.equal(11541);
        });
    });
})
