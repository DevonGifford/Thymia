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
    <header className="flex flex-col max-w-5xl text-center gap-2">
      <h1 className="text-4xl font-bold">
        {headingBlack}{" "}
        <span className="text-nowrap text-5xl text-thymia-purple font-thymia-title italic">
          {" "}
          {headingColor}
        </span>
      </h1>
      {subHeadingBlack && (
        <h2 className="hidden md:inline-block text-xl font-semibold">
          {subHeadingBlack}{" "}
          <span className="text-2xl text-thymia-purple font-thymia-title italic">
            {" "}
            {subHeadingColor}
          </span>
        </h2>
      )}
    </header>
  );
}
