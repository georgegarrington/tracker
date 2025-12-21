import {
  Autocomplete,
  FormHelperText,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useMemo, useState } from "react";
import type { UseStateSetter } from "../../types/common";

export function SingleAutocomplete({
  formName,
  allOptions,
  label,
  placeholder,
  noOptionsText,
  setSelection,
  freeSolo = true,
}: {
  formName: string;
  allOptions: string[];
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
  setSelection?: UseStateSetter<string>;
  freeSolo?: boolean;
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
        freeSolo={freeSolo}
        fullWidth
        options={allOptions}
        onInputChange={(_, value, _reason) => {
          // if (reason === "input") {
          setUserText(value);
          // }
        }}
        onChange={(_, value) => {
          if (value && setSelection) setSelection(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            name={formName}
          />
        )}
      />
      {userText && noOptionsText && menuOptions.length === 0 && (
        <FormHelperText sx={{ ml: 1 }}>{noOptionsText}</FormHelperText>
      )}
    </>
  );
}
