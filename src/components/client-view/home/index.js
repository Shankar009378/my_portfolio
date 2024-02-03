"use client";

import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { IoMdDownload } from "react-icons/io";
import Image from "next/image";
import Image2 from "../../../assets/Image2.jpg";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const socialIcons = [
  {
    id: "linkedin",
    icon: (
      <a href="https://www.linkedin.com/in/shankar-kumar-nanda-04304a263/" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn
          color="rgba(111, 66, 193)"
          className="w-[40px] h-[40px]"
        />
      </a>
    ),
  },
  {
    id: "github",
    icon: (
      <a href="https://github.com/Shankar009378" target="_blank" rel="noopener noreferrer">
        <FaGithub
          color="rgba(111, 66, 193)"
          className="w-[40px] h-[40px]"
        />
      </a>
    ),
  },
  {
    id: "twitter",
    icon: (
      <a href="https://twitter.com/shankarnanda26" target="_blank" rel="noopener noreferrer">
        <FaTwitter
          color="rgba(111, 66, 193)"
          className="w-[40px] h-[40px] "
        />
      </a>
    )
  },
  {
    id: "leetcode",
    icon: (
      <a href="https://leetcode.com/Shankar_07/" target="_blank" rel="noopener noreferrer">
        <SiLeetcode
          color="rgba(111, 66, 193)"
          className="w-[40px] h-[40px]"
        />
      </a>
    ),
  },
  {
    id: "resume",
    icon: (
      <a href="https://drive.google.com/file/d/1iteQDs0xniq-Y_cXK1z1VjhGtXQuwFD5/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
        <IoMdDownload 
          color="rgba(111, 66, 193)"
          className="w-[40px] h-[40px]"
        />
      </a>
    ),
  },
];

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="home">
      <AnimationWrapper>
        <motion.div
          className={
            "grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          }
          variants={setVariants}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="mb-4 text-3xl lg:text-4xl xl:text-6xl font-medium leading-normal">
              {data && data.length
                ? data[0]?.heading
                  .split(" ")
                  .map((item, index) => (
                    <span
                      className={`${index === 1 || index === 2 || index === 3
                        ? "text-purple-main"
                        : "text-[#000]"
                        }`}
                    >
                      {item}{" "}
                    </span>
                  ))
                : null}
            </h1>
            <p className="text-[#000] mt-4 mb-8 font-bold">
              {data && data.length ? data[0]?.summary : null}
            </p>
            <motion.div className="flex gap-3 cursor-pointer">
              {socialIcons.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    duration: 4,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div ref={containerRef} className="flex w-full justify-end">
            <motion.div
              drag
              dragConstraints={containerRef}
              className="w-[400px] h-[400px] relative"
            >
              {/* <div className="w-[400px] h-[400px] top-[40px] left-[-30px] rounded-lg border-[6px] border-[#000000] absolute"></div> */}
              <Image
                src={Image2}
                alt="Profile Picture"
                layout="responsive"
                quality={100}
                height={300}
                width={300}
                className="absolute top-[-30px]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}
