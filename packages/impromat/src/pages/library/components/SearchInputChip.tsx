import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface ContainerProps {
  input: string;
  onInputChange: (input: string) => void;
}

export const SearchInputChip: React.FC<ContainerProps> = ({
  input,
  onInputChange,
}) => {
  return (
    <TextField
      sx={{ ml: 1 }}
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search></Search>
          </InputAdornment>
        ),
      }}
      placeholder="Search"
      value={input}
      onChange={(event) => {
        onInputChange(event.target.value);
      }}
    ></TextField>
  );
};
