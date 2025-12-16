export const DifficultyVariants = ["Easy", "Medium", "Hard"] as const;
export type Difficulty = (typeof DifficultyVariants)[number];

export const NeededHelpVariants = ["Yes", "No", "Kinda"] as const;
export type NeededHelp = (typeof NeededHelpVariants)[number];
