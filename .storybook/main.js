const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  webpackFinal: async config => {
    /* webpack configuration to resolve module aliases defined in tsconfig file */
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ],
      /* webpack configuration to apply tailwind to postcss-loader */
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      })
    return config
  },
}
