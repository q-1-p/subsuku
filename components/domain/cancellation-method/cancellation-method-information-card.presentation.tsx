import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export default function CancellationMethodInformationCardPresentation({
  cancellationMethod,
}: {
  cancellationMethod: ICancellationMethod;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>解約方法</CardTitle>
        <CardDescription>
          {cancellationMethod.subscriptionName}を解約する手順
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="my-4 list-decimal space-y-3 pl-5">
          {cancellationMethod.steps?.map((step, index) => (
            <li
              key={index.toString()}
              className="rounded-xl bg-secondary/30 p-3 text-base"
            >
              {step}
            </li>
          ))}
        </ol>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="notes" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">注意事項</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="p-2 text-muted-foreground text-sm">
                {cancellationMethod.precautions}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="notes" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">その他</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="p-2 text-muted-foreground text-sm">
                {cancellationMethod.freeText}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p className="text-center text-muted-foreground text-xs">
          解約手順は変更される場合があります。最新情報は公式サイトでご確認ください。
        </p>
      </CardFooter>
    </Card>
  );
}
