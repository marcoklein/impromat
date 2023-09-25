import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { makeFragmentData } from "../../../graphql-client";
import { ElementFilterBar_QueryFragment } from "../../../graphql-client/graphql";
import { ElementFilterBar, ElementFilterBar_Query } from "./ElementFilterBar";

describe("ElementFilterBar", () => {
  it("renders", () => {
    // given
    const elementFilterBarFragment: ElementFilterBar_QueryFragment = {
      tags: [{ id: "first-tag-id", name: "test-tag-game" }],
    };
    const fragmentData = makeFragmentData(
      elementFilterBarFragment,
      ElementFilterBar_Query,
    );
    // when
    render(
      <ElementFilterBar
        queryFragment={fragmentData}
        loadingAvailableTags={false}
        onTagsChange={() => {}}
        selectedTagNames={[]}
      ></ElementFilterBar>,
    );
    // then
    const text = screen.getByText("test-tag-game");
    expect(text).toBeInTheDocument();
  });
});
