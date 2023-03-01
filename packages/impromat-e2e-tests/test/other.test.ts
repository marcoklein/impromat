import { DockerComposeEnvironment } from "testcontainers";
import { Client } from "pg";

describe("Environment", () => {
  it("should connect and return a query result", async () => {
    // given
    const composeFilePath = ".";
    const composeFile = "docker-compose.yml";
    const environment = await new DockerComposeEnvironment(
      composeFilePath,
      composeFile
    ).up();
    // when

    // TODO test

    // then
    await environment.down();
  }, 60000);
});
