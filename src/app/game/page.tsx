"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/src/contexts/UserContextProvider";
import { sendAnalyticsEvent } from "@/src/utils/analytics";

import Button from "../../components/Button";
import Heading from "../../components/Heading";

const GamePage = () => {
  const router = useRouter();
  const user = useUserContext();
  const [questionCount, setQuestionCount] = useState(1);
  const [currentStimuli, setCurrentStimuli] = useState(() => getNextStimuli(""));
  const [lastStimuli, setLastStimuli] = useState("");
  const [secondLastStimuli, setSecondLastStimuli] = useState("");
  const [answerStatus, setAnswerStatus] = useState<"correct" | "wrong">();
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  function getNextStimuli(currentStimuli: string): string {
    let newStimuli;
    do {
      const stimuliList = ["A", "B", "C", "D", "X", "Z"];
      const randomIndex = Math.floor(Math.random() * stimuliList.length);
      newStimuli = stimuliList[randomIndex];
    } while (newStimuli === currentStimuli);
    return newStimuli;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondLastStimuli(lastStimuli);
      setLastStimuli(currentStimuli);
      setCurrentStimuli(getNextStimuli(currentStimuli));
      setQuestionCount((questionCount) => questionCount + 1);
      setButtonClicked(false);
      setAnswerStatus(undefined);
      if (questionCount > 1) {
        setButtonEnabled(true);
      }
    }, 2500);

    if (user.wrongAnswer >= 3 || questionCount > 15) {
      clearInterval(interval);
      sendAnalyticsEvent(user.showAnalytics, "Test completed");
      router.push("/results");
    }

    return () => clearInterval(interval);
  }, [questionCount, currentStimuli, lastStimuli, router, user]);

  const handleButtonClick = () => {
    if (
      buttonEnabled &&
      !buttonClicked &&
      currentStimuli === secondLastStimuli
    ) {
      setButtonClicked(true);
      user.setCorrectAnswer(user.correctAnswer + 1);
      setAnswerStatus("correct");
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt logged - Correct Answer ✅",
      );
    } else if (buttonEnabled && !buttonClicked) {
      setButtonClicked(true);
      user.setWrongAnswer(user.wrongAnswer + 1);
      setAnswerStatus("wrong");
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt logged - Wrong answer ❌",
      );
    }
    setButtonEnabled(false);
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

      <div className="flex flex-col -translate-y-12 sm:translate-y-0 pt-12 md:pt-0">
        <h2 className="sm:mt-4 text-center text-gray-600">
          Click below if you have seen this image in the most recent 2 images:
        </h2>

        <Button
          text="Seen it? 👀"
          onClick={handleButtonClick}
          disabled={!buttonEnabled}
          answerStatus={answerStatus}
        />
      </div>
    </div>
  );
};

export default GamePage;
