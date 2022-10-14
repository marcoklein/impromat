import {
  debug,
  desc,
  filter,
  groupBy,
  map,
  max,
  mutate,
  n,
  select,
  sort,
  summarize,
  tidy,
} from "@tidyjs/tidy";
import { ImprobibEntry } from "../improbib";
import { createLogger } from "../logger";

const logger = createLogger("experiments");

export async function experiments(elements: ImprobibEntry[]) {
  const test = tidy(
    elements,
    select(["type", "name"]),
    groupBy("name", [], groupBy.entriesObject()),
    mutate({ count: (d) => d.values.length as number }),
    // Map((d) => ({ ...d, values: d.values.map((v: any) => v.name).join("") })),
    sort([desc("count")]),
    debug("", { limit: 10, output: "table" }),
  );

  // Count of parts
  tidy(
    elements,
    select(["type", "name"]),
    groupBy("name", [], groupBy.entriesObject()),
    mutate({ count: (d) => d.values.length as number }),
    // Map((d) => ({ ...d, values: d.values.map((v: any) => v.name).join("") })),
    sort([desc("count")]),
    debug("", { limit: 10, output: "table" }),
  );

  // Parts grouped by name
  tidy(
    elements,
    select(["type", "name"]),
    filter((d) => d.type === "element"),
    groupBy("name", [summarize({ count: n() })]),
    sort([desc("count")]),
    debug("parts grouped by name ", { limit: 10, output: "table" }),
  );

  // Parts grouped by source url
  tidy(
    elements,
    map((d) => ({ ...d, sourceUrl: d.sourceUrl })),
    select(["type", "name", "sourceUrl"]),
    filter((d) => d.type === "element"),
    groupBy("sourceUrl", [summarize({ count: n() })]),
    sort([desc("count")]),
    debug("parts grouped by name ", { limit: 10, output: "table" }),
  );

  tidy(
    elements,
    select(["type", "name", "sourceUrl", "baseUrl"]),
    // Filter((d) => d.type === "part"),
    groupBy("baseUrl", [summarize({ count: n() })]),
    sort([desc("count")]),
    debug("parts grouped by sourceUrl", { limit: 10, output: "table" }),
  );

  if (
    tidy(
      elements,
      select(["identifier"]),
      groupBy("identifier", [summarize({ count: n() })]),
      summarize({ maxCount: max("count") }),
    )[0].maxCount !== 1
  ) {
    tidy(
      elements,
      select(["identifier"]),
      groupBy("identifier", [summarize({ count: n() })]),
      sort([desc("count")]),
      debug("Duplicated identifiers"),
    );
    throw new Error(
      "Data Sanity Error: There are duplicated identifiers. See logs for more information.",
    );
  }

  // Const enrichedElements = tidy(
  //   elements,
  //   distinct(["name", "sourceUrl"]),
  //   mutate({ baseUrl: (d) => toBaseUrl(d.sourceUrl) }),
  // );

  // tidy(enrichedElements, select(["sourceUrl"]), debug("qwfp"));

  // tidy(
  //   elements,
  //   select(["type", "name", "sourceUrl", "baseUrl"]),
  //   // filter((d) => d.type === "part"),
  //   groupBy("baseUrl", [summarize({ count: n() })]),
  //   sort([desc("count")]),
  //   debug("parts grouped by baseUrl", { limit: 10, output: "table" }),
  // );

  // tidy(
  //   enrichedElements,
  //   select(["type", "name"]),
  //   filter((d) => d.type === "part"),
  //   groupBy("name", [summarize({ count: n() })]),
  //   sort([desc("count")]),
  //   debug("parts grouped by name ", { limit: 10, output: "table" }),
  // );

  // tidy(
  //   elements,
  //   filter(({ type }) => type === "part"),
  //   sort(["title"]),
  //   debug("parts"),
  // );
}
