import { DockerComposeEnvironment, GenericContainer } from "testcontainers";
import { LogWaitStrategy } from "testcontainers/dist/wait-strategy";
async function run() {
  console.log("building docker file");
  // const apicontainer = await GenericContainer.fromDockerfile(
  //   __dirname + "../../../../",
  //   "packages/infrastructure/Dockerfile-impromat-api"
  // ).build();
  // // TODO
  // const runningContainer = await apicontainer.start();
  // console.log("Running on", runningContainer.getId());
  // runningContainer.stop();
  const composeFilePath = "."; //__dirname + "../../";
  const composeFile = "docker-compose.yml";
  const environment = await new DockerComposeEnvironment(
    composeFilePath,
    composeFile
  )
    .withStartupTimeout(120)
    .up();
  console.log("setup");

  // environment.getContainer('database')
  // when

  // TODO test

  // then
  await environment.down();
}

run();
