import { Configuration, OpenAIApi } from "openai";
import { environment } from "./environment";
const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  temperature: 0,
  max_tokens: 7,
});

console.log(response.data.choices[0].text);
// console.log(response.data.object);
// // console.log(response.statusText);
// console.log(response.data.usage);
