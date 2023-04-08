import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema/**/*.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/graphql-client/': {
      plugins: [
        // "typescript",
        // "typescript-operations",
        // // // "typescript-graphql-request",
        // "typescript-react-apollo",
      ],
      preset: 'client-preset',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },
  },
};

export default config;
