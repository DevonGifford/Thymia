import { useRouter } from "next/navigation";
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

// 👇 Custom hook to work with the UserContext
export function useUserContext() {
  const user = useContext(UserContext);
  const router = useRouter();

  // if (user.username === undefined) {
  //   router.push("./");
  //   // throw new Error("useUserContext must be used with a user - the user is currently undefined")
  // }

  return user;
}
