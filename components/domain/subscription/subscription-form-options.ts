import { formOptions } from "@tanstack/react-form";

export const subscriptionFormOptions = formOptions({
  defaultValues: {
    name: "",
    price: "100",
    currency: 0,
    intervalCycle: 1,
    intervalUnit: 0,
    nextUpdate: "",
  },
});
