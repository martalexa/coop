// webpack.config.js

var MD5HashPlugin = require('md5-hash-webpack-plugin');

module.exports = {
    // ...
    output: {
        //...
        chunkFilename: "[chunkhash].[id].chunk.js"
    },
    plugins: [
        new MD5HashPlugin()
    ]
};
 
