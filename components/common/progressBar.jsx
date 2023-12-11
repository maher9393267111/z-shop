"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const AppProgressBar = () => {
  return (
    <ProgressBar
      height="3px"
      color="#42A5F5"
      options={{
        showSpinner: true,
        speed: 300,
        easing: "ease",
        trickleSpeed: 200,
        minimum: 0.08,
        trickleRate: 0.08,
        crawlSpeed: 200,
        shadow: "0 0 10px #2299DD,0 0 5px #2299DD",
        template:
          '<div class="bar" role="bar"><div class="peg"></div></div> <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
        zIndex: 1600,
        showAtBottom: false,
      }}
      shallowRouting
    />
  );
};

export default AppProgressBar;