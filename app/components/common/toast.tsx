import { Box, Text, createStandaloneToast } from "@chakra-ui/react";
import clsx from "clsx";
import CloseIcon from "../icons/CloseIcon";

export const { toast, ToastContainer } = createStandaloneToast({
  defaultOptions: {
    render: (props) => {
      return (
        <div className="relative">
          <Box
            className={clsx(
              "pr-8 w-fit gap-4 right-0 min-w-[200px] pl-6 py-3 font-manrope border-l-[6px] bg-white text-black absolute flex justify-between items-center",
              props.status === "success" && "border-[#E8FF59]",
              props.status === "error" && "border-[#D6BEF2]"
            )}
          >
            <Text className="font-semibold text-xs">{props.title}</Text>

            {/* <Text className="text-tertary text-xs">{props.description}</Text> */}

            <CloseIcon
              onClick={props.onClose}
              className="text-icon size-4 cursor-pointer transition-colors"
            />
          </Box>
        </div>
      );
    },
    position: "top-right",
    containerStyle: {
      mt: "123px"
    }
  }
});
