import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AggregationCard = ({
  title,
  totalResult,
  description,
  children,
}: {
  title: string;
  totalResult: number | string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{totalResult}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
};
