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

//TEST:
//- expect option 1 to be on screen
//- expect option 2 to be on screen in x seconds
//- expect number of questions remaining
//- expect number of questoins to update on change
//- expect default number of tries remaining
//- expect number of tries to decrease on incorrect answer
//- expect number of tries to remain the same on correct answer
//- expect max incorrect answers = route change
//- expect quiz completeion = route change
//- expect if analytics event is on - toast notifications appear
