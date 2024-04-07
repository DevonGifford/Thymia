"use client";

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/src/contexts/UserContextProvider";
import { sendAnalyticsEvent } from "@/src/utils/analytics";

import Button from "../../components/Button";
import Heading from "../../components/Heading";

function getNextStimuli(currentStimuli: string): string {
  let newStimuli;
  do {
    const stimuliList = ["A", "B", "C", "X", "Z"];
    const randomIndex = Math.floor(Math.random() * stimuliList.length);
    newStimuli = stimuliList[randomIndex];
  } while (newStimuli === currentStimuli);
  return newStimuli;
}

const buttonStates = {
  Idle: "idle",
  Pending: "pending",
  Correct: "correct",
  Wrong: "wrong",
} as const;

type ButtonState = (typeof buttonStates)[keyof typeof buttonStates];

type State = {
  questionCount: number;
  stimuliHistory: string[];
  currentStimuli: string;
  buttonState: ButtonState;
};

type Action =
  | { type: "SET_NEXT_STIMULI"; payload: string }
  | { type: "INCREMENT_QUESTION_COUNT" }
  | { type: "SET_BUTTON_STATE"; payload: ButtonState };

const initialState: State = {
  questionCount: 1,
  stimuliHistory: [],
  currentStimuli: getNextStimuli(""),
  buttonState: buttonStates.Idle,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NEXT_STIMULI":
      return {
        ...state,
        currentStimuli: action.payload,
        stimuliHistory: [state.currentStimuli, ...state.stimuliHistory],
      };
    case "INCREMENT_QUESTION_COUNT":
      return { ...state, questionCount: state.questionCount + 1 };
    case "SET_BUTTON_STATE":
      return { ...state, buttonState: action.payload };
    default:
      return state;
  }
};

const GamePage = () => {
  const router = useRouter();
  const user = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: "SET_NEXT_STIMULI",
        payload: getNextStimuli(state.currentStimuli),
      });
      dispatch({ type: "INCREMENT_QUESTION_COUNT" });
      dispatch({
        type: "SET_BUTTON_STATE",
        payload:
          state.questionCount < 1 ? buttonStates.Idle : buttonStates.Pending,
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (user.wrongAnswer >= 3 || state.questionCount > 15) {
      sendAnalyticsEvent(user.showAnalytics, "Test completed");
      router.push("/results");
    }
  }, [state, user, router]);

  const handleButtonClick = () => {
    if (
      state.buttonState === buttonStates.Pending &&
      state.currentStimuli === state.stimuliHistory[1]
    ) {
      dispatch({ type: "SET_BUTTON_STATE", payload: buttonStates.Correct });
      user.setCorrectAnswer(user.correctAnswer + 1);
      sendAnalyticsEvent(user.showAnalytics, "Attempt - Correct Answer ✅");
    } else if (state.buttonState === buttonStates.Pending) {
      dispatch({ type: "SET_BUTTON_STATE", payload: buttonStates.Wrong });
      user.setWrongAnswer(user.wrongAnswer + 1);
      sendAnalyticsEvent(user.showAnalytics, "Attempt - Wrong answer ❌");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center h-[90vh]">
      <Heading
        headingBlack="Hello there"
        headingColor={user.username}
        subHeadingBlack="Your test is starting"
        subHeadingColor="right now..."
      />

      <div className="w-full h-[300px] max-w-xl -translate-y-7 sm:translate-y-0">
        <div className="flex flex-col-reverse text-center md:flex-row w-full md:justify-between text-slate-900 text-xs sm:text-sm px-8 translate-y-12">
          <p>You have {3 - user.wrongAnswer} chances left</p>
          <p>{15 - state.questionCount} questions remaining</p>
        </div>
        <div className="flex flex-col h-[300px] justify-center items-center gap-10 text-5xl font-bold text-center border-2 bg-thymia-purple bg-opacity-30 200 rounded-xl">
          <p className=" text-9xl" data-testid="visual-stimuli">
            {state.currentStimuli}
          </p>
        </div>
      </div>

      <footer className="flex flex-col -translate-y-12 sm:translate-y-0 pt-12 md:pt-0">
        <h2 className="sm:mt-4 text-center text-gray-600">
          Click if you recognize this image from two images ago:
        </h2>

        <Button
          text={
            state.buttonState === buttonStates.Pending
              ? "Seen it? 👀"
              : "Wait ✋"
          }
          onClick={handleButtonClick}
          disabled={state.buttonState === buttonStates.Idle}
          answerStatus={
            state.buttonState === buttonStates.Correct
              ? "correct"
              : state.buttonState === buttonStates.Wrong
                ? "wrong"
                : undefined
          }
        />
      </footer>
    </div>
  );
};

export default GamePage;
