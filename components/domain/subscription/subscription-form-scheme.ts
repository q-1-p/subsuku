import { type } from "arktype";

export const subscriptionFormScheme = type({
  name: "string > 0",
  amount: "string >= 0",
  currencyId: "number.integer",
  intervalCycle: "number.integer > 0",
  intervalId: "number.integer",
  nextUpdate: "string > 8",
});
