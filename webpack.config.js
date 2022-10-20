const path = require('path')

module.exports = {
    mode: 'production',
    entry: "./src/content.js",
    output: {
        path: path.resolve(__dirname, 'view'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    },
}