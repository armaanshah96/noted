const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    // entrypoint for webpack to start
    // to analyze what gets bundled
    entry: {
        popup: './src/popup.js',
        content: './src/content.js',
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
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
}