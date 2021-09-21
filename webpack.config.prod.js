const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        popup: './src/popup.js',
        noted: './src/noted.js',
    },
    // where does the bundling out go?
    output: {
        filename: '[name].js',
        // this creates a new path with ./assets/scripts
        path: path.resolve(__dirname, 'assets', 'scripts'),
        // explains where to find the bundles needed 
        // q: tells who?
        publicPath: './assets/scripts/'
    },
    devtool: 'cheap-module-source-map',
    // allows appliications on generated output
}