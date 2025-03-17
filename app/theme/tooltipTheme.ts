import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: 0,
  color: "hsl(var(--secondary))",
  fontSize: "12px",
  p: 3,
  lineHeight: 1.5,
  border: "1px solid hsl(var(--line))",
  fontFamily: "var(--font-manrope)",
  bgColor: "hsl(var(--bg-popup))"
});

export const tooltipTheme = defineStyleConfig({ baseStyle });
