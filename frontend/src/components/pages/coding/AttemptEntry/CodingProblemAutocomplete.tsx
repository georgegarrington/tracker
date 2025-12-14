import { Autocomplete, TextField } from "@mui/material";

export function CodingProblemAutocomplete(
    {existingProblems}: {existingProblems: string[]}
) {
  return <Autocomplete
    freeSolo
    options={existingProblems}
    // sx={{
    //     width: 300,
    // }}
    renderInput={params => 
    <TextField 
    {...params} 
    label="Problem name"
     placeholder="Type problem name here" />}
    />
  
  ;
}