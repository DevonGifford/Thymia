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
  correctAnswer: 0,
  setCorrectAnswer: () => null,
  wrongAnswer: 0,
  setWrongAnswer: () => null,
  showAnalytics: false,
  setShowAnalytics: () => null,
  resetGame: () => null,
};

interface TestProviderProps {
  children: React.ReactNode;
  injectedState?: Partial<UserContextType>;
}

const AllTheProviders = ({ children, injectedState }: TestProviderProps ) => {
  
  const mockStateValues: UserContextType = {
    ...mockDefaultValues,
    ...injectedState
  }

  return (
    <UserContextProvider defaultValues={mockStateValues}>
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
  options?: Omit<RenderOptions, "wrapper"> & { injectedState?: Partial<UserContextType> }
) => render(ui, { wrapper: (props) => <AllTheProviders {...props} injectedState={options?.injectedState} />, ...options });


export * from "@testing-library/react";
