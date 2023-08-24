import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import OpenAI from "openai";
import { environment } from "../environment";
import { Prompt } from "./prompts/prompts";

export const GPT_MODEL = "gpt-3.5-turbo";

export async function processPrompt<Input, Output>(
  prompt: Prompt<Input, Output>
) {
  const completionRequest = createChatCompletionRequest(prompt.createPrompt());
  const response = await sendGptRequest(completionRequest);
  if (!response.message.content) {
    throw new Error("No response GPT request");
  }
  return {
    message: response.message,
    parsedResponse: prompt.parseResponse(response.message.content),
  };
}

export async function sendGptRequest(
  completionRequest: OpenAI.Chat.CompletionCreateParamsNonStreaming
) {
  const GPT_MODEL_INPUT_TOKEN_COST = 0.0015 / 1000;
  const GPT_MODEL_OUTPUT_TOKEN_COST = 0.002 / 1000;
  const openai = new OpenAI({
    apiKey: environment.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create(completionRequest);

  const inputCosts =
    (response.usage?.prompt_tokens ?? -1) * GPT_MODEL_INPUT_TOKEN_COST;
  const completionCosts =
    (response.usage?.completion_tokens ?? -1) * GPT_MODEL_OUTPUT_TOKEN_COST;
  const totalCosts = inputCosts + completionCosts;

  if (existsSync("./history")) {
    console.log("Request", completionRequest.messages[0].content);
    console.log("Writing response to file");
    console.log("Token usage: ", response.usage);
    console.log("Costs (EUR): ", totalCosts);
    await fs.writeFile(
      `./history/${createFileNameWithDateAndTime()}.json`,
      JSON.stringify(
        { request: completionRequest, response: response },
        null,
        2
      )
    );
    console.log("Response: ", response.choices[0].message);
  }

  return { usage: { totalCosts }, message: response.choices[0].message };
}

export function createFileNameWithDateAndTime() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

export function createChatCompletionRequest(message: string) {
  const completionRequest: OpenAI.Chat.CompletionCreateParamsNonStreaming = {
    model: GPT_MODEL,
    temperature: 0,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  };
  return completionRequest;
}
