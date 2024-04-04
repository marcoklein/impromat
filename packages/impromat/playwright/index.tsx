import "../src/theme/colors.css";
import "../src/theme/variables.css";

import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import React from "react";
import { PageScaffold } from "../src/components/PageScaffold";
import { TestHooksConfig } from "../src/test-hooks-config";

beforeMount<TestHooksConfig>(async ({ App: TestApp, hooksConfig }) => {
  if (hooksConfig?.noPageElement) {
    return <TestApp></TestApp>;
  }

  return (
    <PageScaffold title="Test">
      <TestApp></TestApp>
    </PageScaffold>
  );
});
