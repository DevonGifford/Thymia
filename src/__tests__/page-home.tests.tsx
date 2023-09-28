import Home from "@/app/page"
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"


it("expects render", () => {
    const {getByText} = render(<Home />)

    const test = screen.getByText("Welcome to the 2-back game");

    expect(test).toBeInTheDocument();
})