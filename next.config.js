// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  experimental: {
    swcMinifyDebugOptions: {
      compress: {
        defaults: true,
        side_effects: false,
      },
    },
  },
  swcMinify: true,
}
