import { api } from "@/lib/axios";
export interface IGetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}
export interface IGetOrdersQuery {
  pageIndex?: number | null;
}
export async function getOrders({ pageIndex }: IGetOrdersQuery) {
  const response = await api.get<IGetOrdersResponse>("/orders", {
    params: {
      pageIndex,
    },
  });
  return response.data;
}
