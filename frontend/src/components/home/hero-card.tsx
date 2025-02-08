import Image from "next/image";
import React from "react";

const HeroCard = ({ variant }: { variant: "1" | "2" }) => {
  if (variant === "1") {
    return (
      <div className="relative w-[290px] p-4 shrink-0 h-[420px] bg-blue-700 overflow-hidden rounded-3xl">
        <svg
          width="388"
          height="410"
          viewBox="0 0 388 410"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-48 w-48 text-background fill-background -top-16 rotate-[-73.8deg] -left-16"
        >
          <path
            d="M387.928 297.533C370.943 331.11 345.045 359.364 313.069 379.201C281.094 399.038 244.276 409.691 206.649 409.993C169.021 410.296 132.037 400.236 99.7464 380.917C67.4562 361.597 41.1064 333.763 23.5838 300.463C6.0612 267.163 -1.9581 229.683 0.40447 192.129C2.76704 154.574 15.4203 118.395 36.978 87.5538C58.5357 56.7127 88.1662 32.4 122.623 17.2794C157.08 2.15876 195.034 -3.18641 232.327 1.82948L220.671 88.4867C199.285 85.6102 177.519 88.6755 157.759 97.3468C137.999 106.018 121.006 119.961 108.644 137.647C96.2807 155.334 89.0243 176.082 87.6695 197.619C86.3146 219.155 90.9135 240.649 100.962 259.746C111.011 278.842 126.122 294.805 144.64 305.884C163.157 316.963 184.367 322.732 205.945 322.559C227.524 322.385 248.638 316.276 266.975 304.9C285.312 293.524 300.164 277.321 309.905 258.065L387.928 297.533Z"
          //   fill="#D9D9D9"
          />
        </svg>
        <div className="absolute bottom-0 w-full h-full bg-transparent pointer-events-none">
          <Image
            src="/joyful-group-classmates.png"
            alt="a joyfull team"
            fill
            className="object-cover scale-105 -translate-x-3"
          />
          <div className="relative bottom-0 h-full w-full -translate-x-4 pointer-events-none scale-105">
            <div className="absolute h-24 w-full bottom-0 bg-gradient-to-b from-primary/10 via-primary/70 blur-lg to-primary rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-[290px] p-4 shrink-0 h-[420px] bg-blue-700 overflow-hidden rounded-3xl">
      <svg
        width="388"
        height="410"
        viewBox="0 0 388 410"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-48 w-48 text-background fill-background -top-16 -rotate-12 -right-16"
      >
        <path
          d="M387.928 297.533C370.943 331.11 345.045 359.364 313.069 379.201C281.094 399.038 244.276 409.691 206.649 409.993C169.021 410.296 132.037 400.236 99.7464 380.917C67.4562 361.597 41.1064 333.763 23.5838 300.463C6.0612 267.163 -1.9581 229.683 0.40447 192.129C2.76704 154.574 15.4203 118.395 36.978 87.5538C58.5357 56.7127 88.1662 32.4 122.623 17.2794C157.08 2.15876 195.034 -3.18641 232.327 1.82948L220.671 88.4867C199.285 85.6102 177.519 88.6755 157.759 97.3468C137.999 106.018 121.006 119.961 108.644 137.647C96.2807 155.334 89.0243 176.082 87.6695 197.619C86.3146 219.155 90.9135 240.649 100.962 259.746C111.011 278.842 126.122 294.805 144.64 305.884C163.157 316.963 184.367 322.732 205.945 322.559C227.524 322.385 248.638 316.276 266.975 304.9C285.312 293.524 300.164 277.321 309.905 258.065L387.928 297.533Z"
        //   fill="#D9D9D9"
        />
      </svg>
      <div className="absolute bottom-0 w-full h-full bg-transparent pointer-events-none">
        <Image
          src="/one.png"
          alt="a person using a computer"
          fill
          className="object-cover scale-105 -translate-x-2"
        />
        <div className="relative bottom-0 h-full w-full -translate-x-4 pointer-events-none scale-105">
          <div className="absolute h-24 w-full bottom-0 bg-gradient-to-b from-primary/10 via-primary/70 blur-lg to-primary rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
