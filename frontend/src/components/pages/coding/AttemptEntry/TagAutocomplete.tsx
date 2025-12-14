import { MultiAutocomplete } from "../../../common/MultiAutocomplete";

export function TagAutocomplete(
    {existingTags}: {existingTags: string[]}
) {

    return <MultiAutocomplete
      allOptions={existingTags}
      label="Tags"
      placeholder="Type tags here"
    />

  // return <Autocomplete
  //   freeSolo
  //   multiple
  //   options={existingTags}
  //   // sx={{
  //   //     width: 300,
  //   // }}
  //   renderInput={params => 
  //   <TextField 
  //   {...params} 
  //   label="Tags"
  //    placeholder="Type tags here" />}
  //   />
  
  ;
}