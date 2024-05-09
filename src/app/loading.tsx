"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import Lottie from "react-lottie";
import * as animationData from "../../public/loading.json";

export default function Loading() {
  return (
    <NextUIProvider>
      <Modal backdrop={"blur"} isOpen hideCloseButton>
        <ModalContent>
          <Lottie speed={2.5} options={{ animationData: animationData }} />
        </ModalContent>
      </Modal>
    </NextUIProvider>
  );
}
