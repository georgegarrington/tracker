import {
  Autocomplete,
  FormHelperText,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useMemo, useState } from "react";

export function SingleAutocomplete({
  allOptions,
  label,
  placeholder,
  noOptionsText,
}: {
  allOptions: string[];
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
}) {
  const [userText, setUserText] = useState("");

  const menuOptions = useMemo(
    () =>
      allOptions.filter((option) =>
        option.toLowerCase().includes(userText.toLowerCase()),
      ),
    [allOptions, userText],
  );

  return (
    <>
      <Autocomplete
        freeSolo
        options={allOptions}
        onInputChange={(_, value, reason) => {
          if (reason === "input") {
            setUserText(value);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
      />
      {userText && noOptionsText && menuOptions.length === 0 && (
        <FormHelperText sx={{ ml: 1 }}>{noOptionsText}</FormHelperText>
      )}
    </>
  );
}
