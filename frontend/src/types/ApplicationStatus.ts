export const ApplicationStatusVariants =
  [ "unstarted"
  , "rejected"
  , "pendingMe"
  , "pendingThem"
  , "offer"] as const;

  export type ApplicationStatus = typeof ApplicationStatusVariants[number];