import { Box, Text, createStandaloneToast } from "@chakra-ui/react";
import clsx from "clsx";
import CloseIcon from "../icons/CloseIcon";

export const { toast, ToastContainer } = createStandaloneToast({
  defaultOptions: {
    render: (props) => {
      return (
        <Box
          boxShadow={
            "0px 7px 4px 0px rgba(0, 0, 0, 0.02), 0px 3px 3px 0px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 0px 0px 0px rgba(0, 0, 0, 0.03)"
          }
          className={clsx(
            "px-6 py-4 font-manrope border-l-4 bg-bg-popup relative md:w-[400px]",
            props.status === "success" && "border-success",
            props.status === "error" && "border-error"
          )}
        >
          <Text className="font-semibold mb-1">{props.title}</Text>

          <Text className="text-tertary text-sm">{props.description}</Text>

          <CloseIcon
            onClick={props.onClose}
            className="text-icon hover:text-primary absolute size-5 md:size-6 top-1 md:top-4 right-2 md:right-6 cursor-pointer transition-colors"
          />
        </Box>
      );
    },
    position: "top-right",
    containerStyle: {
      mt: { base: "16px", md: "24px" },
      mr: { base: 0, md: "24px" }
    }
  }
});
