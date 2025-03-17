import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  label: {
    fontSize: "14px",
    color: "hsl(var(--primary))",
    fontFamily: "var(--font-manrope)"
  },
  control: {
    boxSize: "18px",
    border: "2px solid",
    borderColor: "hsl(var(--line))",
    rounded: "2px",
    _checked: {
      bgColor: "hsl(var(--primary-blue))",
      color: "hsl(var(--primary))",
      borderColor: "hsl(var(--primary-blue))",
      _hover: {
        bgColor: "hsl(var(--primary-blue))",
        borderColor: "hsl(var(--primary-blue))"
      }
    }
  }
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
