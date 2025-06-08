import { http, HttpResponse } from "msw";
import type { IDeliverOrderParams } from "../deliver-order";

export const deliverOrderMock = http.patch<IDeliverOrderParams, never, never>(
  `/orders/:orderId/deliver`,
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(null, { status: 204 });
  },
);
