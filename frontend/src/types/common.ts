export const DifficultyVariants = ["Easy", "Medium", "Hard"] as const;
export type Difficulty = (typeof DifficultyVariants)[number];

export const NeededHelpVariants = ["No", "Kinda", "Yes"] as const;
export type NeededHelp = (typeof NeededHelpVariants)[number];

export type UseStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
