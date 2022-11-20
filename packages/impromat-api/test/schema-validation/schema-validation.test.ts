import Ajv from "ajv";
import { expect } from "chai";
import { readFileSync } from "node:fs";
import { Workshop } from "../../src/graphql/schema.gen";

describe("Schema Validation", async () => {
  it("should validate schema", async () => {
    // given
    const ajv = new Ajv();
    const schema = JSON.parse(
      readFileSync("schema/schema.gen.json").toString()
    );
    const data: Workshop = {
      id: "1",
      version: 0,
      name: "workshop",
      description: "",
      sections: [],
      updatedAt: 0,
      deleted: true,
    };
    // when
    const validate = ajv.compile(schema);
    const result = validate(data);
    // then
    expect(result).to.be.true;
    expect(data.deleted).to.be.true;
  });

  it("should not validate invalid data", async () => {
    // given
    const ajv = new Ajv();
    const schema = JSON.parse(
      readFileSync("schema/schema.gen.json").toString()
    );
    const data: Workshop = {
      id: "1",
      name: "workshop",
      description: undefined, // description missing
      elements: [],
      updatedAt: 0,
      deleted: true,
    } as any;
    // when
    const validate = ajv.compile(schema);
    const result = validate(data);
    // then
    expect(result).to.be.false;
    expect(validate.errors).to.have.lengthOf(1);
  });

  it("should validate schema with sections", async () => {
    // given
    const ajv = new Ajv();
    const schema = JSON.parse(
      readFileSync("schema/schema.gen.json").toString()
    );
    const data: Workshop = {
      id: "1",
      version: 0,
      name: "workshop",
      description: "",
      sections: [
        {
          id: "123",
          name: "name",
          version: 0,
          elements: [
            {
              version: 0,
              id: "123",
              markdown: "",
              name: "name",
              note: "note",
              tags: [],
            },
          ],
        },
      ],
      updatedAt: 0,
      deleted: true,
    };
    // when
    const validate = ajv.compile(schema);
    const result = validate(data);
    // then
    expect(result).to.be.true;
    expect(data.deleted).to.be.true;
  });
});
