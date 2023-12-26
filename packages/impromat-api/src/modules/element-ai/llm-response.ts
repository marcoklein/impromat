export interface LLMResponse {
  done: boolean;
  /** Time spent generating the response */
  total_duration: number;
  /** Time spent in nanoseconds loading the model */
  load_duration: number;
  /** Number of samples generated */
  sample_count: number;
  /** Time spent generating samples */
  sample_duration: number;
  /** Number of tokens in the prompt */
  prompt_eval_count: number;
  /** Time spent in nanoseconds evaluating the prompt */
  prompt_eval_duration: number;
  /** Number of tokens in the response */
  eval_count: number;
  /** Time in nanoseconds spent generating the response */
  eval_duration: number;
  /** Encoding of the conversation used in this response, this can be sent in the next request to keep a conversational memory */
  context: number[];
  /** Empty if the response was streamed, if not streamed, this will contain the full response */
  response: string;
}
