import { Autocomplete, TextField } from "@mui/material";
import { SingleAutocomplete } from "../../../common/SingleAutocomplete";
import { useTrackerContext } from "../../../../context";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import type { UseStateSetter } from "../../../../types/common";

export function CodingProblemAutocomplete({
  problems,
  setCodingProblem,
}: {
  problems: string[];
  setCodingProblem: UseStateSetter<string>;
}) {
  // const { client } = useTrackerContext();

  // client.GET("/v1/get-record-coding-attempt-data");
  // const { problems } = useGetRecordCodingAttemptData();

  return (
    <SingleAutocomplete
      formName="problemName"
      allOptions={problems}
      label="Problem name"
      placeholder="Type problem name here"
      noOptionsText="New coding problem!"
      setSelection={setCodingProblem}
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
