// Handful theme — "compact family field kit"
// Light-first, tactile, warm paper tones, mode-separated colors

export const colors = {
  // Base paper tones
  background: "#FAF7F2",
  surface: "#FFFFFF",
  surfaceWarm: "#F5F0E8",
  border: "#E0D8CC",

  // Text
  text: "#2D2A26",
  textSecondary: "#6B655D",
  textTertiary: "#9B948A",

  // Mode colors
  make: "#D4652A",    // warm orange — crafting
  move: "#2D8B46",    // field green — physical
  think: "#4A6FA5",   // slate blue — puzzles
  talk: "#8B5E83",    // warm plum — conversation
  help: "#B8860B",    // dark goldenrod — contributing
  perform: "#C73E5A", // warm red — showing off

  // Semantic
  primary: "#D4652A",
  primaryLight: "#F0D4C2",
  accent: "#2D8B46",
  accentLight: "#D4EDDA",
  warning: "#E6A817",
  warningLight: "#FFF3CD",
  danger: "#C73E3E",
  dangerLight: "#F8D7DA",

  // Together Mode
  togetherBg: "#2D2A26",
  togetherText: "#FAF7F2",
  togetherAccent: "#F0D4C2",
} as const;

export const modeColor = (mode: string): string => {
  switch (mode) {
    case "make": return colors.make;
    case "move": return colors.move;
    case "think": return colors.think;
    case "talk": return colors.talk;
    case "help": return colors.help;
    case "perform": return colors.perform;
    default: return colors.primary;
  }
};

export const modeBgColor = (mode: string): string => {
  switch (mode) {
    case "make": return "#FDE8D8";
    case "move": return "#D4EDDA";
    case "think": return "#D6E4F0";
    case "talk": return "#E8D5E0";
    case "help": return "#FFF3CD";
    case "perform": return "#F8D7DE";
    default: return colors.primaryLight;
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  largeTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
  },
  title: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
  },
  headline: {
    fontSize: 17,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 21,
  },
  callout: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: "500" as const,
    lineHeight: 14,
  },
  togetherTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 38,
  },
  togetherBody: {
    fontSize: 20,
    fontWeight: "400" as const,
    lineHeight: 28,
  },
} as const;

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
