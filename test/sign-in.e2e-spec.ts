import { test, expect } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.fill('input[name="email"]', "ikarosfeitosa@gmail.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação para seu e-mail",
  );
  await expect(toast).toBeVisible();
});

test("sign in with invalid email", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.fill('input[name="email"]', "teste@test.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();
  const toast = page.getByText("Erro ao logar");
  await expect(toast).toBeVisible();
});

test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Novo estabelecimento" }).click();
  const url = page.url();
  expect(url).toContain("/sign-up");
});
