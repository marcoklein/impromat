import { registerEnumType } from '@nestjs/graphql';

export enum ElementVisibility {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

registerEnumType(ElementVisibility, {
  name: 'ElementVisibility',
  valuesMap: {
    PRIVATE: {
      description: 'Element is only visible to its owning user.',
    },
    PUBLIC: {
      description: 'Element is publicly shared with the whole community.',
    },
  },
});
