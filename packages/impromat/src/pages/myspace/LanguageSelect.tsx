import { CheckCircle, Close, Error, Info, Language } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItem,
  ListItemIcon,
  NativeSelect,
  Paper,
  Popper,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateUserMutation } from "../../hooks/use-update-user-mutation";

interface ComponentProps {
  userId: string;
  availableLanguageCodes?: string[];
  selectedLanguageCode?: string;
  languageCodes?: string[];
}

export const LanguageSelect: React.FC<ComponentProps> = ({
  userId,
  availableLanguageCodes,
  selectedLanguageCode,
  languageCodes,
}) => {
  const { t } = useTranslation("LanguageSelect");
  const [updateUserMutationResult, updateUserMutation] =
    useUpdateUserMutation();

  const [triggeredUpdate, setTriggeredUpdate] = useState(false);
  const onLanguageChange = useCallback(
    (newLanguage: string) => {
      if (!selectedLanguageCode) return;
      const newLanguageCodes = new Set([
        newLanguage,
        ...(languageCodes?.slice(1) ?? []),
      ]);
      updateUserMutation({
        input: { id: userId, languageCodes: [...newLanguageCodes] },
      });
      setTriggeredUpdate(true);
    },
    [languageCodes, selectedLanguageCode, updateUserMutation, userId],
  );

  const updateState = useMemo(() => {
    if (updateUserMutationResult.error) {
      return "error";
    }
    if (updateUserMutationResult.fetching) {
      return "loading";
    }
    if (triggeredUpdate) {
      return "success";
    }
    return undefined;
  }, [
    triggeredUpdate,
    updateUserMutationResult.error,
    updateUserMutationResult.fetching,
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const showOtherLanguageContent = useMemo(
    () => languageCodes && languageCodes.length > 1,
    [languageCodes],
  );
  const onShowOtherLanguageContentToggle = useCallback(
    (input: boolean) => {
      if (!selectedLanguageCode) return;
      if (!input) {
        updateUserMutation({
          input: { id: userId, languageCodes: [selectedLanguageCode] },
        });
      } else {
        const newShowAdditionalLanguage = [
          ...new Set([selectedLanguageCode, ...["en", "de"]]),
        ];
        updateUserMutation({
          input: { id: userId, languageCodes: newShowAdditionalLanguage },
        });
      }
    },
    [selectedLanguageCode, updateUserMutation, userId],
  );

  return (
    <ListItem>
      <ListItemIcon>
        {!updateState && <Language />}
        {updateState === "success" && <CheckCircle color="success" />}
        {updateState === "error" && <Error color="error" />}
        {updateState === "loading" && <CircularProgress size={24} />}
      </ListItemIcon>
      <Box>
        <FormControl fullWidth>
          {availableLanguageCodes !== undefined && (
            <>
              <Box display="flex" alignItems="center">
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  {t("Display Language")}
                </InputLabel>
                <NativeSelect
                  variant="standard"
                  fullWidth
                  value={selectedLanguageCode}
                  inputProps={{
                    name: t("Display Language"),
                    id: "uncontrolled-native",
                  }}
                  onChange={(event) => onLanguageChange(event.target.value)}
                >
                  {availableLanguageCodes?.map((languageCode) => (
                    <option key={languageCode} value={languageCode}>
                      {t(languageCode)}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
              {updateState === "error" && (
                <FormHelperText>
                  <Box color="error.main">
                    {updateUserMutationResult.error?.message}
                  </Box>
                </FormHelperText>
              )}
            </>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Box display="flex">
            <FormControlLabel
              sx={{ flexGrow: 1 }}
              control={
                <Checkbox
                  checked={showOtherLanguageContent}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onShowOtherLanguageContentToggle(event.target.checked)
                  }
                />
              }
              label={t("showAdditionalLanguageContent")}
            />
            <IconButton aria-describedby={id} onClick={handleClick}>
              <Info />
            </IconButton>
            {/* TODO replace with InfoPopper component */}
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom-end"
            >
              <Paper
                elevation={3}
                sx={{ p: 1, mx: 1, border: 1, maxWidth: "400px" }}
              >
                <IconButton
                  sx={{ float: "right" }}
                  aria-label="close"
                  size="small"
                  onClick={() => setAnchorEl(null)}
                >
                  <Close />
                </IconButton>
                {t("showAdditionalLanguageNote")}
              </Paper>
            </Popper>
          </Box>
        </FormControl>
      </Box>
    </ListItem>
  );
};
