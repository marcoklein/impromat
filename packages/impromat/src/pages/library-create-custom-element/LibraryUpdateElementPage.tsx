import { Save } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { PageScaffold } from "../../components/PageScaffold";
import { graphql } from "../../graphql-client";
import { ElementVisibility } from "../../graphql-client/graphql";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { routeLibraryElement } from "../../routes/shared-routes";
import { LibraryElementEditForm } from "./LibraryElementEditForm";
import { NUMBER_OF_TAGS_TO_TAKE } from "./take-tags";

const LibraryUpdateElementPage_Query = graphql(`
  query LibraryUpdateElementPage_Query($id: ID!) {
    element(id: $id) {
      id
      name
      visibility
      markdown
      languageCode
      tags {
        id
        name
      }
    }
  }
`);

const LibraryUpdateElementPageTags_Query = graphql(`
  query LibraryUpdateElementPageTags_Query(
    $tagsInput: ElementTagsFilterInput!
    $tagsTake: Int
  ) {
    tags(filter: $tagsInput, take: $tagsTake) {
      id
      name
    }
  }
`);

const UpdateElementMutation = graphql(`
  mutation UpdateElementMutation($input: UpdateElementInput!) {
    updateElement(input: $input) {
      id
    }
  }
`);

export const LibraryUpdateElementPage: React.FC = () => {
  const logger = useComponentLogger("LibraryUpdateElementPage");
  const { t, i18n } = useTranslation("LibraryUpdateElementPage");
  const { elementId } = useParams<{
    elementId: string;
  }>();
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
    query: LibraryUpdateElementPage_Query,
    variables: {
      id: elementId,
    },
  });

  useEffect(() => {
    const element = queryResult.data?.element;
    if (!element) {
      return;
    }
    setName(element.name);
    setContent(element.markdown ?? "");
    setLanguageCode(element.languageCode ?? "");
    setIsAddToPublicElements(element.visibility === ElementVisibility.Public);
    setTags(element.tags.map((tag) => tag.name));
  }, [queryResult.data?.element]);

  const [tagsQueryResult] = useQuery({
    query: LibraryUpdateElementPageTags_Query,
    variables: {
      tagsInput: {
        languageCode,
      },
      tagsTake: NUMBER_OF_TAGS_TO_TAKE,
    },
  });

  const availableTags = useMemo(() => {
    return tagsQueryResult.data?.tags.map((tag) => tag.name).sort() ?? [];
  }, [tagsQueryResult.data?.tags]);

  const [, updateElementMutation] = useMutation(UpdateElementMutation);
  const updateElement = useCallback(async () => {
    const result = await updateElementMutation({
      input: {
        id: elementId,
        name,
        visibility: isAddToPublicElements
          ? ElementVisibility.Public
          : ElementVisibility.Private,
        markdown: content,
        languageCode,
        tags: { set: tags.map((name) => ({ name })) },
      },
    });
    console.log("result", result);
    return result;
  }, [
    content,
    elementId,
    isAddToPublicElements,
    languageCode,
    name,
    tags,
    updateElementMutation,
  ]);

  const handleSave = useCallback(async () => {
    if (!name || name.trim().length === 0) {
      setNameError(t("nameRequired"));
      return;
    }
    const result = await updateElement();
    if (result.error) {
      logger("ERROR: Could not update element", result.error);
      return;
    }
    history.replace(routeLibraryElement(elementId));
  }, [name, updateElement, history, elementId, t, logger]);

  return (
    <PageScaffold title={t("Edit Custom Element")} backButton>
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
          <Save />
        </Fab>

        {elementId && (
          <LibraryElementEditForm
            hideChangeVisibility={
              queryResult.data?.element?.visibility === ElementVisibility.Public
            }
            isEditingElement
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
        )}
      </Box>
    </PageScaffold>
  );
};
