import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import type { UseStateSetter } from "../../types/common";

export function SingleAutocomplete({
  formName,
  allOptions,
  label,
  placeholder,
  noOptionsText,
  setSelection,
  onSelectionChange,
  freeSolo = true,
  value,
}: {
  formName: string;
  allOptions: string[];
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
  setSelection?: UseStateSetter<string>;
  onSelectionChange?: (value: string) => void;
  freeSolo?: boolean;
  value?: string;
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
        value={value ?? null}
        onInputChange={(_, value, _reason) => {
          // if (reason === "input") {
          setUserText(value);
          // }
        }}
        onChange={(_, value) => {
          const newValue = value ?? "";
          if (setSelection) setSelection(newValue);
          if (onSelectionChange) onSelectionChange(newValue);
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
