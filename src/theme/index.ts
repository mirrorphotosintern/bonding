// Try This theme — a bright family field deck.

export const colors = {
  background: "#F2F1E8",
  surface: "#FFFDF7",
  surfaceWarm: "#E7E5D8",
  border: "#D7D4C5",

  text: "#18223B",
  textSecondary: "#536078",
  textTertiary: "#868B92",

  cobalt: "#3157D5",
  cobaltDark: "#22398D",
  sun: "#FFD452",
  coral: "#FF6B5E",
  mint: "#69D3A7",
  lavender: "#A88BE8",

  make: "#FF6B5E",
  move: "#36A56B",
  think: "#3157D5",
  talk: "#A88BE8",
  help: "#D49213",
  perform: "#E64268",

  primary: "#3157D5",
  primaryLight: "#DDE5FF",
  accent: "#23845A",
  accentLight: "#DDF5E9",
  warning: "#D49213",
  warningLight: "#FFF0BF",
  danger: "#C93449",
  dangerLight: "#FFE0E4",
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
    case "make": return "#FFE0D8";
    case "move": return "#DDF5E9";
    case "think": return "#DDE5FF";
    case "talk": return "#ECE3FF";
    case "help": return "#FFF0BF";
    case "perform": return "#FFE0E9";
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
