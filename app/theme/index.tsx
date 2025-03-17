import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./buttonTheme";
import { checkboxTheme } from "./checkBoxTheme";
import { inputTheme } from "./inputTheme";
import { tooltipTheme } from "./tooltipTheme";

const breakpoints = {
  base: "0px",
  sm: "768px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px"
};

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Input: inputTheme,
    Tooltip: tooltipTheme
  },
  breakpoints
});
