import { Autocomplete, TextField, type AutocompleteProps } from "@mui/material";
import { useMemo, useState } from "react";

export function SingleAutocomplete(
  {allOptions, label, placeholder}: 
  {allOptions: string[], label?: string, placeholder?: string  }) {
  
  
  return <Autocomplete
  freeSolo
  options={allOptions}
  renderInput={
    params => <TextField 
    {...params} 
    label={label}
    placeholder={placeholder} />
  }
  />
}