"use client";

import React, { ReactNode, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

interface ProviderProps {
  children: ReactNode;
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
    router.push('/game')

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


// 🎯  MERGE THIS WITH CONTEXT