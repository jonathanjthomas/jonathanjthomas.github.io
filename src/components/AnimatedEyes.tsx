"use client";

import React from "react";

export default function AnimatedEyes() {
  return (
    <div
      className="relative flex items-center justify-center py-6 px-4"
      aria-label="Animated tall oval eyes looking around and blinking"
    >
      <style>{`
        /* Eyes start default CLOSED (completely invisible/black) and open after a suspenseful pause */
        @keyframes tall-eyelid-cycle {
          0%, 14% {
            /* Default closed: 100% black and hidden */
            transform: scaleY(0);
            opacity: 0;
          }
          19% {
            /* Open wide */
            transform: scaleY(1);
            opacity: 1;
          }
          77% {
            /* Stay open */
            transform: scaleY(1);
            opacity: 1;
          }
          79.5% {
            /* Quick natural blink */
            transform: scaleY(0);
            opacity: 0;
          }
          82% {
            /* Snap back open */
            transform: scaleY(1);
            opacity: 1;
          }
          86% {
            /* Start closing */
            transform: scaleY(1);
            opacity: 1;
          }
          90%, 100% {
            /* Completely closed and pure black */
            transform: scaleY(0);
            opacity: 0;
          }
        }

        /* Pupil glance motion: centers -> looks left -> centers -> looks right -> centers */
        @keyframes tall-pupil-glance {
          0%, 20% {
            /* Centered during opening */
            transform: translate(0, 0);
          }
          26%, 42% {
            /* Look Left (matching reference picture 3) */
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

        .tall-eye-lid {
          transform-origin: 50% 50%;
          animation: tall-eyelid-cycle 9.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .tall-pupil {
          transform-origin: 38px 65px;
          animation: tall-pupil-glance 9.5s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Responsive container for both eyes */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
        {/* Left Eye */}
        <div className="tall-eye-lid w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-44 flex items-center justify-center">
          <svg
            viewBox="0 0 76 130"
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.18)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Tall vertical oval clipping mask */}
              <clipPath id="tall-eye-clip-left">
                <ellipse cx="38" cy="65" rx="34" ry="60" />
              </clipPath>
            </defs>

            {/* Sclera (Tall white oval) */}
            <ellipse
              cx="38"
              cy="65"
              rx="34"
              ry="60"
              fill="#ffffff"
            />

            {/* Clipped Pupil & Glint */}
            <g clipPath="url(#tall-eye-clip-left)">
              <g className="tall-pupil">
                {/* Tall oval black pupil */}
                <ellipse
                  cx="38"
                  cy="65"
                  rx="19"
                  ry="37"
                  fill="#000000"
                />
                {/* White glint in upper-left of pupil (per reference) */}
                <ellipse
                  cx="31"
                  cy="51"
                  rx="6.5"
                  ry="12"
                  fill="#ffffff"
                />
              </g>
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
        <div className="tall-eye-lid w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-44 flex items-center justify-center">
          <svg
            viewBox="0 0 76 130"
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.18)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Tall vertical oval clipping mask */}
              <clipPath id="tall-eye-clip-right">
                <ellipse cx="38" cy="65" rx="34" ry="60" />
              </clipPath>
            </defs>

            {/* Sclera (Tall white oval) */}
            <ellipse
              cx="38"
              cy="65"
              rx="34"
              ry="60"
              fill="#ffffff"
            />

            {/* Clipped Pupil & Glint */}
            <g clipPath="url(#tall-eye-clip-right)">
              <g className="tall-pupil">
                {/* Tall oval black pupil */}
                <ellipse
                  cx="38"
                  cy="65"
                  rx="19"
                  ry="37"
                  fill="#000000"
                />
                {/* White glint in upper-left of pupil (per reference) */}
                <ellipse
                  cx="31"
                  cy="51"
                  rx="6.5"
                  ry="12"
                  fill="#ffffff"
                />
              </g>
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
