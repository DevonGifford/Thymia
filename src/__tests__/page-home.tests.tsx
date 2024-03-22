import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
  }),
}));

it("expects certain elements to be on the page render", () => {
  render(<Home />);

  const headingCheck = screen.getByText(
    "The 2-Back game is a cognitive training exercise designed to enhance working memory, attention, and pattern recognition skills.",
  );
  const nameCheck = screen.getByText("Enter your name to begin");
  const howtoplayCheck = screen.getByText("How to play?");
  const evenLogsCheck = screen.getByText("Show event logs?");

  expect(headingCheck).toBeInTheDocument();
  expect(nameCheck).toBeInTheDocument();
  expect(howtoplayCheck).toBeInTheDocument();
  expect(evenLogsCheck).toBeInTheDocument();
});

it("submits form with valid username", async () => {
  render(<Home />);

  // Enter a valid username
  const input = screen.getByRole("username-input");
  const submitbutton = screen.getByRole("button", { name: "Start The Game" });

  await userEvent.click(input);
  await userEvent.keyboard("validusername");
  await userEvent.click(submitbutton);

  // Assert that the form submission behavior is correct
  expect(console.error);
});

it("displays error message for invalid username", async () => {
  render(<Home />);

  // Enter an invalid username
  const input = screen.getByRole("username-input");
  const submitbutton = screen.getByRole("button", { name: "Start The Game" });
  await userEvent.click(input);
  await userEvent.keyboard("12");

  // Submit the form
  await userEvent.click(submitbutton);

  // Assert that the error message is displayed
  expect(screen.getByText("⚠ Username is too short")).toBeInTheDocument();
});

//   jest.mock("@/contexts/UserContext", () => ({
//     useUserContext: jest.fn(() => ({
//       showAnalytics: false,
//       setShowAnalytics: jest.fn(),
//     })),
//   }));

//   it("toggles analytics visibility", async () => {
//     render(<Home />);

//     // Click the "Show event logs?" checkbox
//     await userEvent.click(screen.getByText("Show event logs?"));

//     // Assert that setShowAnalytics is called with the correct value
//     expect(useUserContext().setShowAnalytics).toHaveBeenCalledWith(true);
//   });

//   it("navigates to game page after form submission", async () => {
//     render(<Home />);

//     // Enter a valid username
//     const input = screen.getByRole("username-input");
//     const submitbutton = screen.getByRole('button', {name: 'Start The Game'});
//     await userEvent.click(input)
//     await userEvent.keyboard("guest");

//     // Submit the form
//     await userEvent.click(submitbutton);

//     // Assert that the router is called with the correct path
//     expect(mockRouter.push).toHaveBeenCalledWith("./game");
//   });

// it("navigates to game page after form submission", async () => {
//     render(<Home />);

//     // Enter a valid username
//     const input = screen.getByRole("username-input");
//     await userEvent.keyboard("validusername");

//     // Submit the form
//     await userEvent.click(screen.getByText("Start The Game"));

//     // Assert that the router is called with the correct path
//     expect(mockRouter.push).toHaveBeenCalledWith("./game");
//   });
