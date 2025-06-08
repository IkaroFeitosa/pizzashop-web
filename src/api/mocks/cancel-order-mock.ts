import { http, HttpResponse } from "msw";
import type { ICancelOrderParams } from "../cancel-orders";

export const cancelOrderMock = http.patch<ICancelOrderParams, never, never>(
  `/orders/:orderId/cancel`,
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(null, { status: 204 });
  },
);
