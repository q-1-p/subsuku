/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workersでの動作に最適化
  output: 'standalone',
  
  // 画像最適化の設定
  images: {
    unoptimized: true,
    // 必要に応じて信頼できる画像ドメインを追加
    // domains: ['example.com'],
    // または
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.example.com',
    //   },
    // ],
  },
  
  // 実験的機能の有効化（必要に応じて）
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
