import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultsPage from "../app/results/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    query: {},
    asPath: "",
  }),
}));

it("expects render", () => {
  render(<ResultsPage />);

  const headingCheck = screen.getByText("Hello again");
  const correctCheck = screen.getByText("Correct answers:");
  const wrongCheck = screen.getByText("Wrong answers:");

  expect(headingCheck).toBeInTheDocument();
  expect(correctCheck).toBeInTheDocument();
  expect(wrongCheck).toBeInTheDocument();
});
