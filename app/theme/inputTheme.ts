import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const sonic = definePartsStyle({
  field: {
    border: "1px solid",
    height: "56px",
    borderColor: "hsl(var(--line))",
    background: "transparent",
    borderRadius: "4px",
    fontFamily: "var(--font-manrope)",
    fontWeight: 600,
    transition: "all 0.2s ease-in-out",
    _placeholder: {
      color: "hsl(var(--tertary))"
    },
    _hover: {
      borderColor: "hsl(var(--primary-blue))",
      outline: "3px solid",
      outlineColor: "rgba(0,0,255, 0.3)",
      outlineOffset: "0"
    },
    _invalid: {
      borderColor: "hsl(var(--error))",
      outline: "none"
    }
  }
});

export const inputTheme = defineMultiStyleConfig({
  variants: { sonic }
});
