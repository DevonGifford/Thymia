import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import ResultsPage from "../app/results/page";
import { customRender } from "./test-utils";
import userEvent from "@testing-library/user-event";

const mockRouteChange = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
    push: mockRouteChange,
  }),
}));

test("Verifies the rendering of critical UI elements", () => {
  //Assemble
  customRender(<ResultsPage />);

  const navLogo = screen.getByText("Two-back");
  const navLinks = screen.getByText("by Devon Gifford");
  const heading = screen.getByText(/hello again/i);
  const correctCheck = screen.getByText("Correct answers:");
  const wrongCheck = screen.getByText("Wrong answers:");

  //Assert
  expect(navLogo).toBeInTheDocument();
  expect(navLinks).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(correctCheck).toBeInTheDocument();
  expect(wrongCheck).toBeInTheDocument();
});

test("renders results page with the correct results based on global state", async () => {
  //Assemble
  const customState = {
    username: "testUsername",
    correctAnswer: 10,
    wrongAnswer: 5,
    showAnalytics: true,
  };
  customRender(<ResultsPage />, { injectedState: customState });

  const correctAnswerHeading = screen.getByText(/correct answer/i);
  const correctAnswerCount = screen.getByText("10");
  const incorrectAnswerHeading = screen.getByText(/wrong answer/i);
  const incorrectAnswerCount = screen.getByText("5");

  //Assert
  expect(correctAnswerHeading).toBeInTheDocument();
  expect(correctAnswerCount).toBeInTheDocument();
  expect(incorrectAnswerHeading).toBeInTheDocument();
  expect(incorrectAnswerCount).toBeInTheDocument();
});

test("should restart the quizz after restart button is clicked", async () => {
  //Assemble
  customRender(<ResultsPage />);

  //Act
  const TryAgainButton = screen.getByRole("button");
  await userEvent.click(TryAgainButton);

  //Assert
  expect(mockRouteChange).toHaveBeenCalledWith("/game");
});
