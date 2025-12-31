import { Box, Typography, Stack, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useMemo, useState } from "react";
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

type TimeRange = "lastMonth" | "lastYear" | "allTime";

const getTimeRangeStart = (range: TimeRange): Date | null => {
  const now = new Date();
  switch (range) {
    case "lastMonth":
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case "lastYear":
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    case "allTime":
      return null;
  }
};

const formatTickForRange = (timestamp: string, range: TimeRange): string => {
  const date = new Date(timestamp);
  switch (range) {
    case "lastMonth":
      // Show day and month for last month view
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    case "lastYear":
    case "allTime":
      // Show month and year for longer ranges
      return date.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
  }
};

const getTickInterval = (dataLength: number, range: TimeRange): number => {
  switch (range) {
    case "lastMonth":
      // Aim for ~4 ticks (weekly)
      return Math.max(1, Math.floor(dataLength / 4));
    case "lastYear":
      // Aim for ~12 ticks (monthly)
      return Math.max(1, Math.floor(dataLength / 12));
    case "allTime":
      // Aim for reasonable monthly intervals
      return Math.max(1, Math.floor(dataLength / 12));
  }
};

export default function CodingAnalytics() {
  const { dataByTag } = useGetProficiencyOverTime();
  const [cacheTrigger, toggleCacheTrigger] = useToggle();
  const [timeRange, setTimeRange] = useState<TimeRange>("lastMonth");

  const hiddenTags = useMemo(() => {
    const stored = localStorage.getItem("codingAnalytics.hiddenTags");
    return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  }, [cacheTrigger]);

  const tags = useMemo(() => Object.keys(dataByTag), [dataByTag]);

  // Transform data for Recharts: array of objects with timestamp and proficiency per tag
  const chartData = useMemo(() => {
    const rangeStart = getTimeRangeStart(timeRange);

    // Collect all unique timestamps across all tags, filtered by time range
    const timestampSet = new Set<string>();
    for (const tag of tags) {
      for (const point of dataByTag[tag] || []) {
        const pointDate = new Date(point.attempt_time);
        if (!rangeStart || pointDate >= rangeStart) {
          timestampSet.add(point.attempt_time);
        }
      }
    }

    // Sort timestamps chronologically
    const sortedTimestamps = Array.from(timestampSet).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    // Build chart data: for each timestamp, include each tag's proficiency at that point
    // We need to carry forward the last known value for each tag
    // First, compute the last known value BEFORE the time range for each tag
    const lastKnownValues: Record<string, number> = {};
    for (const tag of tags) {
      const tagData = dataByTag[tag] || [];
      for (const point of tagData) {
        const pointDate = new Date(point.attempt_time);
        if (rangeStart && pointDate < rangeStart) {
          lastKnownValues[tag] = point.proficiency;
        } else {
          break;
        }
      }
    }

    const tagIndices: Record<string, number> = {};
    for (const tag of tags) {
      // Start from the first point in the range
      const tagData = dataByTag[tag] || [];
      tagIndices[tag] = 0;
      if (rangeStart) {
        while (
          tagIndices[tag] < tagData.length &&
          new Date(tagData[tagIndices[tag]].attempt_time) < rangeStart
        ) {
          tagIndices[tag]++;
        }
      }
    }

    return sortedTimestamps.map((timestamp) => {
      const dataPoint: Record<string, string | number> = {
        timestamp,
        displayTime: formatTickForRange(timestamp, timeRange),
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
  }, [dataByTag, tags, timeRange]);

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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Proficiency Over Time</Typography>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(_, value) => value && setTimeRange(value)}
          size="small"
        >
          <ToggleButton value="lastMonth">Last Month</ToggleButton>
          <ToggleButton value="lastYear">Last Year</ToggleButton>
          <ToggleButton value="allTime">All Time</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ width: "100%", height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDataWithAverage}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              interval={getTickInterval(chartDataWithAverage.length, timeRange)}
              tickFormatter={(timestamp) => formatTickForRange(timestamp, timeRange)}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value) => typeof value === "number" ? `${(value * 100).toFixed(1)}%` : value}
              labelFormatter={(timestamp) => `Date: ${new Date(timestamp).toLocaleDateString()}`}
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
