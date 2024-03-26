type HeadingProps = {
  headingBlack: string;
  headingColor: string | undefined;
  subHeadingBlack?: string;
  subHeadingColor?: string;
};

export default function Heading({
  headingBlack,
  headingColor,
  subHeadingBlack,
  subHeadingColor,
}: HeadingProps) {
  return (
    <header className="flex flex-col max-w-5xl text-center ">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold pb-2">
        {headingBlack}{" "}
        <span className="text-5xl md:text-6xl lg:text-7xl text-thymia-purple font-thymia-title italic">
          {" "}
          {headingColor}
        </span>
      </h1>
      {subHeadingBlack && (
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {subHeadingBlack}{" "}
          <span className="text-2xl md:text-3xl lg:text-4xl text-thymia-purple font-thymia-title italic">
            {" "}
            {subHeadingColor}
          </span>
        </h2>
      )}
    </header>
  );
}
