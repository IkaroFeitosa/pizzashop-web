import { http, HttpResponse } from "msw";
import type { IGetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodtMock = http.get<
  never,
  never,
  IGetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    {
      date: "2023-10-01",
      receipt: 1000,
    },
    {
      date: "2023-10-02",
      receipt: 1200,
    },
    {
      date: "2023-10-03",
      receipt: 900,
    },
    {
      date: "2023-10-04",
      receipt: 1100,
    },
    {
      date: "2023-10-05",
      receipt: 1300,
    },
  ]);
});
