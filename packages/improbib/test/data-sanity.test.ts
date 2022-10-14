import fs from "node:fs/promises";
import {
  debug,
  desc,
  filter,
  groupBy,
  map,
  n,
  select,
  sort,
  summarize,
  tidy,
} from "@tidyjs/tidy";
import { expect } from "chai";
import { environment } from "../src/environment";
import { Improbib, ImprobibEntry } from "../src/improbib";
import { getPackageJsonVersion } from "../src/version";

describe("data sanity", () => {
  let improbibEntries: ImprobibEntry[];
  let improbib: Improbib;

  before(async function () {
    this.timeout(30_000);
    const file = await fs.readFile(`${environment.OUTPUT_FILE_PATH}`);
    const jsonInput = file.toString();
    improbib = JSON.parse(jsonInput) as Improbib;
    improbibEntries = improbib.elements;
  });

  it("parts markdown are unique by type and sourceUrl", () => {
    // given, when
    const result = tidy(
      improbibEntries,
      map((d) => ({ ...d, typeAndSourceUrl: `${d.type} - ${d.sourceUrl}` })),
      select(["typeAndSourceUrl", "type", "name", "sourceUrl"]),
      groupBy("typeAndSourceUrl", [summarize({ count: n() })]),
      sort([desc("count")]),
      debug("parts grouped by type and sourceUrl", {
        limit: 3,
        output: "log",
      }),
      filter((d) => d.count > 1),
    );
    // then
    expect(result).deep.equals([]);
  });

  it("unique identifiers", () => {
    // given, when
    const result = tidy(
      improbibEntries,
      select(["identifier", "type", "name", "sourceUrl"]),
      groupBy("identifier", [summarize({ count: n() })]),
      sort([desc("count")]),
      debug("parts grouped by identifier", {
        limit: 3,
        output: "log",
      }),
      filter((d) => d.count > 1),
    );
    // then
    expect(result).deep.equals([]);
  });

  it("should verify A to C from Improvresourcecenter", () => {
    // given
    const identifier = "f69228ca39c74e3d0e88597b63578cb8";
    // when
    const element = improbibEntries.find(
      (element) => element.identifier === identifier,
    );
    // then
    expect(element).not.to.be.undefined;
    const commentRegexResult = /<!--(.|\r?\n)*?-->/.exec(element!.markdown);
    expect(
      commentRegexResult,
      `Markdon comments not removed: ${commentRegexResult?.[0] ?? ""}`,
    ).to.be.null;
    expect(element!.markdown.includes("<!--"), "Markdown comment found").to.be
      .false;
  });

  it("should verify ABC-Spiel from Improwiki", () => {
    // given
    const identifier = "59718f28c5d305a0235e1dcb415d86f8";
    const name = "ABC-Spiel";
    // when
    const element = improbibEntries.find(
      (element) => element.identifier === identifier,
    );
    // then
    expect(
      element?.name,
      "Data of part changed? Maybe the identifier strategy changed?",
    ).to.equal(name);
    expect(
      element!.markdown.includes("Inhaltsverzeichnis"),
      "Inhaltsverzeichnis not deleted",
    ).to.be.false;
  });

  it("should have a unique tag list", () => {
    // given
    const elements = improbibEntries.filter(
      (entry) => entry.type === "element",
    );
    const elementsWithDoubleTags: typeof elements = [];
    // when
    for (const element of elements) {
      if ("tags" in element) {
        const tagDict: Record<string, true> = {};
        for (const tag of element.tags) {
          if (tagDict[tag]) {
            elementsWithDoubleTags.push(element);
            break;
          }

          tagDict[tag] = true;
        }
      } else {
        console.error("Element", element, "has no tags key assigned.");
        throw new Error("Element has no tags key. See console output.");
      }
    }

    // then
    expect(elementsWithDoubleTags).deep.equals([]);
  });

  it("should merge duplicated entries", () => {
    // given
    const elementId = "b2885aa9f7e36ef2faa16f4e6a1f7d30";
    const elementName = "Wort für Wort cross";
    // when
    const elements = improbibEntries.filter(
      (element) => element.identifier === elementId,
    );
    // then
    expect(elements).to.have.lengthOf(1);
    const element = elements[0];
    expect(element.name).to.equal(elementName, "Id generation changed?");
    expect(element.tags).contains("game");
    expect(element.tags).contains("exercise");
  });

  it("should sort by identifiers from A-Z", () => {
    // given
    let previousIdentifier = "0";
    // when
    for (const element of improbibEntries) {
      // then
      expect(
        previousIdentifier < element.identifier,
        `Wrong sorting of id ${element.identifier}`,
      ).is.true;
      previousIdentifier = element.identifier;
    }
  });

  it("should contain the version number", () => {
    // given
    const packageJsonVersion = getPackageJsonVersion();
    // when, then
    expect(improbib.version).to.equal(packageJsonVersion);
  });
});
