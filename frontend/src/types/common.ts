export const DifficultyVariants = ["Easy", "Medium", "Hard"] as const;
export type Difficulty = (typeof DifficultyVariants)[number];
