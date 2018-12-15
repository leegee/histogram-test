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

const fileName = '../../Pictures/illy-card.jpg';

describe('getHsl', () => {
    it('counts', () => {
        getHsls(fileName).then( hsls => {
            const sorted = hsls.sort( (a, b) => a.count > b.count ? 1 : -1 );
            const entries = Object.keys(sorted);
            expect( entries.length, 'Total colors').to.equal(11541);
            console.log( 'Range start', sorted[entries[0]] );
            console.log( 'Range end', sorted[entries[entries.length - 1]] );
        });
    });

    it('avg', () => {
        getHsls(fileName).then( hsls => {
            let totalColours = hsls.reduce( (prev, current) => {
                return  {count: prev.count +  current.count};
            }).count;
            expect(totalColours).to.equal(921600);
            let avgCount = parseInt( totalColours / hsls.length );
            console.log( 'avgCount', avgCount );
            // Find hsls entry where count is closest to avgCount.
            let closestHsl;
            let errorDistance = null;
            hsls.every(hsl => {
              if (hsl.count === avgCount) {
                console.log('Bingo! Bang on at ', hsl);
                closestHsl = hsl;
                errorDistance = 0;
                return false;
              }
              const distance = Math.abs(avgCount - hsl.count);
              if (errorDistance === null ||  distance < errorDistance) {
                errorDistance = distance;
                closestHsl = hsl;
                console.log('errorDistance %d', errorDistance, closestHsl);
              }
              return true;
            });
            console.log('avg clr at %d distnace: ', errorDistance, closestHsl);
        });
    });
})
