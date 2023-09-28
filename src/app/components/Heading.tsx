import React from "react";

interface HeadinProps {
  headingBlack: string;
  headingColor: string | undefined;
  subHeadingBlack: string;
  subHeadingColor: string;
}

export default function Heading({
  headingBlack,
  headingColor,
  subHeadingBlack,
  subHeadingColor,
}: HeadinProps) {
  return (
    <header className="flex flex-col w-full max-w-5xl text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold pb-2">
        {headingBlack}{" "}
        <span className=" text-thymia-purple">{headingColor}</span>
      </h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold italic">
        {subHeadingBlack}{" "}
        <span className=" text-thymia-purple">{subHeadingColor}</span>
      </h2>
    </header>
  );
}
