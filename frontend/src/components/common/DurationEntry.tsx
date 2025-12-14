import { TextField, type TextFieldProps } from "@mui/material";
import { useMemo, useState } from "react";
import { useDebouncedState } from '@mantine/hooks';

const RAW_REGEX = "\\d+h\\d{1,2}m";
const REGEX = new RegExp(RAW_REGEX);

export function DurationEntry(
    props: TextFieldProps
) {

    const [value, setValue] = useDebouncedState("", 1000);

    const isError = useMemo(() => {
        return value.length > 0 && !REGEX.test(value);
    }, [value])

    return <TextField
        {...props}
        error={isError}
        fullWidth
        onChange={e => setValue(e.target.value)}
        slotProps={{
            htmlInput: {
                pattern: RAW_REGEX,
            }
        }}
    />
}