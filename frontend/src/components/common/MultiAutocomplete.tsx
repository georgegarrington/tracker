import {
  Autocomplete,
  FormHelperText,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useMemo, useState } from "react";

export function MultiAutocomplete({
  formName,
  allOptions,
  label,
  placeholder,
  noOptionsText,
}: {
  formName: string;
  allOptions: string[];
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const availableOptions = useMemo(
    () => allOptions.filter((option) => !selectedOptions.includes(option)),

    [allOptions, selectedOptions],
  );

  const [userText, setUserText] = useState("");

  const menuOptions = useMemo(
    () =>
      availableOptions.filter((option) =>
        option.toLowerCase().includes(userText.toLowerCase()),
      ),
    [availableOptions, userText],
  );

  return (
    <>
      <Autocomplete
        value={selectedOptions}
        freeSolo
        multiple
        options={availableOptions}
        onInputChange={(_evt, value, _reason) => {
          // if (reason === "input") {
          setUserText(value);
          // }
        }}
        onChange={(_, value) => {
          console.log("New val: ", JSON.stringify(value));
          setSelectedOptions(value as string[]);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
      />
      <input
        type="hidden"
        name={formName}
        value={"[" + selectedOptions.map((s) => `"${s}"`).join(",") + "]"}
      />
      {userText && noOptionsText && menuOptions.length === 0 && (
        <FormHelperText sx={{ ml: 1 }}>{noOptionsText}</FormHelperText>
      )}
    </>
  );
}
