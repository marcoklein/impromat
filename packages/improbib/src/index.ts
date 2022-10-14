import { experiments } from "./experiments/experiments";
import { ImprobibGenerator } from "./improbib-generator";
import { createLogger } from "./logger";

const logger = createLogger("index");

const improbib = await new ImprobibGenerator().run();

await experiments(improbib.elements);

logger.log(
  `Finished with a total of ${JSON.stringify(improbib.statistics)} elements`,
);
