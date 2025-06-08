import { http, HttpResponse } from "msw";
import type { IGetMonthOrdersAmountResponse } from "../get-month-orders-amunts";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  });
});
