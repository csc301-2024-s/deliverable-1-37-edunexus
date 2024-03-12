module.exports = {
    entry: './src/main.js',

    module: {
        rules: require('./webpack.rules'),
    },

    devtool: 'eval-source-map',

    devServer: {
        client: {
            overlay: false,
        },
    }
};