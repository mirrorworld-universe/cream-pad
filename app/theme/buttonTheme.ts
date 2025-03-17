import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  bgColor: "hsl(var(--primary-blue))",
  color: "hsl(var(--primary))",
  _hover: {
    opacity: 0.7,
    bgColor: "hsl(var(--primary-blue))"
  },
  _active: {
    opacity: 0.9,
    bgColor: "hsl(var(--primary-blue))"
  }
});

const outline = defineStyle({
  bgColor: "transparent",
  color: "hsl(var(--primary))",
  borderColor: "hsl(var(--line))",
  _hover: {
    bgColor: "hsl(var(--line))"
  },
  _active: {
    bgColor: "hsl(var(--line))"
  }
});

const ghost = defineStyle({
  color: "hsl(var(--tertary))",
  _hover: {
    color: "hsl(var(--primary))",
    bgColor: "transparent"
  },
  _active: {
    color: "hsl(var(--primary))",
    bgColor: "transparent"
  }
});

const baseStyle = {
  borderRadius: 4,
  fontWeight: 600,
  fontFamily: "var(--font-orbitron)"
};

const large = defineStyle({
  fontSize: "16px",
  px: 6,
  h: 12
});
const small = defineStyle({
  fontSize: "14px",
  px: 4,
  h: 8
});

const medium = defineStyle({
  fontSize: "14px",
  h: 10,
  px: 4
});

export const buttonTheme = defineStyleConfig({
  // baseStyle,
  // variants: { solid, outline, ghost },
  // sizes: { large, small, medium }
});
