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

import { cn } from "@/lib/utils";

import "@/styles/card.css";

export default function UploadModal(props: { className?: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className={cn("button !text-xs !font-bold", props.className)}
      >
        UPLOAD PHOTO
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
                {/* <ModalHeader>Upload</ModalHeader> */}
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
