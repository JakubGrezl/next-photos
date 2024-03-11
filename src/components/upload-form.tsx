"use client";

import "@/styles/form.css";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/schema";
import { r2upload } from "@/actions/r2-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const Form = (onClose?: any) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof FileUpload>>({
    resolver: zodResolver(FileUpload),
    defaultValues: {
      title: "no title:(",
    },
  });

  async function onSubmit(values: z.infer<typeof FileUpload>) {
    const formData = new FormData();
    formData.append("title", values.title!);
    formData.append("file", file!);

    startTransition(() => {
      r2upload(formData).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
          if (onClose) {
            setTimeout(onClose, 5000);
          }
        }
      });
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  return (
    <div className="form-wrapper centered-from-header">
      <h1>Upload</h1>
      {error && <p className="error form-annoucment">{error}</p>}
      {form.formState.errors.file?.message && (
        <p className="error form-annoucment">
          {form.formState.errors.file?.message.toString()}
        </p>
      )}
      {success && <p className="success form-annoucment">{success}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            disabled={isPending}
            {...form.register("title")}
          />
        </div>
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
          <label htmlFor="file">File</label>
          <input
            type="file"
            accept="image/*"
            id="file"
            required
            disabled={isPending}
            onChange={handleFileChange} // Update the file state
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
