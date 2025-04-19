import { type } from "arktype";

export const subscriptionFormScheme = type({
  name: "string > 0",
  price: "string >= 0",
  currency: "number.integer",
  intervalCycle: "number.integer > 0",
  intervalUnit: "number.integer",
  nextUpdate: "string > 8",
});
