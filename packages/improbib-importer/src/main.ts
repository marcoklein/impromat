import { program } from "commander";

import { diffImprobib } from "./diff-improbib";
import { writeImprobib } from "./write-improbib";

program.name("improbib-importer");

program
  .command("diff")
  .description(
    "Show difference of current Impromat database and available improbib."
  )
  .requiredOption("--endpoint", "Endpoint", "http://localhost:8080")
  .requiredOption("--access-token", "Access token for authentication.")
  .option("--user-name", "Name of user", "improbib")
  .action(
    (options: { endpoint: string; userName: string; accessToken: string }) => {
      console.log(options);
      diffImprobib(options);
    }
  );

program
  .command("write")
  .description("Write changes from Improbib into Impromat")
  .option("--endpoint <endpoint>", "Endpoint", "http://localhost:8080")
  .option("--access-token <token>", "Access token for authentication.")
  .option("--user-name <user-name>", "Name of user", "improbib")
  .option("--dry-run", "Run without sending mutation commands.")
  .action(
    (options: {
      endpoint: string;
      userName: string;
      accessToken: string;
      dryRun: boolean;
    }) => {
      console.log(options);
      writeImprobib(options);
    }
  );

program.parse();
