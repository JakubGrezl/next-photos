"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Form from "@/components/upload-form";

export default function UploadModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <NextUIProvider>
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal
          backdrop={"blur"}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Upload</ModalHeader>
                <ModalBody>
                  <Form onClose={onClose} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </NextUIProvider>
    </>
  );
}
