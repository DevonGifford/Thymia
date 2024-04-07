"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/src/contexts/UserContextProvider";
import { sendAnalyticsEvent } from "@/src/utils/analytics";

import Button from "../../components/Button";
import Heading from "../../components/Heading";

enum ButtonState {
  Idle = "idle",
  Pending = "pending",
  Correct = "correct",
  Wrong = "wrong",
}

const GamePage = () => {
  const router = useRouter();
  const user = useUserContext();
  const [questionCount, setQuestionCount] = useState(1);
  const [stimuliHistory, setStimuliHistory] = useState<string[]>([]);
  const [currentStimuli, setCurrentStimuli] = useState(() =>
    getNextStimuli(""),
  );
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.Idle);

  useEffect(() => {
    const interval = setInterval(() => {
      setStimuliHistory((prev) => [prev[prev.length - 1], currentStimuli]);
      setCurrentStimuli(getNextStimuli(currentStimuli));
      setQuestionCount((questionCount) => questionCount + 1);
      setButtonState(
        questionCount < 1 ? ButtonState.Idle : ButtonState.Pending,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [questionCount, currentStimuli]);

  useEffect(() => {
    if (user.wrongAnswer >= 3 || questionCount > 15) {
      sendAnalyticsEvent(user.showAnalytics, "Test completed");
      router.push("/results");
    }
  }, [questionCount, user, router]);

  function getNextStimuli(currentStimuli: string): string {
    let newStimuli;
    do {
      const stimuliList = ["A", "B", "C", "D", "X", "Z"];
      const randomIndex = Math.floor(Math.random() * stimuliList.length);
      newStimuli = stimuliList[randomIndex];
    } while (newStimuli === currentStimuli);
    return newStimuli;
  }

  const handleButtonClick = () => {
    if (
      buttonState === ButtonState.Pending &&
      currentStimuli === stimuliHistory[0]
    ) {
      setButtonState(ButtonState.Correct);
      user.setCorrectAnswer(user.correctAnswer + 1);
      sendAnalyticsEvent(user.showAnalytics, "Attempt - Correct Answer ✅");
    } else if (buttonState === ButtonState.Pending) {
      setButtonState(ButtonState.Wrong);
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
          <p>{15 - questionCount} questions remaining</p>
        </div>
        <div className="flex flex-col h-[300px] justify-center items-center gap-10 text-5xl font-bold text-center border-2 bg-thymia-purple bg-opacity-30 200 rounded-xl">
          <p className=" text-9xl" data-testid="visual-stimuli">
            {currentStimuli}
          </p>
        </div>
      </div>

      <footer className="flex flex-col -translate-y-12 sm:translate-y-0 pt-12 md:pt-0">
        <h2 className="sm:mt-4 text-center text-gray-600">
          Click if you recognize this image from two images ago:
        </h2>

        <Button
          text={buttonState === ButtonState.Pending ? "Seen it? 👀" : "Wait ✋"}
          onClick={handleButtonClick}
          disabled={buttonState === ButtonState.Idle}
          answerStatus={
            buttonState === ButtonState.Correct
              ? "correct"
              : buttonState === ButtonState.Wrong
                ? "wrong"
                : undefined
          }
        />
      </footer>
    </div>
  );
};

export default GamePage;
