import { Language } from "@mui/icons-material";
import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../components/DialogScaffold";

interface ContainerProps {
  selectedLanguages: string[];
  onSelectedLanguages: (languages: string[]) => void;
  open: boolean;
  onClose: () => void;
}

export const LibraryMenuDialog: React.FC<ContainerProps> = ({
  selectedLanguages,
  onSelectedLanguages,
  open,
  onClose,
}) => {
  const { t } = useTranslation("LibraryMenuDialog");
  const inputLabelId = useId();

  const handleChange = (event: SelectChangeEvent<typeof selectedLanguages>) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const valueArray = typeof value === "string" ? value.split(",") : value;
    const sanitizedValue = valueArray.filter(
      (lang) => lang === "en" || lang === "de",
    );
    onSelectedLanguages(sanitizedValue);
  };
  return (
    <DialogScaffold
      open={open}
      handleClose={onClose}
      title={t("searchOptionsTitle")}
    >
      <DialogContent>
        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id={inputLabelId}>{t("languageOfResults")}</InputLabel>
          <Select
            labelId={inputLabelId}
            id="demo-multiple-name"
            multiple
            value={selectedLanguages}
            onChange={handleChange}
            input={
              <OutlinedInput
                label={t("languageOfResults")}
                placeholder="Select languages"
                startAdornment={<Language sx={{ mr: 1 }}></Language>}
              />
            }
          >
            <MenuItem value={"en"}>{t("en")}</MenuItem>
            <MenuItem value={"de"}>{t("de")}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </DialogScaffold>
  );
};
