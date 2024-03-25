"use client";

import { useRouter } from "next/navigation";
import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export type UserContextType = {
  username?: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  correctAnswer: number;
  setCorrectAnswer: Dispatch<SetStateAction<number>>;
  wrongAnswer: number;
  setWrongAnswer: Dispatch<SetStateAction<number>>;
  showAnalytics: boolean;
  setShowAnalytics: Dispatch<SetStateAction<boolean>>;
  resetGame: () => void;
};

export const defaultContextValues: UserContextType = {
  username: undefined,
  setUsername: () => null,
  correctAnswer: 0,
  setCorrectAnswer: () => null,
  wrongAnswer: 0,
  setWrongAnswer: () => null,
  showAnalytics: false,
  setShowAnalytics: () => null,
  resetGame: () => null,
};

interface UserContextProviderProps {
  children: React.ReactNode;
  defaultValues: UserContextType;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

const UserContextProvider = ({
  children,
  defaultValues,
}: UserContextProviderProps) => {
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>(
    defaultValues.username
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>(
    defaultValues.correctAnswer
  );
  const [wrongAnswer, setWrongAnswer] = useState<number>(
    defaultValues.wrongAnswer
  );
  const [showAnalytics, setShowAnalytics] = useState<boolean>(
    defaultValues.showAnalytics
  );

  const resetGame = () => {
    setCorrectAnswer(0);
    setWrongAnswer(0);
    router.push("/game");
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        correctAnswer,
        setCorrectAnswer,
        wrongAnswer,
        setWrongAnswer,
        showAnalytics,
        setShowAnalytics,
        resetGame,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
