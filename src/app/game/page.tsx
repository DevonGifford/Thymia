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
  const [currentStimuli, setCurrentStimuli] = useState(() =>
    getNextStimuli(""),
  );
  const [secondLastStimuli, setSecondLastStimuli] = useState("");
  // const [buttonEnabled, setButtonEnabled] = useState(false);

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
      setSecondLastStimuli(currentStimuli);
      setCurrentStimuli(getNextStimuli(currentStimuli));
      setQuestionCount((questionCount) => questionCount + 1);
    }, 2500);

    if (user.wrongAnswer >= 2 || questionCount > 15) {
      clearInterval(interval);
      sendAnalyticsEvent(user.showAnalytics, "Test completed");
      router.push("/results");
    }

    return () => clearInterval(interval);
  });

  // FIXME:
  // - button should only push correct answer once per interval
  // - button should not be clickable on the first interval
  const handleButtonClick = () => {
    if (
      currentStimuli === secondLastStimuli[0] ||
      currentStimuli === secondLastStimuli[1]
    ) {
      user.setCorrectAnswer(user.correctAnswer + 1);
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt button clicked - Correct Answer ✅",
      );
    } else {
      user.setWrongAnswer(user.wrongAnswer + 1);
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt button clicked - Wrong answer ❌",
      );
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

      <div className="w-full h-1/2 max-w-xl -translate-y-7 sm:translate-y-0">
        <div className="flex flex-col-reverse text-center md:flex-row w-full md:justify-between text-slate-900 text-xs sm:text-sm px-8 translate-y-12">
          <p>You have {2 - user.wrongAnswer} chances left</p>
          <p>{15 - questionCount} questions remaining</p>
        </div>
        <div className="flex flex-col h-full min-h-[300px] justify-center items-center gap-10 text-5xl font-bold text-center border-2 bg-thymia-purple bg-opacity-30 200 rounded-xl">
          <p className=" text-9xl" data-testid="visual-stimuli">
            {currentStimuli}
          </p>
        </div>
      </div>

      <div className="flex flex-col -translate-y-12 sm:translate-y-0 pt-12 md:pt-0">
        <h2 className="sm:mt-4 text-center text-gray-600">
          Click below if you have seen this image in the most recent 2 images:
        </h2>

        <Button text="Seen it 👀" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default GamePage;
