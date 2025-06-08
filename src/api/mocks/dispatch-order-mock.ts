import { http, HttpResponse } from "msw";
import type { IDispatchOrderParams } from "../dispatch-order";

export const dispatchOrderMock = http.patch<IDispatchOrderParams, never, never>(
  `/orders/:orderId/dispatch`,
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(null, { status: 204 });
  },
);
