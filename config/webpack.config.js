module.exports = {
    module: {
        rules: [
            { test: /\.ts$/, use: ['ts-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader?url=false&minimize=true', 'sass-loader'] },
            { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader?url=false&minimize=true', 'sass-loader'] },
        ]
    }
}