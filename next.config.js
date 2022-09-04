/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    RIOT_API: process.env.RIOT_API
  },
  images: {
    domains: ["ddragon.leagueoflegends.com"]
  }
}

module.exports = nextConfig
