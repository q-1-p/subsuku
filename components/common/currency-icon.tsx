import { match } from "arktype";
import {
  Bitcoin,
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
} from "lucide-react";

import type { CurrencyId } from "@/domain/type";
import { currencyId as currencyIdType } from "@/domain/type";

export default function CurrencyIcon({
  className,
  currencyId,
}: {
  className: string;
  currencyId: CurrencyId;
}) {
  return match({
    [currencyIdType.jpy]: () => <JapaneseYen className={className} />,
    [currencyIdType.usd]: () => <DollarSign className={className} />,
    [currencyIdType.eur]: () => <Euro className={className} />,
    [currencyIdType.gbp]: () => <PoundSterling className={className} />,
    [currencyIdType.cny]: () => <JapaneseYen className={className} />,
    [currencyIdType.btc]: () => <Bitcoin className={className} />,
    default: "never",
  })(currencyId);
}
