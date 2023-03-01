import { GenericContainer, PostgreSqlContainer } from "testcontainers";
import { Client } from "pg";

describe.skip("PostgreSql", () => {
  it("should start impromat api", async () => {
    const apicontainer = await GenericContainer.fromDockerfile(
      __dirname + "../../../../",
      "packages/infrastructure/Dockerfile-impromat-api"
    ).build();
    // TODO
    const runningContainer = await apicontainer.start();
    console.log("Running on", runningContainer.getId());
    runningContainer.stop();
    // fetch({ method: "POST", url: runningContainer.getIp() + runningContainer.getP });
  }, 60000);

  it("should connect and return a query result", async () => {
    const container = await new PostgreSqlContainer().start();

    const client = new Client({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });
    await client.connect();

    const result = await client.query("SELECT 1");
    expect(result.rows[0]).toEqual({ "?column?": 1 });

    await client.end();
    await container.stop();
  }, 20000);
});
