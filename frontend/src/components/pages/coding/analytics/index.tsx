import { Box, Typography, Stack } from "@mui/material";
import { useMemo } from "react";
import { useToggle } from "@mantine/hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetProficiencyOverTime } from "../../../../hooks/endpoint/useGetProficiencyOverTime";

// Categorical color palette optimized for data visualization (distinguishable, colorblind-friendly)
const CHART_COLORS = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // olive
  "#17becf", // cyan
  "#aec7e8", // light blue
  "#ffbb78", // light orange
  "#98df8a", // light green
  "#ff9896", // light red
  "#c5b0d5", // light purple
];

export default function CodingAnalytics() {
  const { dataByTag } = useGetProficiencyOverTime();
  const [cacheTrigger, toggleCacheTrigger] = useToggle();

  const hiddenTags = useMemo(() => {
    const stored = localStorage.getItem("codingAnalytics.hiddenTags");
    return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  }, [cacheTrigger]);

  const tags = useMemo(() => Object.keys(dataByTag), [dataByTag]);

  // Transform data for Recharts: array of objects with timestamp and proficiency per tag
  const chartData = useMemo(() => {
    // Collect all unique timestamps across all tags
    const timestampSet = new Set<string>();
    for (const tag of tags) {
      for (const point of dataByTag[tag] || []) {
        timestampSet.add(point.attempt_time);
      }
    }

    // Sort timestamps chronologically
    const sortedTimestamps = Array.from(timestampSet).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    // Build chart data: for each timestamp, include each tag's proficiency at that point
    // We need to carry forward the last known value for each tag
    const lastKnownValues: Record<string, number> = {};
    const tagIndices: Record<string, number> = {};
    for (const tag of tags) {
      tagIndices[tag] = 0;
    }

    return sortedTimestamps.map((timestamp) => {
      const dataPoint: Record<string, string | number> = {
        timestamp,
        displayTime: new Date(timestamp).toLocaleDateString(),
      };

      for (const tag of tags) {
        const tagData = dataByTag[tag] || [];
        // Find if this timestamp has a value for this tag
        while (
          tagIndices[tag] < tagData.length &&
          tagData[tagIndices[tag]].attempt_time <= timestamp
        ) {
          lastKnownValues[tag] = tagData[tagIndices[tag]].proficiency;
          tagIndices[tag]++;
        }

        if (lastKnownValues[tag] !== undefined) {
          dataPoint[tag] = lastKnownValues[tag];
        }
      }

      return dataPoint;
    });
  }, [dataByTag, tags]);

  // Compute average of visible series at each data point
  const chartDataWithAverage = useMemo(() => {
    return chartData.map((dataPoint) => {
      const visibleValues = tags
        .filter((tag) => !hiddenTags.has(tag) && typeof dataPoint[tag] === "number")
        .map((tag) => dataPoint[tag] as number);

      const average =
        visibleValues.length > 0
          ? visibleValues.reduce((sum, val) => sum + val, 0) / visibleValues.length
          : undefined;

      return {
        ...dataPoint,
        Average: average,
      };
    });
  }, [chartData, tags, hiddenTags]);

  const handleLegendClick = (dataKey: string) => {
    const next = new Set(hiddenTags);
    if (next.has(dataKey)) {
      next.delete(dataKey);
    } else {
      next.add(dataKey);
    }
    localStorage.setItem("codingAnalytics.hiddenTags", JSON.stringify([...next]));
    toggleCacheTrigger();
  };

  if (tags.length === 0) {
    return (
      <Stack sx={{ p: 2 }}>
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      sx={{ p: 2, width: "100%", height: "100%" }}
      gap={2}
    >
      <Typography variant="h5">Proficiency Over Time</Typography>
      <Box sx={{ width: "100%", height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDataWithAverage}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="displayTime"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend
              onClick={(e) => handleLegendClick(e.dataKey as string)}
              wrapperStyle={{ cursor: "pointer" }}
            />
            {tags.map((tag, index) => (
              <Line
                key={tag}
                type="monotone"
                dataKey={tag}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={false}
                hide={hiddenTags.has(tag)}
                connectNulls
              />
            ))}
            <Line
              key="Average"
              type="monotone"
              dataKey="Average"
              stroke="#666666"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              hide={hiddenTags.has("Average")}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Click on a tag in the legend to show/hide it
      </Typography>
    </Stack>
  );
}
