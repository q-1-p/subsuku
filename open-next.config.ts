// OpenNext設定ファイル - Cloudflare Workers用に最適化
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // R2を使用した増分キャッシュ設定
  incrementalCache: r2IncrementalCache,
  
  // 必要に応じて追加の設定を行う場合はここに記述
  // 注意: バインディングなどは wrangler.toml で設定します
});

