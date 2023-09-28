"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import { sendAnalyticsEvent } from "@/utils/analytics";
import Button from "../components/Button";
import Heading from "../components/Heading";

const GamePage = () => {
  const user = useUserContext();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [letterCache, setLetterCache] = useState([currentLetter, ""]);

  // ✅ Function to randomly select a letter from the array
  // 🎯 should not be able to have the same number directly after each other (twice in a row)
  // const letters = ["A", "B", "C", "D", "E", "H", "I", "K", "L", "M", "O", "P", "R", "S", "T"];
  function getRandomLetter() {
    const letters = ["A", "B", "C", "D", "X", "Z"];
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  // ✅ Handles Game Logic - interval-based updates, checking for game completion conditions, and triggering relevant events.
  useEffect(() => {
    const interval = setInterval(() => {
      setLetterCache([currentLetter, letterCache[0]]);
      setCurrentLetter(getRandomLetter());
      setCount((count) => count + 1);
    }, 2500);

    if (user.wrongAnswer >= 2 || count > 15) {
      clearInterval(interval);
      sendAnalyticsEvent(user.showAnalytics, "Test completed");
      router.push("/results");
    }

    return () => clearInterval(interval);
  });

  // ✅ Handles user's guess  - checks, updates and logs
  // 🎯 button should only push correct answer once per interval
  const handleButtonClick = () => {
    if (currentLetter === letterCache[0] || currentLetter === letterCache[1]) {
      user.setCorrectAnswer(user.correctAnswer + 1);
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt button clicked - Correct Answer ✅"
      );
    } else {
      user.setWrongAnswer(user.wrongAnswer + 1);
      sendAnalyticsEvent(
        user.showAnalytics,
        "Attempt button clicked - Wrong answer ❌"
      );
    }
  };

  return (
    <>
      <Heading
        headingBlack="Hello there"
        headingColor={user.username}
        subHeadingBlack="Your test is starting"
        subHeadingColor="right now..."
      />

      <div className="w-full h-1/2 md:w-9/12 max-w-2xl -translate-y-7 sm:translate-y-0">
        <div className="flex flex-col-reverse text-center md:flex-row w-full md:justify-between text-slate-900 text-xs sm:text-sm px-8 translate-y-12">
          <p>You have {2 - user.wrongAnswer} chances left</p>
          <p>{20 - count} questions remaining</p>
        </div>
        <div className="flex flex-col h-full min-h-[300px] justify-center items-center gap-10 text-5xl font-bold text-center border-2 bg-thymia-purple bg-opacity-30 200 rounded-xl">
          <p className=" text-9xl ">{currentLetter}</p>
        </div>
      </div>

      <div className="flex flex-col -translate-y-12 sm:translate-y-0">
        <h2 className="sm:mt-4 self-start">
          Click below if you have seen this image in the most recent 2 images:
        </h2>

        <Button text="Seen it 👀" onClick={handleButtonClick} />
      </div>
    </>
  );
};

export default GamePage;
