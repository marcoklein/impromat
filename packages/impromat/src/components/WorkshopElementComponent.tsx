import { Element } from "../store/schema.gen";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";
import ReactMarkdown from "react-markdown";

interface ContainerProps {
  element: Element;
}

export const WorkshopElementComponent: React.FC<ContainerProps> = ({
  element,
}) => {
  return (
    <>
      <TagsComponent tags={element.tags}></TagsComponent>
      <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
      <LicenseItemComponent
        authorName={element.sourceName}
        authorUrl={element.sourceBaseUrl}
        licenseName={element.licenseName}
        licenseUrl={element.licenseUrl}
        name={element.name}
        sourceUrl={element.sourceUrl}
      ></LicenseItemComponent>
    </>
  );
};
