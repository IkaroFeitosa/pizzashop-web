import { api } from "@/lib/axios";
export type IGetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];
interface IGetDailyRevenuePeriodParams {
  from?: Date;
  to?: Date;
}
export async function getDailyRevenueInPeriod({
  from,
  to,
}: IGetDailyRevenuePeriodParams) {
  const response = await api.get<IGetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    },
  );
  return response.data;
}
