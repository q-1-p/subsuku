import Link from "next/link";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">さぶ空く</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {children}
        </div>
      </div>
    </header>
  );
}
