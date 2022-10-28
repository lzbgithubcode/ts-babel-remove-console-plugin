const presets = [
    [
        '@babel/preset-env',
        {
            "targets": {
                "node": "current"
            }
        }
    ],
    "@babel/typescript"
];
module.exports = {
    presets,
};
