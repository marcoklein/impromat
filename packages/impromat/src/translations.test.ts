import { expect, test } from "@playwright/experimental-ct-react";
import { TRANSLATIONS } from "./translations";

test("translations should be consistent", async () => {
  const en = TRANSLATIONS.en;
  const de: typeof TRANSLATIONS.en = TRANSLATIONS.de;

  expect(Object.keys(en).sort()).toEqual(Object.keys(de).sort());
});
