const nrwlConfig = require('@nrwl/react/plugins/webpack.js')

module.exports = (config) => {
  nrwlConfig(config)
  return {
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.css$|\.scss$|\.sass$|\.less$|\.styl$/,
          use: [
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
  }
}
