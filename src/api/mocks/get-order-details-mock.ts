import { http, HttpResponse } from "msw";
import type {
  IGetOrderDetailsResponse,
  IGetOrderDetailsParams,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  IGetOrderDetailsParams,
  never,
  IGetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      phone: "1234567890",
      email: "johndoe@gmail.com",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 1,
        priceInCents: 1500,
        quantity: 2,
        product: {
          name: "Pizza Margherita",
        },
      },
      {
        id: 2,
        priceInCents: 1200,
        quantity: 1,
        product: {
          name: "Caesar Salad",
        },
      },
    ],
    totalInCents: 4200,
  });
});
