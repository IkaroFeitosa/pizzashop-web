export type TOrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";
interface IOrderStatusProps {
  status: TOrderStatus;
}
const orderStatusMap: Record<TOrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};
export function OrderStatus({ status }: IOrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-gray-400" />
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      {["delivering", "processing"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
