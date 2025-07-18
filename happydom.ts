import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

// テスト環境でのみ利用される `server-only` モジュールを空実装でモック
// Next.js の `import "server-only"` は実行時に副作用を持たないため、
// ここでは空のオブジェクトを返して解決エラーを回避します。
import { mock } from "bun:test";

mock.module("server-only", () => ({}));
