import test from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Test Restaurant" }).click();

  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();
  await page.getByRole("textbox", { name: "Nome" }).fill("Test Restaurant 2");
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill("Another Description");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  await page.getByText("Perfil atualizado com sucesso!").isVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Test Restaurant 2" }).isVisible();

  await page.waitForTimeout(1000);
});
