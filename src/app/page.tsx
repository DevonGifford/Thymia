"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useUserContext } from "../contexts/UserContext";
import { sendAnalyticsEvent } from "../utils/analytics";

const UsernameSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "⚠ Username cannot be empty" })
    .min(3, { message: "⚠ Username is too short" })
    .max(14, { message: "⚠ Username is too long" }),
  // 🎯 prevent special characters too?
});
type UsernameSchemaType = z.infer<typeof UsernameSchema>;

export default function Home() {
  const router = useRouter();
  const user = useUserContext();

  //✅ Handle form submission - helping cut wasted api calls
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UsernameSchemaType>({
    resolver: zodResolver(UsernameSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  //✅ Handle Submit - managing the callback URL
  const onSubmit: SubmitHandler<UsernameSchemaType> = async (data) => {
    sendAnalyticsEvent(user.showAnalytics, "login button clicked");
    try {
      user.setUsername(data.username.trim());
      user.resetGame();
      router.push("./game");
      sendAnalyticsEvent(user.showAnalytics, "Username set & GameStarted");
    } catch (err: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  //✅ Handle toggle analytics events - toast notification current status onClick
  const handleAnalyticsToggle = () => {
    user.setShowAnalytics(!user.showAnalytics);
    if (user.showAnalytics) {
      sendAnalyticsEvent(true, "Set showAnalytics to False");
    } else {
      sendAnalyticsEvent(true, "Set showAnalytics to True");
    }
  };

  return (
    <>
      <Heading
        headingBlack="Welcome to the "
        headingColor="2-back game"
        subHeadingBlack="A technical assessment"
        subHeadingColor="by Devon Gifford"
      />

      <div className="flex flex-col gap-5 justify-center ">
        <div className="flex flex-col text-center gap-1 italic text-gray-600">
          <p>
            The 2-Back game is a cognitive training exercise designed to enhance
            working memory, attention, and pattern recognition skills.
          </p>
          <p>
            It is part of a broader category of brain training games aimed at
            boosting cognitive functions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 pt-10"
        >
          <h2 className="text-3xl text-center font-semibold font-thymia-title pb-2 ">
            Enter your name to begin
          </h2>

          <div className="flex flex-col md:flex-row justify-start gap-5">
            <input
              type="text"
              role="username-input"
              onKeyDown={() => clearErrors()}
              className="p-2 text-black font-semibold m-0.5 rounded-xl border-2 border-thymia-purple border-opacity-50 focus:border-thymia-purple"
              {...register("username")}
            />

            <Button text="Start The Game" buttonType="submit" />
          </div>

          {errors.username && (
            <span className="relative text-red-700 text-base font-semibold pt-2 text-center sm:text-left">
              {errors.username.message}
            </span>
          )}
        </form>

        <div className="flex flex-row w-full text-thymia-purple pb-10 items-center justify-center text-center">
          <label className="flex cursor-pointer gap-2 items-center justify-center w-full">
            <span className="sm:text-left">
              {user.showAnalytics ? <Eye /> : <EyeOff />}
            </span>

            <p>Show event logs? </p>

            <input
              type="checkbox"
              checked={user.showAnalytics}
              onChange={handleAnalyticsToggle}
              className="mx-3 bg-thymia-purple accent-thymia-purple"
              style={{ width: "20px", height: "20px" }}
            />
          </label>
        </div>

        <div className="flex flex-col gap-6 text-center border-2 border-thymia-purple rounded-xl border-opacity-40 bg-thymia-purple bg-opacity-25 p-7 sm:mx-10 md:mx-40 shadow-slate-500 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-thymia-purple font-thymia-title">
            How to play?
          </h3>

          <ul className="flex flex-col gap-5 italic text-gray-600 w-full max-w-5xl">
            <li>
              In this game, you will be presented with a sequence of stimuli, in
              this case a series of letters presented every 3000 milliseconds.
            </li>
            <li>
              You are required to identify whether the current stimulus matches
              the one that appeared two steps back in the sequence. If the
              current letter you are seeing is match click the button.
            </li>
            <li>
              The game will end either at the end of the sequence or after 2
              incorrect answers.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
