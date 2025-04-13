const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @description - Webpack configuration function.
 * @param {object} env - Environment variables passed to the webpack config.
 * @param {object} argv - Command line arguments passed to the webpack config.
 * @returns {object} - Webpack configuration object.
 */
module.exports = (env, argv) => ({
    stats: "minimal", // Keep console output easy to read.
    entry: "./src/EntryPoint.ts", // Your program entry point

    // Build destination
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "game-minified.js" // Single output file
    },

    // Development server configuration
    devServer: {
        compress: true,
        allowedHosts: "all", // Allow all hosts. Useful for production server settings.
        static: false,
        client: {
            logging: "warn",
            overlay: { errors: true, warnings: false },
            progress: true
        },
        port: 8080,
        host: "0.0.0.0" // Listen on all network interfaces.
    },

    // Disable performance hints for large web games.
    performance: { hints: false },

    // Enable sourcemaps during development
    devtool: argv.mode === "development" ? "eval-source-map" : undefined,

    // Minimize code for production builds
    optimization: {
        minimize: argv.mode === "production",
        splitChunks: false,  // Disable code splitting
        runtimeChunk: false,  // Prevent runtime code from being split out
        minimizer: [new TerserPlugin({
            terserOptions: {
                ecma: 6,
                compress: { drop_console: true },
                output: { comments: false, beautify: false }
            }
        })]
    },

    // TypeScript configuration
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    plugins: [
        // Copy static assets to the final build directory
        new CopyPlugin({
            patterns: [
                { from: "./assets/", to: "assets/" },
                { from: "./css/", to: "css/" }
            ]
        }),

        // Generate an index.html file for the game
        new HtmlWebpackPlugin({
            template: "src/index.html",
            hash: true,
            inject: "body", // Ensure scripts are injected properly
            minify: false
        })
    ]
});
