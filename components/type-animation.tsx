"use client";

import { TypeAnimation } from "react-type-animation";

export function TypeAnimationComponent() {
  return (
    <div className="w-full h-24 mb-5 text-lg lg:text-3xl roboto-regular font-semibold">
      <TypeAnimation
        sequence={[
          "From Play to Proficiency: Nurturing Young Innovators in Robotics and AI.",
          2000,
          "",
          500,
        ]}
        wrapper="span"
        speed={10}
        style={{
          display: "inline-block",
          color: "transparent",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%)",
          backgroundClip: "text",
        }}
        repeat={Infinity}
      />
    </div>
  );
}
