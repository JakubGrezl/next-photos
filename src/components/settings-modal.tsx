"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  NextUIProvider,
  DatePicker,
} from "@nextui-org/react";
import Divider from "@mui/material/Divider";

import SettingsIcon from "@mui/icons-material/Settings";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { MetadataChange } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Prisma from "@prisma/client";
import { updateExifData } from "@/actions/uploadExifData";
import { ZonedDateTime, getLocalTimeZone, now } from "@internationalized/date";

export default function App(props: {
  exif: Prisma.Metadata;
  title?: string | null;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [date, setDate] = useState<ZonedDateTime | null>(null);

  const form = useForm<z.infer<typeof MetadataChange>>({
    resolver: zodResolver(MetadataChange),
  });

  async function onSubmit(values: z.infer<typeof MetadataChange>) {
    startTransition(() => {
      updateExifData(props.exif.photoId, values).then((result) => {
        if (result) {
          if (result?.error) {
            setError("Invalid fields");
          }
          if (result?.success) {
            onClose();
          }
        }
      });
    });
  }

  return (
    <>
      <NextUIProvider>
        <button onClick={onOpen}>
          <SettingsIcon />
        </button>
        <Modal
          size="3xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="custom-shadow"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Change photo
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row">
                    <div className="w-full">
                      {error && (
                        <p className="error form-annoucment">{error}</p>
                      )}
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-row gap-4 w-full"
                      >
                        <div className="flex gap-2 flex-col w-1/2">
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              id="title"
                              disabled={isPending}
                              placeholder={props.title ?? ""}
                              {...form.register("title")}
                            />
                          </div>
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="flash">flash</label>
                            <input
                              type="text"
                              id="flash"
                              disabled={isPending}
                              placeholder={props.exif.flash ?? ""}
                              {...form.register("flash")}
                            />
                          </div>
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="camera">
                              Which camera did you used?
                            </label>
                            <input
                              type="text"
                              id="camera"
                              disabled={isPending}
                              placeholder={props.exif.camera ?? ""}
                              {...form.register("camera")}
                            />
                          </div>
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="lens">
                              Which lens did you used?
                            </label>
                            <input
                              type="text"
                              id="lens"
                              disabled={isPending}
                              placeholder={props.exif.lens ?? ""}
                              {...form.register("lens")}
                            />
                          </div>

                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="editedIn">
                              Which program did you used for editing?
                            </label>
                            <input
                              type="text"
                              id="editedIn"
                              disabled={isPending}
                              placeholder={props.exif.editedIn ?? ""}
                              {...form.register("editedIn")}
                            />
                          </div>

                          <div
                            className={cn({
                              "input-wrapper": false,
                              disabled: isPending,
                            })}
                          >
                            <DatePicker
                              granularity="second"
                              label="When did you take the photo?"
                              className="border-none"
                              placeholderValue={now(getLocalTimeZone())}
                              onChange={setDate}
                            />
                          </div>
                        </div>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <div className="flex gap-2 flex-col flex-grow w-1/2">
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="shutterSpeed">
                              shutter speed (just number)
                            </label>
                            <input
                              type="text"
                              id="shutterSpeed"
                              disabled={isPending}
                              placeholder={props.exif.exposure ?? ""}
                              {...form.register("exposure")}
                            />
                          </div>
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="iso">ISO</label>
                            <input
                              type="text"
                              id="iso"
                              disabled={isPending}
                              placeholder={props.exif.iso?.toString() ?? ""}
                              {...form.register("iso")}
                            />
                          </div>

                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="focalLength">focal length</label>
                            <input
                              type="text"
                              id="focalLength"
                              disabled={isPending}
                              placeholder={
                                formatFocalLength(props.exif.focalLength) ?? ""
                              }
                              {...form.register("focalLength")}
                            />
                          </div>
                          <div
                            className={cn({
                              "input-wrapper": true,
                              disabled: isPending,
                            })}
                          >
                            <label htmlFor="whiteBalance">white balance</label>
                            <input
                              type="text"
                              id="whiteBalance"
                              disabled={isPending}
                              placeholder={props.exif.whiteBalance ?? ""}
                              {...form.register("whiteBalance")}
                            />
                          </div>
                          <div className="flex flex-row gap-2">
                            <div
                              className={cn({
                                "input-wrapper": true,
                                "w-1/2": true,
                                disabled: isPending,
                              })}
                            >
                              <label htmlFor="longitude">longitude</label>
                              <input
                                type="text"
                                id="longitude"
                                disabled={isPending}
                                placeholder={
                                  props.exif.longitude?.toString() ?? ""
                                }
                                {...form.register("longitude")}
                              />
                            </div>
                            <div
                              className={cn({
                                "input-wrapper": true,
                                "w-1/2": true,
                                disabled: isPending,
                              })}
                            >
                              <label htmlFor="latitude">latitude</label>
                              <input
                                type="text"
                                id="latitude"
                                disabled={isPending}
                                placeholder={
                                  props.exif.latitude?.toString() ?? ""
                                }
                                {...form.register("latitude")}
                              />
                            </div>
                          </div>
                          <input
                            type="submit"
                            className={cn({
                              "submit-button": true,
                              disabled: isPending,
                            })}
                            value="Upload"
                            disabled={isPending}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </NextUIProvider>
    </>
  );
}

const formatFocalLength = (focalLength?: number | null) =>
  focalLength ? `${focalLength}mm` : undefined;

const formatAperture = (aperture?: number | null) =>
  aperture ? `ƒ/${aperture}` : undefined;
