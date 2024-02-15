import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { PageScaffold } from "../../components/PageScaffold";
import { graphql } from "../../graphql-client";
import { ElementVisibility } from "../../graphql-client/graphql";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { routeLibraryElement } from "../../routes/shared-routes";
import { LibraryElementEditForm } from "./LibraryElementEditForm";

const LibraryCreateElementPage_Query = graphql(`
  query LibraryCreateElementPage_Query($tagsInput: ElementTagsFilterInput!) {
    tags(filter: $tagsInput, take: 3) {
      id
      name
    }
  }
`);

const CreateElementMutation = graphql(`
  mutation CreateElementMutation($input: CreateElementInput!) {
    createElement(input: $input) {
      id
    }
  }
`);

export const LibraryCreateElementPage: React.FC = () => {
  const logger = useComponentLogger("LibraryCreateElementPage");
  const { t, i18n } = useTranslation("LibraryCreateElementPage");
  const history = useHistory();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [languageCode, setLanguageCode] = useState(i18n.languages[0]);
  const [isAddToPublicElements, setIsAddToPublicElements] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (name.trim().length > 0) {
      setNameError(undefined);
    }
  }, [name]);

  useEffect(() => {
    setTags([]);
  }, [languageCode]);

  const [queryResult] = useQuery({
    query: LibraryCreateElementPage_Query,
    variables: {
      tagsInput: {
        languageCode,
      },
    },
  });
  const availableTags = useMemo(() => {
    return queryResult.data?.tags.map((tag) => tag.name).sort() ?? [];
  }, [queryResult.data?.tags]);

  const [, createElementMutation] = useMutation(CreateElementMutation);
  const createElement = useCallback(async () => {
    const result = await createElementMutation({
      input: {
        name,
        visibility: isAddToPublicElements
          ? ElementVisibility.Public
          : ElementVisibility.Private,
        markdown: content,
        languageCode,
        tags: { set: tags.map((name) => ({ name })) },
      },
    });
    return result.data?.createElement;
  }, [
    content,
    isAddToPublicElements,
    languageCode,
    name,
    tags,
    createElementMutation,
  ]);

  const handleSave = useCallback(async () => {
    if (!name || name.trim().length === 0) {
      setNameError(t("nameRequired"));
      return;
    }
    const element = await createElement();
    if (!element) {
      logger("ERROR: Could not create element");
      return;
    }
    history.replace(routeLibraryElement(element.id));
  }, [createElement, history, logger, name, t]);

  return (
    <PageScaffold title={t("Create Custom Element")} backButton>
      <Box sx={{ overflow: "auto" }}>
        <Fab
          onClick={handleSave}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>

        <LibraryElementEditForm
          name={name}
          setName={setName}
          nameError={nameError}
          content={content}
          setContent={setContent}
          languageCode={languageCode}
          setLanguageCode={setLanguageCode}
          isAddToPublicElements={isAddToPublicElements}
          setIsAddToPublicElements={setIsAddToPublicElements}
          availableTags={availableTags}
          tags={tags}
          setTags={setTags}
        />
      </Box>
    </PageScaffold>
  );
};
