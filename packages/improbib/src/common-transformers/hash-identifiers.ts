import { Md5 } from "ts-md5";

export function hashIdentifier({
  type,
  sourceUrl,
  name,
}: {
  type: string;
  sourceUrl: string;
  name: string;
}) {
  return { identifier: Md5.hashStr(`${type};${name};${sourceUrl}`) };
}
