import { http, HttpResponse } from "msw";
import type { IGetDayOrdersAmountResponse } from "../get-day-orders-amounts";

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  IGetDayOrdersAmountResponse
>("/metrics/day-orders-amount", () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  });
});
