import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import GamePage from "../app/game/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
  }),
}));

it.only("expects render", () => {
  render(<GamePage />);

  const headingCheck = screen.getByText("Your test is starting");
  const instructionCheck = screen.getByText(
    "Click below if you have seen this image in the most recent 2 images:",
  );
  const gameCheck = screen.getByText("You have 2 chances left");
  const buttonCheck = screen.getByText("Seen it 👀");

  expect(headingCheck).toBeInTheDocument();
  expect(instructionCheck).toBeInTheDocument();
  expect(gameCheck).toBeInTheDocument();
  expect(buttonCheck).toBeInTheDocument();
});
