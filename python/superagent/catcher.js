
const catchData = require('./lib/fun/catchData');
const markdown = require('./lib/fun/markdown');

catchData(result => {
    markdown(result);
});
