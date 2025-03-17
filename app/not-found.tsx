import { Center, Image, Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <Center className="flex-col w-full grow max-w-[533px] mx-auto">
      <Image src="/images/404.png" alt="" className="w-[385px] h-[272px]" />
      <h2 className="text-white md:text-2xl text-xl font-orbitron font-extrabold">
        {`Oops! We Can't Find That Page.`}
      </h2>
      <Text
        fontSize={["14px", "16px"]}
        className="text-tertary font-manrope text-center mt-4"
      >
        The page you are looking for might have been moved or deleted. Please
        check the URL you entered
      </Text>
    </Center>
  );
}
