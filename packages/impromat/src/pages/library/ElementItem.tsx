import { Card, CardContent, Typography } from "@mui/material";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useState } from "react";

const ElementItem_Element = graphql(`
  fragment ElementItem_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    summary
    markdownShort
    tags {
      id
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
    isFavorite
    owner {
      id
    }
    isOwnerMe
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof ElementItem_Element>;
  onClick: () => void;
}

export const ElementItem: React.FC<ContainerProps> = ({
  elementFragment,
  onClick,
}) => {
  const element = getFragmentData(ElementItem_Element, elementFragment);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        m: 1,
        cursor: "pointer",
        height: "100%",
      }}
      elevation={isHovered ? 6 : 3}
      onClick={() => {
        onClick();
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {element.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {element.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};
