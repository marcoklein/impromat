import ReactMarkdown from "react-markdown";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { CustomElementInfoItemComponent } from "./CustomElementInfoItemComponent";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";

const Element_ElementFragment = graphql(`
  fragment Element_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    markdown
    tags {
      name
    }
    usedBy {
      id
    }
    languageCode
    sourceUrl
    sourceName
    sourceBaseUrl
    licenseName
    licenseUrl
    owner {
      id
    }
    ...CustomElement_Element
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof Element_ElementFragment>;
}

export const ElementComponent: React.FC<ContainerProps> = ({
  elementFragment,
}) => {
  const element = getFragmentData(Element_ElementFragment, elementFragment);
  return (
    <>
      <div className="ion-padding">
        <TagsComponent tags={element.tags.map((t) => t.name)}></TagsComponent>
        <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
      </div>
      {element.owner && !element.sourceName ? (
        <CustomElementInfoItemComponent
          elementFragment={element}
        ></CustomElementInfoItemComponent>
      ) : (
        <LicenseItemComponent
          authorName={element.sourceName}
          authorUrl={element.sourceBaseUrl}
          licenseName={element.licenseName}
          licenseUrl={element.licenseUrl}
          name={element.name}
          sourceUrl={element.sourceUrl}
        ></LicenseItemComponent>
      )}
    </>
  );
};
