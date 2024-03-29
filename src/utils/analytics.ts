import axios from "axios";
import toast from "react-hot-toast";

export const sendAnalyticsEvent = async (
  showAnalytics: boolean,
  eventName: string,
) => {
  try {
    await axios.post(`api/events`, {
      eventName,
      date: new Date(),
    });

    if (showAnalytics) {
      toast(`Logged event: ${eventName}`, {
        icon: "💾",
      });
    }
  } catch {
    // console.error("There has been an error in sending analytic event");
  }
};
