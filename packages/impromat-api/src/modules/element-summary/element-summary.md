# Element Summary Module

Creates short text summaries of element markdowns.

## Requirements

Running [OLLAMA](https://github.com/jmorganca/ollama) instance.

On server:

```bash
curl https://ollama.ai/install.sh | sh
```

## Download GGUF from Huggingface

For German texts we use [EM German Mistral](https://huggingface.co/jphme/em_german_mistral_v01#prompt-format) which is trained on a large German corpus:

Download GGUF via: https://huggingface.co/TheBloke/em_german_leo_mistral-GGUF/blob/main/em_german_leo_mistral.Q4_0.gguf

```sh
ollama create example -f Modelfile
```

## Getting started

Start OLLAMA instance

```bash
ollama start
```

On Server

> Serves a REST API at http://127.0.0.1:11434

You can verify that with a CURL request:

```bash
curl http://127.0.0.1:11434
```

Should output `Ollama is running`.

## Pulling the Model

Pull the model from the OLLAMA instance.

```bash
ollama pull mistral
```

## Ollama API

[Documentation of API](https://github.com/jmorganca/ollama/blob/main/docs/api.md)

We use the `api/generate` to access the LLM.
