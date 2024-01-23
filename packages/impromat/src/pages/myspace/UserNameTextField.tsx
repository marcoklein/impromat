import { Save } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateUserMutation } from "../../hooks/use-update-user-mutation";

interface ComponentProps {
  queryUserName: string;
  userId: string;
  readonly: boolean;
}

export const UserNameTextField: React.FC<ComponentProps> = ({
  userId,
  queryUserName,
  readonly,
}) => {
  const { t } = useTranslation("UserNameTextField");
  const [updateUserMutationResult, updateUserMutation] =
    useUpdateUserMutation();

  const minLength = 3;
  const maxLength = 20;

  const [userNameInput, setUserNameInput] = useState("");
  const userNameChanged = useMemo(
    () => queryUserName !== userNameInput,
    [queryUserName, userNameInput],
  );
  useEffect(() => {
    setUserNameInput(queryUserName);
  }, [queryUserName]);

  const userNameError = useMemo(() => {
    if (updateUserMutationResult.error) {
      return t("endpointError");
    }
    if (userNameInput.length > maxLength) {
      return t("userNameTooLong");
    }
    if (!userNameInput.match(/^[a-zA-Z \-_0-9]*$/)) {
      return t("userNameOnlyLetters");
    }
    return undefined;
  }, [t, updateUserMutationResult.error, userNameInput]);

  const saveNewUserName = useCallback(async () => {
    if (!userNameChanged) {
      return;
    }
    if (!userId) return;
    const result = await updateUserMutation({
      input: { id: userId, name: userNameInput },
    });
    if (!result.data) {
      return;
    }
  }, [userNameChanged, userId, updateUserMutation, userNameInput]);

  const helperText = useMemo(() => {
    if (userNameInput !== "" && userNameInput.length < minLength) {
      return t("userNameTooShort");
    }
    if (userNameError) {
      return userNameError;
    }
    if (userNameChanged) {
      return t("userNameChanged");
    }
    return t("userNameIsPublic");
  }, [t, userNameChanged, userNameError, userNameInput]);

  return (
    <TextField
      error={!!userNameError}
      label={t("userName")}
      helperText={helperText}
      fullWidth
      size="small"
      variant="standard"
      value={userNameInput}
      onChange={(event) => setUserNameInput(event.target.value)}
      InputProps={{
        readOnly: readonly,
        endAdornment: (
          <InputAdornment position="end">
            {userNameChanged && (
              <IconButton
                disabled={!!userNameError || userNameInput.length < minLength}
                color="primary"
                onClick={() => saveNewUserName()}
              >
                <Save color="inherit" />
              </IconButton>
            )}
            {updateUserMutationResult.fetching && (
              <CircularProgress size={24} />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
