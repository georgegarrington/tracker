import { Autocomplete, TextField, type AutocompleteProps } from "@mui/material";
import { useMemo, useState } from "react";

export function MultiAutocomplete({
  allOptions,
  label,
  placeholder,
}: {
  allOptions: string[];
  label?: string;
  placeholder?: string;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const availableOptions = useMemo(
    () => allOptions.filter((option) => !selectedOptions.includes(option)),

    [allOptions, selectedOptions],
  );

  return (
    <Autocomplete
      value={selectedOptions}
      freeSolo
      multiple
      options={availableOptions}
      onChange={(_, value) => {
        console.log("New val: ", JSON.stringify(value));
        setSelectedOptions(value as string[]);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
