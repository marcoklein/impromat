import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { globe } from "ionicons/icons";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { routeLibraryEditCustomElement } from "../pages/library/library-routes";
import { COLOR_SHARED } from "../theme/theme-colors";
import { CustomElementInfoItemComponent } from "./CustomElementInfoItemComponent";
import { InfoItemComponent } from "./InfoItemComponent";
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
    visibility
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
      {!element.isOwnerMe && element.visibility === "PUBLIC" && (
        <IonItem>
          <IonIcon slot="start" icon={globe} color={COLOR_SHARED}></IonIcon>
          <IonLabel className="ion-text-wrap">
            Community Element
            <div>
              <IonNote>
                Want to improve this element? You can{" "}
                <NavLink
                  to={routeLibraryEditCustomElement({ elementId: element.id })}
                >
                  edit it here
                </NavLink>
                .
              </IonNote>
            </div>
          </IonLabel>
        </IonItem>
      )}
    </>
  );
};
