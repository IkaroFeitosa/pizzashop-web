import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "./sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount";
import { getMonthRevenueMock } from "./get-month-revenue";
import { getDailyRevenueInPeriodtMock } from "./get-daily-revenue-in-period";
import { getPopularProductstMock } from "./get-popular-products";

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodtMock,
  getPopularProductstMock,
);

export async function enableMSSW() {
  console.log("Enabling MSW...", env.MODE);
  if (env.MODE !== "test") return;
  await worker.start();
}

export async function disableMSSW() {
  await worker.stop();
}
