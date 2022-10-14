const workshopElementProperties = {
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  markdown: {
    type: "string",
  },
  tags: {
    type: "array",
    items: {
      type: "string",
    },
  },
  note: {
    type: "string",
  },
  languageCode: {
    type: "string",
  },
  sourceUrl: {
    type: "string",
  },
  sourceName: {
    type: "string",
  },
  sourceBaseUrl: {
    type: "string",
  },
  licenseName: {
    type: "string",
  },
  licenseUrl: {
    type: "string",
  },
};

export const workshopSchemaVersion0 = {
  title: "workshop schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    updatedAt: {
      type: "number",
    },
    elements: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          ...workshopElementProperties,
          // TODO investigate if it makes more sense to put this into its own collection and access elements with $ref
          basedOn: {
            type: "object",
            properties: {
              ...workshopElementProperties,
            },
            required: ["id", "name", "markdown", "tags", "note"],
          },
        },
        required: ["id", "name", "markdown", "tags", "note"],
      },
    },
  },
  required: ["id", "name", "description", "elements", "updatedAt", "deleted"],
};
