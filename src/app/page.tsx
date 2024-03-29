"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendAnalyticsEvent } from "../utils/analytics";
import { useUserContext } from "../contexts/UserContextProvider";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import Heading from "../components/Heading";

const UsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username is too short" })
    .max(14, { message: "Username is too long" }),
});
type UsernameSchemaType = z.infer<typeof UsernameSchema>;

export default function Home() {
  const router = useRouter();
  const user = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UsernameSchemaType>({
    resolver: zodResolver(UsernameSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    delayError: 400,
  });

  const onSubmit: SubmitHandler<UsernameSchemaType> = async (data) => {
    sendAnalyticsEvent(user.showAnalytics, "login button clicked");
    try {
      user.setUsername(data.username);
      user.resetGame();
      router.push("./game");
      sendAnalyticsEvent(user.showAnalytics, "Username set & GameStarted");
    } catch (err: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleAnalyticsToggle = () => {
    user.setShowAnalytics(!user.showAnalytics);
    if (user.showAnalytics) {
      toast.error("Event Logs: OFF");
    } else {
      toast.success("Event Logs: ON");
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-16 justify-center items-center h-[70vh] md:h-auto">
      <Heading headingBlack="Welcome to the" headingColor="2-back game" />

      <article>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex flex-col md:flex-row justify-start gap-2 md:gap-5">
            <input
              type="text"
              placeholder="Enter your name..."
              onKeyDown={() => clearErrors()}
              className="p-2 text-black font-semibold m-0.5 rounded-xl border-2 border-thymia-purple border-opacity-50 focus:border-thymia-purple"
              {...register("username")}
            />

            <Button text="Start The Game" buttonType="submit" />
          </div>

          <div className="flex h-4 md:w-full md:pl-2">
            {errors.username && (
              <span className="relative text-red-500 text-sm font-semibold sm:text-left -translate-y-1.5">
                {errors.username.message}
              </span>
            )}
          </div>
        </form>

        <aside className="flex flex-row w-full text-thymia-purple items-center justify-center text-center md:pt-3">
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
        </aside>
      </article>

      <section className="hidden md:flex flex-col gap-4 text-center border-2 border-thymia-purple rounded-xl border-opacity-40 bg-thymia-purple bg-opacity-20 p-7 sm:mx-10 shadow-slate-500 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-bold text-thymia-purple font-thymia-title">
          How to play?
        </h3>
        <ul className="flex flex-col gap-2 italic text-gray-500 w-full max-w-5xl">
          <li>
            You&apos;ll be presented a sequence of stimuli: a series of letters
            shown every 3000 milliseconds.
          </li>
          <li>
            Your challenge is to discern if the current letter matches the one
            from two steps back.
          </li>
          <li>
            The game concludes upon sequence completion or after 3 incorrect
            answers.
          </li>
        </ul>
      </section>
    </div>
  );
}
