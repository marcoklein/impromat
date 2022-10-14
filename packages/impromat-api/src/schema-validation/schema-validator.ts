import Ajv from "ajv";
import { readFile } from "node:fs/promises";

export class SchemaValidator {
  async validate<T>(data: T) {
    const ajv = new Ajv({ allErrors: true });
    const file = await readFile("schema/schema.gen.json");
    const schema = JSON.parse(file.toString());
    const validate = ajv.compile(schema);
    const result = validate(data);
    return { valid: result, errors: validate.errors };
  }
}
