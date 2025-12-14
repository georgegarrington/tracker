import { Autocomplete, TextField } from "@mui/material";

export function TagAutocomplete(
    {existingTags}: {existingTags: string[]}
) {
  return <Autocomplete
    freeSolo
    multiple
    options={existingTags}
    // sx={{
    //     width: 300,
    // }}
    renderInput={params => 
    <TextField 
    {...params} 
    label="Tags"
     placeholder="Type tags here" />}
    />
  
  ;
}