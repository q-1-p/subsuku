import { currency } from "@/domain/currency/currency";
import { intervalUnit } from "@/domain/interval";
import { formOptions } from "@tanstack/react-form";

const defaultCurrency: number = currency.jpy;
const defaultInterval: number = intervalUnit.monthly;

export const subscriptionFormOptions = formOptions({
  defaultValues: {
    name: "",
    price: "100",
    currency: defaultCurrency,
    intervalCycle: 1,
    intervalUnit: defaultInterval,
    nextUpdate: "",
  },
});
