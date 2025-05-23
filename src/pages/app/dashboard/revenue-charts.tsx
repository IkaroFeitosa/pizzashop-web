import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-ranger-picker";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";

import colors from "tailwindcss/colors";

export function RevenueCharts() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data: dailyRevenueInPeriods } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-periods", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    return dailyRevenueInPeriods?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      };
    });
  }, [dailyRevenueInPeriods]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-8 sm:flex-col lg:flex-row">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <label>Período</label>
          <DatePickerWithRange date={dateRange} onDateRange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis
                dataKey={"date"}
                stroke="#888"
                tickLine={false}
                axisLine={false}
                dy={16}
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={88}
                tickFormatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type={"linear"}
                dataKey="receipt"
                strokeWidth={2}
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
