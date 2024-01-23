import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { AutoAwesome, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { globe } from "ionicons/icons";
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
import { COLOR_SHARED } from "../../theme/theme-colors";

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

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const element = getFragmentData(ElementDetails_Element, elementFragment);

  return (
    <Box>
      <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
        {element.name}
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
          <Box>
            <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
          </Box>
          <Divider />
          {/* TODO show edit button if there is no markdown */}
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
        <IsLoggedIn>
          <IonItem>
            <IonIcon slot="start" icon={globe} color={COLOR_SHARED}></IonIcon>
            <IonLabel className="ion-text-wrap">
              {t("CommunityElement", { ns: "ElementComponent" })}
              <div>
                <IonNote>
                  <Trans
                    t={t}
                    ns={"ElementComponent"}
                    i18nKey="ImproveElement"
                    components={{
                      EditingLink: (
                        <NavLink
                          to={routeLibraryEditCustomElement(element.id)}
                        />
                      ),
                    }}
                  ></Trans>
                </IonNote>
              </div>
            </IonLabel>
          </IonItem>
        </IsLoggedIn>
      )}
    </Box>
  );
};
