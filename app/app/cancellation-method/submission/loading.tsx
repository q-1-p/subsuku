export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
      <p className="text-gray-600 text-lg">
        解約方法投稿画面を読み込んでいます...
      </p>
    </div>
  );
}
