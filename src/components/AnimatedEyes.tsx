"use client";

import React from "react";

export default function AnimatedEyes() {
  return (
    <div
      className="relative flex items-center justify-center py-6 px-4"
      aria-label="Animated cartoon tall oval eyes looking around with shuttering eyelids"
    >
      <style>{`
        /* UPPER EYELID SHUTTER: Starts default CLOSED at translateY(0), shutters open, blinks, and shutters closed */
        @keyframes upper-shutter {
          0%, 14% {
            /* Default closed: fully covers upper & middle eye */
            transform: translateY(0px);
          }
          20% {
            /* Fully open: retracted above eye */
            transform: translateY(-120px);
          }
          77% {
            /* Stay open */
            transform: translateY(-120px);
          }
          /* Quick natural blink */
          82% {
            transform: translateY(-120px);
          }
          83.5% {
            /* Snap shut */
            transform: translateY(0px);
          }
          85% {
            /* Snap back open */
            transform: translateY(-120px);
          }
          89% {
            /* Stay open briefly */
            transform: translateY(-120px);
          }
          94%, 100% {
            /* Smoothly shutter closed down over the eye */
            transform: translateY(0px);
          }
        }

        /* LOWER EYELID SHUTTER: Starts default CLOSED at translateY(0), shutters open, blinks, and shutters closed */
        @keyframes lower-shutter {
          0%, 14% {
            /* Default closed: fully covers lower & middle eye */
            transform: translateY(0px);
          }
          20% {
            /* Fully open: retracted below eye */
            transform: translateY(65px);
          }
          77% {
            /* Stay open */
            transform: translateY(65px);
          }
          /* Quick natural blink */
          82% {
            transform: translateY(65px);
          }
          83.5% {
            /* Snap shut */
            transform: translateY(0px);
          }
          85% {
            /* Snap back open */
            transform: translateY(65px);
          }
          89% {
            /* Stay open briefly */
            transform: translateY(65px);
          }
          94%, 100% {
            /* Smoothly shutter closed up over the eye */
            transform: translateY(0px);
          }
        }

        /* PUPIL GLANCE MOTION: looks left (matching reference) -> centers -> looks right -> centers */
        @keyframes tall-pupil-glance {
          0%, 20% {
            /* Centered while opening */
            transform: translate(0, 0);
          }
          26%, 42% {
            /* Look Left (matching reference picture) */
            transform: translate(-15px, 0);
          }
          47%, 54% {
            /* Return Center */
            transform: translate(0, 0);
          }
          60%, 74% {
            /* Look Right */
            transform: translate(15px, 0);
          }
          79%, 100% {
            /* Return Center */
            transform: translate(0, 0);
          }
        }

        .eyelid-upper {
          animation: upper-shutter 9.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: transform;
        }

        .eyelid-lower {
          animation: lower-shutter 9.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: transform;
        }

        .tall-pupil {
          transform-origin: 38px 65px;
          animation: tall-pupil-glance 9.5s cubic-bezier(0.45, 0, 0.2, 1) infinite;
          will-change: transform;
        }
      `}</style>

      {/* Responsive container for both eyes */}
      <div className="flex items-center gap-5 sm:gap-7 md:gap-9">
        {/* Left Eye */}
        <div className="w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-44 flex items-center justify-center overflow-visible">
          <svg
            viewBox="0 0 76 130"
            className="w-full h-full overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Tall vertical oval clipping mask */}
              <clipPath id="tall-eye-clip-left">
                <ellipse cx="38" cy="65" rx="34" ry="60" />
              </clipPath>
            </defs>

            {/* Everything inside the eye is clipped to the tall oval boundary */}
            <g clipPath="url(#tall-eye-clip-left)">
              {/* Sclera (White base) */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="60"
                fill="#ffffff"
              />

              {/* Pupil & Glint group */}
              <g className="tall-pupil">
                {/* Tall oval black pupil */}
                <ellipse
                  cx="38"
                  cy="65"
                  rx="19"
                  ry="37"
                  fill="#000000"
                />
                {/* White glint highlight in upper-left (per reference) */}
                <ellipse
                  cx="31"
                  cy="51"
                  rx="6.5"
                  ry="12"
                  fill="#ffffff"
                />
              </g>

              {/* Pure black Upper Eyelid shutter (descends over eye) */}
              <path
                d="M -10 -20 L 86 -20 L 86 85 C 60 96, 16 96, -10 85 Z"
                fill="#000000"
                className="eyelid-upper"
              />

              {/* Pure black Lower Eyelid shutter (ascends over eye) */}
              <path
                d="M -10 145 L 86 145 L 86 75 C 60 64, 16 64, -10 75 Z"
                fill="#000000"
                className="eyelid-lower"
              />
            </g>

            {/* Crisp outer border contour */}
            <ellipse
              cx="38"
              cy="65"
              rx="34"
              ry="60"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Right Eye */}
        <div className="w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-44 flex items-center justify-center overflow-visible">
          <svg
            viewBox="0 0 76 130"
            className="w-full h-full overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Tall vertical oval clipping mask */}
              <clipPath id="tall-eye-clip-right">
                <ellipse cx="38" cy="65" rx="34" ry="60" />
              </clipPath>
            </defs>

            {/* Everything inside the eye is clipped to the tall oval boundary */}
            <g clipPath="url(#tall-eye-clip-right)">
              {/* Sclera (White base) */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="60"
                fill="#ffffff"
              />

              {/* Pupil & Glint group */}
              <g className="tall-pupil">
                {/* Tall oval black pupil */}
                <ellipse
                  cx="38"
                  cy="65"
                  rx="19"
                  ry="37"
                  fill="#000000"
                />
                {/* White glint highlight in upper-left (per reference) */}
                <ellipse
                  cx="31"
                  cy="51"
                  rx="6.5"
                  ry="12"
                  fill="#ffffff"
                />
              </g>

              {/* Pure black Upper Eyelid shutter (descends over eye) */}
              <path
                d="M -10 -20 L 86 -20 L 86 85 C 60 96, 16 96, -10 85 Z"
                fill="#000000"
                className="eyelid-upper"
              />

              {/* Pure black Lower Eyelid shutter (ascends over eye) */}
              <path
                d="M -10 145 L 86 145 L 86 75 C 60 64, 16 64, -10 75 Z"
                fill="#000000"
                className="eyelid-lower"
              />
            </g>

            {/* Crisp outer border contour */}
            <ellipse
              cx="38"
              cy="65"
              rx="34"
              ry="60"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
