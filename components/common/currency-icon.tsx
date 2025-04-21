import { match } from "arktype";
import {
  Bitcoin,
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
} from "lucide-react";

import { currency } from "@/domain/currency/currency";

export default function CurrencyIcon({
  className,
  currencyId,
}: {
  className: string;
  currencyId: number;
}) {
  return match({
    [currency.jpy]: () => <JapaneseYen className={className} />,
    [currency.usd]: () => <DollarSign className={className} />,
    [currency.eur]: () => <Euro className={className} />,
    [currency.gbp]: () => <PoundSterling className={className} />,
    [currency.cny]: () => <JapaneseYen className={className} />,
    [currency.btc]: () => <Bitcoin className={className} />,
    default: "never",
  })(currencyId);
}
