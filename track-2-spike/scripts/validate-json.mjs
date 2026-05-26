import { fileURLToPath } from "node:url";
import { readJson } from "./lib/fs.mjs";

function typeName(value) {
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
}

function validateRequired(schema, value, path, errors) {
  for (const key of schema.required ?? []) {
    if (!(key in value)) {
      errors.push(`${path}.${key} is required`);
    }
  }
}

function validateType(schema, value, path, errors) {
  if (!schema.type) {
    return;
  }

  const allowed = Array.isArray(schema.type) ? schema.type : [schema.type];
  const actual = typeName(value);

  if (allowed.includes("integer") && Number.isInteger(value)) {
    return;
  }

  if (allowed.includes("number") && actual === "number") {
    return;
  }

  if (!allowed.includes(actual)) {
    errors.push(`${path} expected ${allowed.join(" or ")}, received ${actual}`);
  }
}

function validateEnum(schema, value, path, errors) {
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} must be one of ${schema.enum.join(", ")}`);
  }
}

function validateValue(schema, value, path = "$", errors = []) {
  validateType(schema, value, path, errors);
  validateEnum(schema, value, path, errors);

  if (schema.type === "object" && value && typeof value === "object" && !Array.isArray(value)) {
    validateRequired(schema, value, path, errors);

    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value) {
        validateValue(childSchema, value[key], `${path}.${key}`, errors);
      }
    }
  }

  if (schema.type === "array" && Array.isArray(value) && schema.items) {
    value.forEach((item, index) => validateValue(schema.items, item, `${path}[${index}]`, errors));
  }

  return errors;
}

export async function validateJsonFile(schemaPath, jsonPath) {
  const schema = await readJson(schemaPath);
  const json = await readJson(jsonPath);
  const errors = validateValue(schema, json);

  if (errors.length > 0) {
    throw new Error(`Validation failed for ${jsonPath}\n${errors.join("\n")}`);
  }

  return {
    schemaPath,
    jsonPath
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , schemaPath, jsonPath] = process.argv;

  if (!schemaPath || !jsonPath) {
    console.error("Usage: node track-2-spike/scripts/validate-json.mjs <schema> <json>");
    process.exit(1);
  }

  validateJsonFile(schemaPath, jsonPath)
    .then(() => {
      console.log(`Validated ${jsonPath}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
