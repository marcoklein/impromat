import { ImprobibGenerator } from "../src/improbib-generator";

export const mochaHooks = {
  async beforeAll(this: Mocha) {
    this.timeout(60_000 * 30);
    console.log("Test Root Hook: Running pipeline");
    const startTime = Date.now();
    await new ImprobibGenerator().run();
    console.log(
      `Test Root Hook: Pipeline run finished in ${Math.round(
        (Date.now() - startTime) / 1000,
      )} seconds`,
    );
  },
};
