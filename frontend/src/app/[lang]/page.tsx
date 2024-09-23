import Image from "next/image";
import React from "react";
import homePageImage from "../../../public/home-page.jpg";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="relative h-screen w-full">
      <Image
        src={homePageImage}
        sizes="100w"
        // fill
        alt="Home Page Picture of a man giving holding a microfone giving the news"
        className="object-cover"
        placeholder="blur"
        blurDataURL="/home-page-blured.jpg"
        priority
      />
    </div>
  );
}
