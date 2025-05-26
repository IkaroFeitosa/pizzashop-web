import { env } from "@/env";
import { setupWorker } from "msw/browser";

export const worker = setupWorker();

export async function enableMSSW() {
  if (env.MODE !== "test") return;
  await worker.start();
}

export async function disableMSSW() {
  await worker.stop();
}
