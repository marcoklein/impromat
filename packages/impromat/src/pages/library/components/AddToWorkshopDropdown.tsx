import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ContainerProps {
  workshopId: string | undefined;
  onWorkshopIdChange: (workshopId: string) => void;
  workshops: { id: string; name: string }[];
}

interface ContainerProps {
  workshopId: string | undefined;
  onWorkshopIdChange: (workshopId: string) => void;
  workshops: { id: string; name: string }[];
}

export const AddToWorkshopDropdown: React.FC<ContainerProps> = ({
  workshopId,
  onWorkshopIdChange,
  workshops,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="add-to-workshop-label">Add to Workshop</InputLabel>
      <Select
        labelId="add-to-workshop-label"
        value={workshopId}
        onChange={(e) => {
          onWorkshopIdChange(e.target.value as string);
        }}
        placeholder="Select workshop"
      >
        {workshops.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
