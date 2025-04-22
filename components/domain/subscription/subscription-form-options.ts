import { currencyId } from "@/domain/currency/currency-id";
import { intervalId } from "@/domain/interval/interval-id";
import { formOptions } from "@tanstack/react-form";

const defaultCurrency: number = currencyId.jpy;
const defaultInterval: number = intervalId.monthly;

export const subscriptionFormOptions = formOptions({
  defaultValues: {
    name: "",
    price: "100",
    currency: defaultCurrency,
    intervalCycle: 1,
    intervalId: defaultInterval,
    nextUpdate: "",
  },
});
