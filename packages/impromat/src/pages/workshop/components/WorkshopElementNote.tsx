import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { TextFieldDialog } from "./TextFieldDialog";

interface NoteFieldProps {
  note: string;
  saveNotesChanges: (value: string) => void;
}

export const WorkshopElementNote: React.FC<NoteFieldProps> = ({
  note,
  saveNotesChanges,
}) => {
  const { t } = useTranslation("WorkshopElementNote");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          m: 1,
          px: 2,
          py: 0.5,
          cursor: "pointer",
          borderColor: "info.main",
        }}
        onClick={() => setIsNoteDialogOpen(true)}
      >
        {note?.trim() ? (
          <ReactMarkdown>{note}</ReactMarkdown>
        ) : (
          <Typography color="gray">{t("notePlaceholder")}</Typography>
        )}
      </Paper>
      <TextFieldDialog
        open={isNoteDialogOpen}
        handleClose={() => setIsNoteDialogOpen(false)}
        handleSave={saveNotesChanges}
        title={t("note")}
        initialValue={note ?? ""}
        TextFieldProps={{
          multiline: true,
          maxRows: 5,
          placeholder: t("notePlaceholder"),
        }}
      />
    </>
  );
};
