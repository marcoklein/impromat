export type TransformerFunction<
  Input,
  Output extends Input,
  Parameters = undefined,
> = (element: Input, parameters?: Parameters) => Promise<Output> | Output;

export class TransformerChain<
  RunInput,
  Input extends RunInput,
  Output extends Input,
> {
  private transformerFn?: (element: Input) => any;
  private next?: TransformerChain<any, any, any>;
  private root?: TransformerChain<any, any, any>;

  private constructor() {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  static create<BaseInput extends object>() {
    return new TransformerChain<BaseInput, BaseInput, BaseInput>();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  apply<TransformedOutput extends object | void>(
    fn: (element: Output) => Promise<TransformedOutput> | TransformedOutput,
  ): TransformerChain<
    RunInput,
    Output,
    TransformedOutput extends void ? Output : Output & TransformedOutput
  > {
    const nextFunction = new TransformerChain<
      RunInput,
      Output,
      TransformedOutput extends void ? Output : Output & TransformedOutput
    >();
    nextFunction.root = this.root ?? this;
    nextFunction.transformerFn = fn;
    this.next = nextFunction;
    return nextFunction;
  }

  async transformList(inputList: RunInput[]): Promise<Output[]> {
    return Promise.all(inputList.map(async (listItem) => this.run(listItem)));
  }

  async run(input: RunInput): Promise<Output> {
    if (!this.root) return input as Output;
    let curFunctionChain = this.root.next;
    if (!curFunctionChain || !curFunctionChain.transformerFn)
      return input as Output;
    let curInput = input;
    do {
      curInput = {
        ...curInput,
        // eslint-disable no-await-in-loop order is import for transformer functions
        ...(await curFunctionChain.transformerFn(curInput)),
      };
      curFunctionChain = curFunctionChain.next;
    } while (curFunctionChain && curFunctionChain.transformerFn);

    return curInput as Output;
  }
}
