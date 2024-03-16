"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Form from "@/components/upload-form";

import "@/styles/card.css";

export default function UploadModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="button">
        Open Modal
      </button>
      <NextUIProvider>
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
