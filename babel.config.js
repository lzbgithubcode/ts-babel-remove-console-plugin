const presets = [
    [
        '@babel/preset-env',
        {
            targets: {
                node: '6.9',
            },
        },
    ],
    "@babel/typescript"
];
// const plugins = ['@babel/proposal-class-properties'];

// plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);

module.exports = {
    presets,
    // plugins,
};
