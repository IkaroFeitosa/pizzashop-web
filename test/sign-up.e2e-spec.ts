import { test, expect } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("Test Restaurant");
  await page.getByRole("textbox", { name: "Seu nome" }).fill("John Doe");
  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("john.doe@example.com");
  await page.getByRole("textbox", { name: "Seu celular" }).fill("123456789");
  await page.getByRole("button", { name: "Enviar cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso!");
  expect(toast).toBeVisible();
});

test("sign up with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("Test Restaurant error");
  await page.getByRole("textbox", { name: "Seu nome" }).fill("John Doe");
  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("john.doe@example.com");
  await page.getByRole("textbox", { name: "Seu celular" }).fill("123456789");
  await page.getByRole("button", { name: "Enviar cadastro" }).click();

  const toast = page.getByText("Erro ao cadastrar restaurante");
  expect(toast).toBeVisible();
});

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Fazer login" }).click();
  const url = page.url();
  expect(url).toContain("/sign-in");
});
