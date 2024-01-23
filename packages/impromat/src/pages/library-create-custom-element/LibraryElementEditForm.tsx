import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { InfoPopper } from "./InfoPopper";
import { TagsSelect } from "./TagsSelect";

interface ContainerProps {
  name: string;
  nameError?: string;
  setName: (name: string) => void;
  content: string;
  setContent: (content: string) => void;
  languageCode: string;
  setLanguageCode: (languageCode: string) => void;
  isAddToPublicElements: boolean;
  setIsAddToPublicElements: (isAddToPublicElements: boolean) => void;
  availableTags: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
  isCommunityElement?: boolean;
  isEditingElement?: boolean;
  hideChangeVisibility?: boolean;
}

export const LibraryElementEditForm: React.FC<ContainerProps> = ({
  name,
  nameError,
  setName,
  content,
  setContent,
  languageCode,
  setLanguageCode,
  isAddToPublicElements,
  setIsAddToPublicElements,
  availableTags,
  tags,
  setTags,
  isCommunityElement,
  isEditingElement,
  hideChangeVisibility,
}) => {
  const { t } = useTranslation("LibraryElementEditForm"); // TODO rename translations

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Stack spacing={1}>
        {isCommunityElement && (
          <Alert severity="info">
            <AlertTitle>{t("CommunityElement")}</AlertTitle>
            {t("CommunityElementNote")}
          </Alert>
        )}
        <TextField
          fullWidth
          placeholder={t("Please enter a name")}
          label={t("Name (required)")}
          type="text"
          error={!!nameError}
          helperText={nameError}
          required
          inputProps={{
            maxLength: 50,
          }}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TagsSelect
          availableTags={availableTags}
          selectedTags={tags}
          onSelectedTagsChange={setTags}
          label={t("Tags")}
        ></TagsSelect>
        <TextField
          fullWidth
          multiline
          label={t("Content")}
          minRows={5}
          maxRows={10}
          value={content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
          }}
        />
        <FormControl variant="outlined">
          <InputLabel>{t("Language (required)")}</InputLabel>
          <Select
            value={languageCode}
            label={t("Language (required)")}
            onChange={(event) => setLanguageCode(event.target.value)}
            placeholder={t("Select language")}
          >
            <MenuItem value="en">{t("en")}</MenuItem>
            <MenuItem value="de">{t("de")}</MenuItem>
          </Select>
        </FormControl>

        {!hideChangeVisibility && (
          <FormControl fullWidth>
            <Box display="flex">
              <FormControlLabel
                sx={{ flexGrow: 1 }}
                control={
                  <Checkbox
                    checked={isAddToPublicElements}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setIsAddToPublicElements(event.target.checked)
                    }
                  />
                }
                label={t("AddtoPublicElements")}
              />
              <InfoPopper message={t("AddtoPublicElementsNote")} />
            </Box>
            {isAddToPublicElements && (
              <FormHelperText component="div">
                <Alert severity="info">
                  <AlertTitle>{t("Sharing cannot be undone.")}</AlertTitle>
                  {t("AddtoPublicElementsNote")}
                </Alert>
              </FormHelperText>
            )}
          </FormControl>
        )}
        {isEditingElement && (
          <Alert severity="warning">
            <AlertTitle>{t("elementsAreUnique")}</AlertTitle>
            {t("CustomElementNote")}
          </Alert>
        )}
      </Stack>
    </Container>
  );
};
