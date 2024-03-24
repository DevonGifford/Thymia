"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

interface ProviderProps {
  children: ReactNode;
}

import { createContext, Dispatch, SetStateAction, useContext } from "react";

type UserContextType = {
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

const UserContext = createContext<UserContextType>({
  username: undefined,
  setUsername: () => null,
  correctAnswer: 0,
  setCorrectAnswer: () => null,
  wrongAnswer: 0,
  setWrongAnswer: () => null,
  showAnalytics: false,
  setShowAnalytics: () => null,
  resetGame: () => null,
});

export function useUserContext() {
  const user = useContext(UserContext);

  return user;
}

const UserContextProvider = ({ children }: ProviderProps) => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);

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
