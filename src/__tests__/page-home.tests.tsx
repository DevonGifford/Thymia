import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";
import { customRender } from "./test-utils";

const mockRouteChange = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
    push: mockRouteChange,
  }),
}));

it("Verifies the rendering of critical UI elements", () => {
  //Assemble
  customRender(<Home />);

  const navLogo = screen.getByText("Two-back");
  const navLinks = screen.getByText("by Devon Gifford");
  const heading = screen.getByText(/a cognitive training exercise/i);
  const instructions = screen.getByText("How to play?");
  const toggleLogButton = screen.getByText("Show event logs?");

  expect(navLogo).toBeInTheDocument();
  expect(navLinks).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(instructions).toBeInTheDocument();
  expect(toggleLogButton).toBeInTheDocument();
});

describe("Form Submission Tests", () => {
  //NOTE: this test is causing console logs that I dont understand.
  it("Valid Username - triggers route change to game page ", async () => {
    //Assemble
    customRender(<Home />);
    const input = screen.getByRole("textbox");
    const submitbutton = screen.getByRole("button", { name: "Start The Game" });
    // Act
    await userEvent.click(input);
    await userEvent.keyboard("validusername");
    // Assert
    expect(input).toHaveValue("validusername");
    //Act
    await userEvent.click(submitbutton);
    // Assert
    expect(mockRouteChange).toHaveBeenCalledWith("/game");
  });

  it("Empty Username, displays error message", async () => {
    //Assemble
    customRender(<Home />);
    const input = screen.getByRole("textbox");
    const submitbutton = screen.getByRole("button", { name: "Start The Game" });
    // Act
    await userEvent.click(input);
    await userEvent.click(submitbutton);
    // Assert
    const errorMessage = screen.getByText(/username is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("Short Username, displays an error message", async () => {
    //Assemble
    customRender(<Home />);
    const input = screen.getByRole("textbox");
    const submitbutton = screen.getByRole("button", { name: "Start The Game" });
    // Act
    await userEvent.click(input);
    await userEvent.keyboard("no");
    // Assert
    expect(input).toHaveValue("no");
    //Act
    await userEvent.click(submitbutton);
    // Assert
    const errorMessage = screen.getByText(/username is too short/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("Long Username, displays an error message", async () => {
    //Assemble
    customRender(<Home />);
    const input = screen.getByRole("textbox");
    const submitbutton = screen.getByRole("button", { name: "Start The Game" });
    // Act
    await userEvent.click(input);
    await userEvent.keyboard("ThisUserNameIsTooLong");
    // Assert
    expect(input).toHaveValue("ThisUserNameIsTooLong");
    //Act
    await userEvent.click(submitbutton);
    // Assert
    const errorMessage = screen.getByText(/username is too long/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

// NOTE: need to further research the reason this is required ...
window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

describe("Toggle Event Logs Test", () => {
  it("Toggle on, results in toast ", async () => {
    //Assemble
    customRender(<Home />);
    const toggleLogCheckbox = screen.getByRole("checkbox");
    expect(toggleLogCheckbox).not.toBeChecked();

    // Act
    await userEvent.click(toggleLogCheckbox);
    expect(toggleLogCheckbox).toBeChecked();

    // Assert
    await waitFor(() => {
      const toastNotification = screen.getByText(/Event Logs: ON/i);
      expect(toastNotification).toBeInTheDocument();
    });
  });

  it("Toggle off, results in correct toast", async () => {
    //Assemble
    customRender(<Home />);
    const toggleLogCheckbox = screen.getByRole("checkbox");
    expect(toggleLogCheckbox).not.toBeChecked();

    // Act
    await userEvent.click(toggleLogCheckbox);
    expect(toggleLogCheckbox).toBeChecked();
    await userEvent.click(toggleLogCheckbox);
    expect(toggleLogCheckbox).not.toBeChecked();

    // Assert
    await waitFor(() => {
      const toastNotification = screen.getByText(/Event Logs: OFF/i);
      expect(toastNotification).toBeInTheDocument();
    });
  });
});
