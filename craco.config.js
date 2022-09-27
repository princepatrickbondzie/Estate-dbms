const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': 'rgb(34 197 94)',
                            // '@link-color': '#1890ff',
                            '@text-color': 'rgba(0, 0, 0, 0.65)',
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};