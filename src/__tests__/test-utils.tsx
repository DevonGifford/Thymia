import React, { ReactElement } from "react";
import UserContextProvider, {
  UserContextType,
} from "../contexts/UserContextProvider";
import { render, RenderOptions } from "@testing-library/react";
import NavBar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const mockDefaultValues: UserContextType = {
  username: "Tester",
  setUsername: () => null,
  correctAnswer: 10,
  setCorrectAnswer: () => null,
  wrongAnswer: 5,
  setWrongAnswer: () => null,
  showAnalytics: false,
  setShowAnalytics: () => null,
  resetGame: () => null,
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider defaultValues={mockDefaultValues}>
      <NavBar />
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#8b69d473",
            color: "#fff",
            display: "flex",
            textAlign: "center",
          },
        }}
      />
    </UserContextProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
