import React from "react";
import { cn } from "@/lib/utils";
import "@/styles/card.css";

export function TextCard(props: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`card-wrapper ${props.className ?? ""}`}>
      <div className="title">{props.title}</div>
      <div className="value">{props.children}</div>
    </div>
  );
}

export function ButtonCard(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("button !text-xs !font-bold", props.className)}>
      <div>{props.children}</div>
    </div>
  );
}
