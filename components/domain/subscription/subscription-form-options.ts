import { formOptions } from "@tanstack/react-form";

import { currencyId } from "@/domain/currency/currency-id";
import { intervalId } from "@/domain/interval/interval-id";

const defaultCurrency: number = currencyId.jpy;
const defaultInterval: number = intervalId.monthly;

export const subscriptionFormOptions = formOptions({
  defaultValues: {
    name: "",
    amount: "100",
    currencyId: defaultCurrency,
    intervalCycle: 1,
    intervalId: defaultInterval,
    nextUpdate: "",
  },
});
