import {
  AutoAwesome,
  ExpandLess,
  ExpandMore,
  Public,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { CustomElementInfoItemComponent } from "../../components/CustomElementInfoItemComponent";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { IsLoggedIn } from "../../components/IsLoggedIn";
import { LicenseItemComponent } from "../../components/LicenseItemComponent";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { routeLibraryEditCustomElement } from "../../routes/library-routes";

const ElementDetails_Element = graphql(`
  fragment ElementDetails_Element on Element {
    id
    name
    markdown
    summary

    isOwnerMe
    owner {
      id
      name
    }
    visibility
    tags {
      id
      name
    }

    sourceUrl
    sourceName
    sourceBaseUrl
    licenseName
    licenseUrl

    ...CustomElement_Element
  }
`);

interface ElementDetailsProps {
  elementFragment: FragmentType<typeof ElementDetails_Element>;
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({
  elementFragment,
}) => {
  const { t } = useTranslation();

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);

  const element = getFragmentData(ElementDetails_Element, elementFragment);

  return (
    <Box>
      <Typography variant="caption">
        {element.tags.map((tag) => `#${tag.name}`).join(" ")}
      </Typography>
      {element.summary && element.summary !== element.markdown && (
        <>
          <Paper variant="outlined">
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() =>
                setIsSummaryExpanded((currentValue) => !currentValue)
              }
            >
              <Box
                sx={{
                  p: 1,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  mt: 0.5,
                  flexGrow: 1,
                  textOverflow: "ellipsis",
                  overflow: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <AutoAwesome
                  color="info"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.5rem",
                    },
                  }}
                />
                <Typography variant="body2">
                  {t("AI generated", { ns: "ElementComponent" })}
                </Typography>
              </Box>
              <IconButton sx={{ mr: 0.5 }}>
                {isSummaryExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            {isSummaryExpanded && (
              <>
                <Divider />
                <Box p={1} px={2}>
                  <Typography variant="body2" color="text.secondary">
                    {element.summary}
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </>
      )}
      {element.markdown && (
        <>
          <Typography>
            <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
          </Typography>
          <Divider variant="middle" />
        </>
      )}

      {/* TODO extract this into separate "source" component */}
      {element.isOwnerMe ? (
        <CustomElementInfoItemComponent
          elementFragment={element}
        ></CustomElementInfoItemComponent>
      ) : element.sourceName === "impromat" &&
        element.owner?.name !== "improbib" ? (
        <>
          <InfoItemComponent
            primary={
              element.owner?.name
                ? t("createdByWithName", {
                    name: element.owner?.name,
                    ns: "ElementDetails",
                  })
                : t("createdBy", { ns: "ElementDetails" })
            }
          />
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
        <IsLoggedIn>
          <ListItem>
            <ListItemIcon>
              <Public color="success" />
            </ListItemIcon>
            <ListItemText
              primary={t("CommunityElement", { ns: "ElementComponent" })}
              secondary={
                <Trans
                  t={t}
                  ns={"ElementComponent"}
                  i18nKey="ImproveElement"
                  components={{
                    EditingLink: (
                      <NavLink to={routeLibraryEditCustomElement(element.id)} />
                    ),
                  }}
                />
              }
            />
          </ListItem>
        </IsLoggedIn>
      )}
    </Box>
  );
};
