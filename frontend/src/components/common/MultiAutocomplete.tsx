import {
  Autocomplete,
  FormHelperText,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export function MultiAutocomplete({
  formName,
  allOptions,
  label,
  placeholder,
  noOptionsText,
  defaultValues,
  required,
  requiredErrorText = "Please select at least one option",
}: {
  formName: string;
  allOptions: string[];
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
  defaultValues?: string[];
  required?: boolean;
  requiredErrorText?: string;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showRequiredError, setShowRequiredError] = useState(false);

  useEffect(() => {
    if (defaultValues) setSelectedOptions(defaultValues);
  }, [defaultValues]);

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
          if ((value as string[]).length > 0) {
            setShowRequiredError(false);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={showRequiredError && selectedOptions.length === 0}
          />
        )}
      />
      <input
        type="text"
        name={formName}
        value={
          selectedOptions.length > 0
            ? "[" + selectedOptions.map((s) => `"${s}"`).join(",") + "]"
            : ""
        }
        required={required}
        readOnly
        onInvalid={(e) => {
          e.preventDefault();
          setShowRequiredError(true);
        }}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      {showRequiredError && selectedOptions.length === 0 && (
        <FormHelperText error sx={{ ml: 1 }}>
          {requiredErrorText}
        </FormHelperText>
      )}
      {userText && noOptionsText && menuOptions.length === 0 && (
        <FormHelperText sx={{ ml: 1 }}>{noOptionsText}</FormHelperText>
      )}
    </>
  );
}
