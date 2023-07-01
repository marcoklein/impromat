import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  valuesMap: {
    asc: {
      description: 'Ascending sort order.',
    },
    desc: {
      description: 'Descending sort order.',
    },
  },
});
