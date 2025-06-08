import { http, HttpResponse } from "msw";
import type { IGetOrdersResponse } from "../get-orders";

type Orders = IGetOrdersResponse["orders"];
type OrderStatus = IGetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "delivered",
  "pending",
  "canceled",
  "delivering",
  "processing",
];
const orders: Orders = Array.from({ length: 60 }, (_, i) => ({
  orderId: `order-${i + 1}`,
  customerName: `Customer ${i + 1}`,
  status: statuses[i % statuses.length],
  total: Math.random() * 100 * 100,
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export const getOrdersMock = http.get<never, never, IGetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const pageIndex = Number(searchParams.get("pageIndex") || "0");
    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");

    let filteredOrders = orders;
    if (status !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }
    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.toLowerCase().includes(customerName.toLowerCase()),
      );
    }
    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.toLowerCase().includes(orderId.toLowerCase()),
      );
    }
    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    );

    return HttpResponse.json<IGetOrdersResponse>({
      orders: paginatedOrders,
      meta: {
        totalCount: filteredOrders.length,
        pageIndex,
        perPage: 10,
      },
    });
  },
);
