import { Autocomplete, TextField } from "@mui/material";
import { SingleAutocomplete } from "../../../common/SingleAutocomplete";
import { useTrackerContext } from "../../../../context";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";

export function CodingProblemAutocomplete() {
  const { client } = useTrackerContext();

  // client.GET("/v1/get-record-coding-attempt-data");
  const { problems } = useGetRecordCodingAttemptData();

  return (
    <SingleAutocomplete
      allOptions={problems}
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
  );
}
