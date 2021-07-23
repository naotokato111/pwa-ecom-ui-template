const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const ifdefOpts = {
  DEV: process.env.NODE_ENV === 'development',
  PROD: process.env.NODE_ENV === 'production',
  TEST: process.env.NODE_ENV === 'test'
}

/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports =  withBundleAnalyzer({
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'layouts', 'utils', 'hooks', 'contexts', 'state']
  },
  webpack: (config) => {
    const ifdefLoader = {
      loader: 'ifdef-loader', options: ifdefOpts
    }

    const rules = config.module.rules
    let babelRule
    rules.forEach((rule) => {
      if(rule.test && '.tsx'.match(rule.test)) {
        babelRule = rule
      }
    })

    if(Array.isArray(babelRule.use)) {
      babelRule.use.push(ifdefLoader)
    } else {
      babelRule.use = [babelRule.use, ifdefLoader]
    }

    return config
  },
})
