import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { makeFragmentData } from "../../../graphql-client";
import { ElementFilterBar_QueryFragment } from "../../../graphql-client/graphql";
import { ElementFilterBar, ElementFilterBar_Query } from "./ElementFilterBar";

describe("ElementFilterBar", () => {
  it("renders", () => {
    // given
    const elementFilterBarFragment: ElementFilterBar_QueryFragment = {
      tags: [],
    };
    const fragmentData = makeFragmentData(
      elementFilterBarFragment,
      ElementFilterBar_Query,
    );
    // when
    render(<ElementFilterBar queryFragment={fragmentData}></ElementFilterBar>);
    // then
    const text = screen.getByText("Filter");
    expect(text).toBeInTheDocument();
  });
});
