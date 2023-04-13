import ReactMarkdown from "react-markdown";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { CustomElementInfoItemComponent } from "./CustomElementInfoItemComponent";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";
import { InfoItemComponent } from "./InfoItemComponent";
import { warning } from "ionicons/icons";

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
      name
    }
    isOwnerMe
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
      {element.isOwnerMe ? (
        <CustomElementInfoItemComponent
          elementFragment={element}
        ></CustomElementInfoItemComponent>
      ) : element.sourceName === "impromat" ? (
        <>
          <InfoItemComponent
            message={`Created by ${
              element.owner?.name ?? "a user"
            } in impromat`}
          ></InfoItemComponent>
          <InfoItemComponent
            icon={warning}
            color="warning"
            message="Sharing of elements is under development"
          ></InfoItemComponent>
        </>
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
