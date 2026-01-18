/** @type {import('next').NextConfig} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default config;
