import { useTrackerContext, type TrackerClient } from "../../../../../context";
import type { Difficulty, NeededHelp } from "../../../../../types/common";

const MINUTES_TAKEN_REGEX = new RegExp("(\\d+)h(\\d{1,2})m");

export async function recordCodingAttempt(
  client: TrackerClient,
  rawFormData: {
    problemName: string;
    difficulty: Difficulty;
    neededHelp: NeededHelp;
    time: string;
    minutesTaken: string;
    tags: string;
    url: string | null;
    notes: string | null;
  },
): Promise<void> {
  const {
    problemName: problem,
    difficulty,
    neededHelp,
    url,
    notes,
    time,
  } = rawFormData;

  const [_, hours, mins] = rawFormData.minutesTaken.match(
    MINUTES_TAKEN_REGEX,
  ) as RegExpMatchArray;

  console.log(`RAW TAGS: '${rawFormData.tags}'`);
  const tags = JSON.parse(rawFormData.tags) as string[];

  const response = await client.POST("/v1/record-coding-attempt", {
    body: {
      problem,
      difficulty,
      needed_help: neededHelp,
      minutes_taken: Number(mins) + Number(hours) * 60,
      tags,
      url,
      notes,
      time,
    },
  });

  if (response.error) {
    throw new Error(response.error as string);
  }
}
