"use client";

import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import { sendAnalyticsEvent } from "@/utils/analytics";

import Button from "../components/Button";
import Heading from "../components/Heading";

const ResultsPage = () => {
  const user = useUserContext();

  const handleRestart = () => {
    sendAnalyticsEvent(user.showAnalytics, "Restart Game Clicked");
    user.resetGame();
  };

  return (
    <>
      <Heading
        headingBlack="Hello again"
        headingColor={user.username}
        subHeadingBlack="the assessment is"
        subHeadingColor="complete"
      />

      <div className="w-full flex flex-col items-center text-center gap-3 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-thymia-purple">Your Results are as follows:</h2>

        <div className="">
          <p className="flex flex-col text-center text-xl font-bold">
            <span className="font-semibold ">Correct answers:</span>{" "}
            <span className="text-thymia-purple">{user.correctAnswer}</span>
          </p>

          <p className="flex flex-col text-center text-xl font-bold">
            <span className="font-semibold ">Wrong answers:</span>{" "}
            <span className="text-thymia-purple">{user.wrongAnswer}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 ">
        <Button text="Try again" onClick={handleRestart} />

        <p className="text-gray-600 text-center">
          Regular practice can lead to improved working memory and attention.
          <br />
          Embrace the process and have fun!
        </p>
      </div>
    </>
  );
};

export default ResultsPage;
