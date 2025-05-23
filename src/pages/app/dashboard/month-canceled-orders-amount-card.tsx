import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmunt } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });
  return (
    <Card className="gap-4">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmunt ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {" "}
              {monthCanceledOrdersAmunt.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmunt.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  -{monthCanceledOrdersAmunt.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  +{monthCanceledOrdersAmunt.diffFromLastMonth}%
                </span>
              )}{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
