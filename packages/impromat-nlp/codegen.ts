import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema/**/*.graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/graphql-client/": {
      plugins: [],
      preset: "client-preset",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
