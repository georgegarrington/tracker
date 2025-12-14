import { Autocomplete, TextField } from "@mui/material";
import { SingleAutocomplete } from "../../../common/SingleAutocomplete";

export function CodingProblemAutocomplete(
    {existingProblems}: {existingProblems: string[]}
) {
  return <SingleAutocomplete
    allOptions={existingProblems}
    label="Problem name"
    placeholder="Type problem name here"
  />
  // return <Autocomplete
  //   freeSolo
  //   options={existingProblems}
  //   // sx={{
  //   //     width: 300,
  //   // }}
  //   renderInput={params => 
  //   <TextField 
  //   {...params} 
  //   label="Problem name"
  //    placeholder="Type problem name here" />}
  //   />
  
  ;
}