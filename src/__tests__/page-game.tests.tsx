import "@testing-library/jest-dom";
import { customRender } from "./test-utils";
import { act, screen } from "@testing-library/react";
import GamePage from "../app/game/page";

const mockRouteChange = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
    push: mockRouteChange,
  }),
}));

jest.useFakeTimers();

const validLetters = ["A", "B", "C", "D", "X", "Z"];

it("Verifies the rendering of critical UI elements", () => {
  //Assemble
  customRender(<GamePage />);

  const navLogo = screen.getByText("Two-back");
  const navLinks = screen.getByText("by Devon Gifford");
  const heading = screen.getByText(/your test is starting/i);
  const instructionsCheck = screen.getByText(
    /if you recognize this image from two images ago/i,
  );
  const basicGameCheck = screen.getByText("You have 3 chances left");
  const buttonCheck = screen.getByText(/wait/i);

  //Assert
  expect(navLogo).toBeInTheDocument();
  expect(navLinks).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(instructionsCheck).toBeInTheDocument();
  expect(basicGameCheck).toBeInTheDocument();
  expect(buttonCheck).toBeInTheDocument();
});

describe("Quiz Screen Rendering", () => {
  it("should display valid quiz letter in first interval", () => {
    //Assemble
    customRender(<GamePage />);
    const visualStimuli = screen.queryByTestId("visual-stimuli");
    const letter = visualStimuli?.textContent?.trim();

    // Assert - letter is one of the valid letters
    if (letter && validLetters.includes(letter)) {
      expect(validLetters).toContain(letter);
    } else {
      throw new Error(
        "Visual stimuli not found or contains an invalid letter.",
      );
    }
  });

  it("should display default number of questions & tries remaining on first interval", () => {
    //Assemble
    customRender(<GamePage />);

    expect(screen.getByText(/You have 3 chances left/i)).toBeInTheDocument();
    expect(screen.getByText(/14 questions remaining/i)).toBeInTheDocument();
  });

  it("FLAKEY - should display quiz letter after the first interval", () => {
    //Assemble
    customRender(<GamePage />);
    const visualStimuli = screen.queryByTestId("visual-stimuli");
    const firstLetter = visualStimuli?.textContent?.trim();

    // Fast-forward time by 2500ms (to simulate the first interval)
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    const secondLetter = visualStimuli?.textContent?.trim();

    // Assert
    expect(visualStimuli).toBeInTheDocument();
    expect(screen.getByText(/13 questions remaining/i)).toBeInTheDocument(); // ensure question remaining decreases
    expect(secondLetter).not.toBe(firstLetter); // ensure visual stimuli changed
  });
});
