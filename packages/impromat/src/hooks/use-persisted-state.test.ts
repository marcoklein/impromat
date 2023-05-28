import { describe, expect, test } from "vitest";
import { usePersistedState } from "./use-persisted-state";
import { renderHook } from "@testing-library/react-hooks";

describe("usePersistedState", () => {
  test("should return default value", async () => {
    // given
    const hook = renderHook(() =>
      usePersistedState<{ hello: string }>("test-key", {
        hello: "world",
      }),
    );
    // when
    const [state] = hook.result.current;
    // then
    expect(state.hello).toBe("world");
  });

  test("should return local storage value", async () => {
    // given
    localStorage.setItem(
      "test-key",
      JSON.stringify({ hello: "local-storage" }),
    );
    const hook = renderHook(() =>
      usePersistedState<{ hello: string }>("test-key", {
        hello: "world",
      }),
    );
    // when
    const [state] = hook.result.current;
    // then
    expect(state.hello).toBe("local-storage");
  });

  test("should return default value if local storage value is corrupted", async () => {
    // given
    localStorage.setItem(
      "test-key",
      JSON.stringify({ hello: "local-storage", invalid: true }),
    );
    const hook = renderHook(() =>
      usePersistedState<{ hello: string }>("test-key", {
        hello: "world",
      }),
    );
    // when
    const [state] = hook.result.current;
    // then
    expect(state.hello).toBe("world");
  });
});
