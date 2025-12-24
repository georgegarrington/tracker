import { Button, Divider, Stack } from "@mui/material";
import { HashChip } from "../../common/HashChip";
import { SingleAutocomplete } from "../../common/SingleAutocomplete";
import { useTrackerContext } from "../../../context";
import { useState, useMemo, useCallback } from "react";

export function CodingTagManager({
  tag,
  tagProblems,
  problems,
  problemsToTags,
}: {
  tag: string;
  tagProblems: string[];
  problems: string[];
  problemsToTags: Record<string, string[]>;
}) {
  const { client } = useTrackerContext();

  // Filter problems to only those that have this tag
  const problemsForTag = useMemo(
    () => problems.filter((problem) => problemsToTags[problem]?.includes(tag)),
    [problems, problemsToTags, tag],
  );

  // Track the current selections (5 slots)
  const initialSlots = useMemo(
    () => [...tagProblems, "", "", "", "", ""].slice(0, 5),
    [tagProblems],
  );
  const [selections, setSelections] = useState<string[]>(initialSlots);

  // Calculate whether there are changes
  const hasChanges = useMemo(() => {
    const originalSet = new Set(tagProblems);
    const currentSet = new Set(selections.filter((s) => s !== ""));

    if (originalSet.size !== currentSet.size) return true;
    for (const item of originalSet) {
      if (!currentSet.has(item)) return true;
    }
    return false;
  }, [tagProblems, selections]);

  // Calculate the delta (added and removed classics)
  const getDelta = useCallback(() => {
    const originalSet = new Set(tagProblems);
    const currentSet = new Set(selections.filter((s) => s !== ""));

    const added: string[] = [];
    const removed: string[] = [];

    // Find added items
    for (const item of currentSet) {
      if (!originalSet.has(item)) {
        added.push(item);
      }
    }

    // Find removed items
    for (const item of originalSet) {
      if (!currentSet.has(item)) {
        removed.push(item);
      }
    }

    return { added, removed };
  }, [tagProblems, selections]);

  const handleSubmit = async () => {
    const { added, removed } = getDelta();

    try {
      await client.POST("/v1/update-coding-tag-classics", {
        body: {
          tag,
          added_classics: added,
          removed_classics: removed,
        },
      });
      // Optionally reload the page or update state to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Failed to update tag classics:", error);
    }
  };

  const updateSelection = (index: number) => (value: string) => {
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections[index] = value;
      return newSelections;
    });
  };

  // Get available options for a specific slot (excluding already selected problems in other slots)
  const getAvailableOptions = (currentIndex: number) => {
    const selectedInOtherSlots = new Set(
      selections.filter((s, i) => s !== "" && i !== currentIndex),
    );
    return problemsForTag.filter((p) => !selectedInOtherSlots.has(p));
  };

  return (
    <Stack
      direction="column"
      sx={{ backgroundColor: "background.paper", alignItems: "start", p: 1 }}
    >
      <HashChip value={tag} />
      <Divider sx={{ mb: 2 }} />
      {selections.map((problem, index) => (
        <SingleAutocomplete
          key={`${tag}#${index + 1}`}
          freeSolo={false}
          allOptions={getAvailableOptions(index)}
          formName={`${tag}#${index + 1}`}
          label={`Classic problem ${index + 1}`}
          value={problem}
          onSelectionChange={updateSelection(index)}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        disabled={!hasChanges}
        onClick={handleSubmit}
        sx={{ mt: 2, alignSelf: "flex-end" }}
      >
        Save Changes
      </Button>
    </Stack>
  );
}
