import React, { ReactElement } from "react";
import UserContextProvider, {
  UserContextType,
} from "../contexts/UserContextProvider";
import { render, RenderOptions } from "@testing-library/react";
import NavBar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const mockStateValues: UserContextType = {
  setUsername: () => {},
  setCorrectAnswer: () => {},
  setWrongAnswer: () => {},
  setShowAnalytics: () => {},
  resetGame: () => {},
  username: "",
  correctAnswer: 10,
  wrongAnswer: 5,
  showAnalytics: false,
};

const AllTheProviders = ({
  children,
  customStateValues,
}: {
  children: React.ReactNode;
  customStateValues?: Partial<UserContextType>;
}) => {
  const ToasterProvider = () => {
    return (
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
    );
  };

  const mergedOptions = {
    ...mockStateValues,
    ...customStateValues,
  } as UserContextType;

  return (
    <UserContextProvider {...mergedOptions}>
      <ToasterProvider />
      <NavBar />
      {children}
    </UserContextProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    customStateValues?: Partial<UserContextType>;
  },
) => {
  const { customStateValues, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} customStateValues={customStateValues} />
    ),
    ...renderOptions,
  });
};

export * from "@testing-library/react";
