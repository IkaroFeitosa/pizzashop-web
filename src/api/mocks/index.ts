import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "./sign-in-mock";

export const worker = setupWorker(signInMock);

export async function enableMSSW() {
  if (env.MODE !== "test") return;
  await worker.start();
}

export async function disableMSSW() {
  await worker.stop();
}
