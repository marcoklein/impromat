import { createExpressApp } from "./create-server";
import { environment } from "./environment";

const port = environment.PORT;

const app = await createExpressApp();
app.listen(port, "0.0.0.0", () => {
  console.log(`Running server at http://localhost:${port}/graphql`);
});
