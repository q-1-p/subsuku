import { match } from "arktype";
import {
  Bitcoin,
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
} from "lucide-react";

import {
  type CurrencyId,
  currencyId as id,
} from "@/domain/currency/currency-id";

export default function CurrencyIcon({
  className,
  currencyId,
}: {
  className: string;
  currencyId: CurrencyId;
}) {
  return match({
    [id.jpy]: () => <JapaneseYen className={className} />,
    [id.usd]: () => <DollarSign className={className} />,
    [id.eur]: () => <Euro className={className} />,
    [id.gbp]: () => <PoundSterling className={className} />,
    [id.cny]: () => <JapaneseYen className={className} />,
    [id.btc]: () => <Bitcoin className={className} />,
    default: "never",
  })(currencyId);
}
