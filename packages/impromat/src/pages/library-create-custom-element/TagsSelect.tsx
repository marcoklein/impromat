import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ComponentProps {
  selectedTags: string[];
  availableTags: string[];
  onSelectedTagsChange: (tags: string[]) => void;
  label: string;
}

/**
 * Renders a select box for tags.
 */
export const TagsSelect: React.FC<ComponentProps> = ({
  selectedTags,
  availableTags,
  onSelectedTagsChange,
  label,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    onSelectedTagsChange(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="tags-select-label">{label}</InputLabel>
      <Select
        variant="outlined"
        labelId="tags-select-label"
        label={label}
        multiple
        value={selectedTags}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((name) => (
              <Chip key={name} label={name} />
            ))}
          </Box>
        )}
      >
        {availableTags.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
