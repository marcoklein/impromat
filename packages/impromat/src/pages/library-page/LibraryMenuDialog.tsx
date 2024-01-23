import { Language } from "@mui/icons-material";
import { DialogContent, FormControl, MenuItem, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../components/DialogScaffold";

interface ContainerProps {
  selectedLanguage: string;
  onSelectedLanguage: (language: string) => void;
  open: boolean;
  onClose: () => void;
}

export const LibraryMenuDialog: React.FC<ContainerProps> = ({
  selectedLanguage,
  onSelectedLanguage,
  open,
  onClose,
}) => {
  const { t } = useTranslation("LibraryMenuDialog");
  return (
    <DialogScaffold
      open={open}
      handleClose={onClose}
      title={t("searchOptionsTitle")}
    >
      <DialogContent>
        <FormControl sx={{ mt: 1 }} fullWidth>
          <TextField
            select
            label={t("languageOfResults")}
            size="small"
            value={selectedLanguage}
            onChange={(event) => onSelectedLanguage(event.target.value)}
            InputProps={{
              startAdornment: <Language sx={{ mr: 1 }}></Language>,
            }}
          >
            <MenuItem value="en">{t("en")}</MenuItem>
            <MenuItem value="de">{t("de")}</MenuItem>
          </TextField>
        </FormControl>
      </DialogContent>
    </DialogScaffold>
  );
};
