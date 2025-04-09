export default function FunctionCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-2xl border bg-white/80 p-6 shadow-sm transition-colors duration-200 hover:bg-white">
      <div className="rounded-full bg-primary/20 p-3 text-primary">{icon}</div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-center text-gray-500 text-sm dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
