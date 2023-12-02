import { expect, test } from "@playwright/experimental-ct-react";
import { TRANSLATIONS } from "./translations";

test("translations should have consistent key order", async () => {
  const enKeys = Object.keys(TRANSLATIONS.en);
  const deKeys = Object.keys(TRANSLATIONS.de);

  expect(enKeys).toStrictEqual(deKeys);

  for (const key of enKeys) {
    expect(Object.keys((TRANSLATIONS.en as any)[key])).toStrictEqual(
      Object.keys((TRANSLATIONS.de as any)[key]),
    );
  }
});
