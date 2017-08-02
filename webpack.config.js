module.exports = {
    entry: [
        `${__dirname}/client/app.js`
    ],
    output: {
        path: `${__dirname}/client/dist`,
        filename: "index.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },    
}