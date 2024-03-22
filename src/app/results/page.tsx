"use client";

import React from "react";

import Button from "../components/Button";
import Heading from "../components/Heading";
import { useUserContext } from "@/src/contexts/UserContext";
import { sendAnalyticsEvent } from "@/src/utils/analytics";

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

      <div className="flex flex-col items-center text-center gap-3 border-2 border-thymia-purple rounded-xl border-opacity-40 bg-thymia-purple bg-opacity-25 py-10 px-20  shadow-slate-500 shadow-2xl">
        <h2 className="text-xl md:text-3xl font-semibold text-thymia-purple">
          Your Results
        </h2>

        <div>
          <p className="flex flex-col text-center text-xl font-bold pt-5">
            <span className="font-semibold ">Correct answers:</span>{" "}
            <span className="text-thymia-purple">{user.correctAnswer}</span>
          </p>

          <p className="flex flex-col text-center text-xl font-bold">
            <span className="font-semibold ">Wrong answers:</span>{" "}
            <span className="text-thymia-purple">{user.wrongAnswer}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-5 ">
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
