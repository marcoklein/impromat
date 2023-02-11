import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema/schema.graphql',
  documents: ['test/**/*.ts'],
  generates: {
    './test/graphql-client/': {
      plugins: [],
      preset: 'client-preset',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
