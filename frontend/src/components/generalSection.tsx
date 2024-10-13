import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";

interface IGeneralSection {
  title: string;
  image: StaticImageData;
  imagePosition?: "right" | "left";
  children: ReactNode;
}

export default function GeneralSection({
  title,
  image,
  imagePosition = "right",
  children,
}: IGeneralSection) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-10 text-primary-foreground">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex w-full items-center justify-center gap-24">
        <div
          className={`flex w-1/2 ${imagePosition === "right" ? "justify-end" : "justify-start"} text-justify`}
        >
          {children}
        </div>
        <div
          className={`flex w-1/2 items-center justify-center ${imagePosition === "right" ? "order-last" : "order-first"}`}
        >
          <Image src={image} alt="" className="max-h-[30rem] object-contain" />
        </div>
      </div>
    </div>
  );
}
