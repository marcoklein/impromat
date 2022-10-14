import { expect } from "chai";
import { TransformerChain } from "./transformer-chain";

describe("TransformerChain", () => {
  it("should run a function chain", async () => {
    // Given
    let firstFn = 0;
    let secondFn = 0;
    const chain = TransformerChain.create<{ test: number }>()
      .apply(() => {
        console.log("first fn");
        firstFn++;
      })
      .apply(() => {
        console.log("second fn");
        secondFn++;
      });
    // When
    const result = await chain.run({ test: 1 });
    // Then
    expect(firstFn).to.equal(1);
    expect(secondFn).to.equal(1);
    expect(result.test).to.equal(1);
  });

  it("should manipulate state", async () => {
    // Given
    const input = {
      test: 1,
    };

    const chain = TransformerChain.create<typeof input>()
      .apply((input) => {
        return {
          test: input.test + 1,
          text: "hi",
        };
      })
      .apply(async (input) => {
        return {
          ...input,
          another: input.text,
        };
      });
    // When
    const output = await chain.run(input);
    // Then
    expect(output).to.deep.equal({ test: 2, text: "hi", another: "hi" });
    expect(output.another).to.equal("hi"); // Explicit test for typing
  });

  it("should allow for functions that only specify partial input", async () => {
    // Given
    const input = {
      first: 1,
      second: 2,
    };

    function firstFn(input: { second: number }) {
      return {
        third: input.second + 1,
      };
    }

    const chain = TransformerChain.create<typeof input>().apply(firstFn);
    // When
    const output = await chain.run(input);
    // Then
    expect(output.first).to.equal(1);
    expect(output.second).to.equal(2);
    expect(output.third).to.equal(3);
  });

  it("should manipulate an array entry", async () => {
    // Given
    const input = {
      first: 1,
      array: ["test"],
    };

    function changeArray(input: { array: string[] }) {
      return {
        array: [...input.array, "secondtest"],
      };
    }

    const chain = TransformerChain.create<typeof input>().apply(changeArray);
    // When
    const output = await chain.run(input);
    // Then
    expect(output.first).to.equal(1);
    expect(output.array).to.deep.equal(["test", "secondtest"]);
  });

  it("should allow void functions", async () => {
    // Given
    const chain = TransformerChain.create<Record<string, unknown>>()
      .apply(() => {
        return {
          test: 1,
        };
      })
      .apply(() => {
        console.log("do nothing");
      });
    // When
    const output = await chain.run({});
    // Then
    expect(output).to.deep.equal({ test: 1 });
  });
});
