import camelcase from "./camelcase";

interface Options {
  punctuationRegex?: RegExp;
  locale?: string;
  preserveConsecutiveUppercase?: boolean;
}

const PUNCTUATION = /[^\p{L}\p{N}]+/gu;

const toString = (input) => {
  if (input == null) return "";

  if (Array.isArray(input)) {
    return input
      .map((s) => s.toString().trim())
      .filter((s) => s.length > 0)
      .join(" ");
  }

  if (typeof input === "function") {
    return input.name ? input.name : "";
  }

  if (typeof input.toString !== "function") {
    return "";
  }

  return input.toString().trim();
};

export const pascalcase = (value, options: Options = {}) => {
  const input = toString(value);
  const regex = options.punctuationRegex ?? PUNCTUATION;
  const output = input
    ? camelcase(regex ? input.replace(regex, " ") : input, options)
    : "";
  return output
    ? output[0].toLocaleUpperCase(options.locale) + output.slice(1)
    : "";
};

export default pascalcase;
