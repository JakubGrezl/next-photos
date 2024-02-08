"use client";

import "@/styles/form.css";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/schema";
import { upload } from "@/actions/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof FileUpload>>({
    resolver: zodResolver(FileUpload),
  });

  /*

  const onSubmit = async (values: z.infer<typeof FileUpload>) => {
    const file = values.file as File;

    console.log(file);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    values.buffer = buffer;

    console.log(values.buffer);

    startTransition(async () => {
      upload(values);
    });
  };

  */

  async function onSubmit(formData: FormData) {
    const file = formData.get("file");
    const title = formData.get("title");

    if (!(file instanceof File)) {
      setError("No file selected");
      return;
    }

    if (!title) {
      setError("No title");
      return;
    }

    const type = file.type;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    startTransition(async () => {
      upload({
        title: title as string,
        buffer: buffer as Uint8Array,
        type: type as string,
      });
    });
  }

  return (
    <div className="form-wrapper centered-from-header">
      <h1>Upload</h1>
      {error && <p className="error">{error}</p>}
      <form action={onSubmit}>
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            disabled={isPending}
            // spreading => atributy se přidají do input
            // {...form.register("title")}
          />
        </div>
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            disabled={isPending}
            // spreading => atributy se přidají do input
            // {...form.register("file")}
          />
        </div>
        <input
          type="submit"
          className="submit-button"
          value="Upload"
          disabled={isPending}
        />
      </form>
    </div>
  );
};

export default Form;
