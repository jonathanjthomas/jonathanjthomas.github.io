"use client";

import React from "react";

export default function AnimatedEyes() {
  return (
    <div className="relative flex items-center justify-center p-4" aria-label="Animated blinking eyes">
      {/* Scoped CSS animations for the eyes */}
      <style>{`
        @keyframes pupil-glance {
          0%, 16% {
            transform: translate(0, 0);
          }
          22%, 36% {
            /* Look Left */
            transform: translate(-12px, -1px);
          }
          42%, 48% {
            /* Return to Center */
            transform: translate(0, 0);
          }
          54%, 68% {
            /* Look Right */
            transform: translate(12px, -1px);
          }
          74%, 80% {
            /* Center */
            transform: translate(0, 0);
          }
          84%, 100% {
            transform: translate(0, 0);
          }
        }

        @keyframes eyelid-blink {
          0%, 74% {
            transform: scaleY(1);
          }
          /* Quick natural blink */
          76.5% {
            transform: scaleY(0.06);
          }
          79% {
            transform: scaleY(1);
          }
          /* Stay open briefly */
          82% {
            transform: scaleY(1);
          }
          /* Smoothly close eyes */
          86% {
            transform: scaleY(0.04);
          }
          /* Held closed */
          94% {
            transform: scaleY(0.04);
          }
          /* Wake up and reopen */
          98%, 100% {
            transform: scaleY(1);
          }
        }

        @keyframes atmospheric-pulse {
          0%, 100% {
            opacity: 0.85;
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.15));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.3));
          }
        }

        .eyes-container {
          animation: atmospheric-pulse 6s ease-in-out infinite;
        }

        .eye-lid {
          transform-origin: 50% 50%;
          animation: eyelid-blink 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .eye-pupil {
          animation: pupil-glance 9s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="eyes-container flex items-center gap-7">
        {/* Left Eye */}
        <div className="eye-lid relative w-20 h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 80 48"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="left-eye-clip">
                {/* Modern organic almond eye shape */}
                <path d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z" />
              </clipPath>
              <radialGradient id="iris-gradient-left" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#222" />
                <stop offset="70%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
            </defs>

            {/* Sclera (White of the eye) */}
            <path
              d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z"
              fill="#f5f5f7"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Clipped Pupil & Glint */}
            <g clipPath="url(#left-eye-clip)">
              <g className="eye-pupil" style={{ transformOrigin: "40px 24px" }}>
                {/* Pupil */}
                <circle cx="40" cy="24" r="11" fill="url(#iris-gradient-left)" />
                {/* Glint / Light reflection highlight */}
                <circle cx="37" cy="20.5" r="3" fill="#ffffff" opacity="0.95" />
                <circle cx="43" cy="26" r="1.2" fill="#ffffff" opacity="0.6" />
              </g>
            </g>

            {/* Eyelash / Outline contour */}
            <path
              d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Right Eye */}
        <div className="eye-lid relative w-20 h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 80 48"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="right-eye-clip">
                {/* Modern organic almond eye shape */}
                <path d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z" />
              </clipPath>
              <radialGradient id="iris-gradient-right" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#222" />
                <stop offset="70%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
            </defs>

            {/* Sclera (White of the eye) */}
            <path
              d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z"
              fill="#f5f5f7"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Clipped Pupil & Glint */}
            <g clipPath="url(#right-eye-clip)">
              <g className="eye-pupil" style={{ transformOrigin: "40px 24px" }}>
                {/* Pupil */}
                <circle cx="40" cy="24" r="11" fill="url(#iris-gradient-right)" />
                {/* Glint / Light reflection highlight */}
                <circle cx="37" cy="20.5" r="3" fill="#ffffff" opacity="0.95" />
                <circle cx="43" cy="26" r="1.2" fill="#ffffff" opacity="0.6" />
              </g>
            </g>

            {/* Eyelash / Outline contour */}
            <path
              d="M 4 24 C 18 8, 62 8, 76 24 C 62 40, 18 40, 4 24 Z"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
