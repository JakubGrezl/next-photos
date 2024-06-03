import React from "react";
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
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="button">
      <div>{props.children}</div>
    </div>
  );
}
