import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface UserContextType {
  username?: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;

  correctAnswer: number;
  setCorrectAnswer: Dispatch<SetStateAction<number>>;

  wrongAnswer: number;
  setWrongAnswer: Dispatch<SetStateAction<number>>;

  showAnalytics: boolean;
  setShowAnalytics: Dispatch<SetStateAction<boolean>>;

  resetGame: () => void;
}

export const UserContext = createContext<UserContextType>({
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
