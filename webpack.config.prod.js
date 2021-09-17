const path = require('path');

module.exports = {
    mode: "production",
    // entrypoint for webpack to start
    // to analyze what gets bundled
    entry: './src/popup.js',
    // where does the bundling out go?
    output: {
        // [contenthash] is a keyword that tells webpack
        // that a hash needs to be generated here
        // the win here is that everytime a new build happens
        // browsers do not cache the file (bc name changes)
        filename: '[contenthash].js',
        // this creates a new path with ./assets/scripts
        path: path.resolve(__dirname, 'assets', 'scripts'),
        // explains where to find the bundles needed 
        // q: tells who?
        publicPath: './assets/scripts/'
    },
    // to support debugging, enabling source maps allows dev
    // readability of code w breakpoints in browser
    devtool: 'cheap-source-map',
}