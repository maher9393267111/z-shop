
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/functions/context";

const PinCode = () => {
  const {isAdmin ,setisAdmin} = useAuth();
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if ("0123456789".includes(key) && input.length < 4) {
        setInput((prev) => prev + key);
      }
      if (key === "Backspace") {
        onBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  useEffect(() => {
    if (input.length === 4) {
      onEnter();
    }
  }, [input]);

  const onButtonClick = (value) => {
    if (input.length < 4) {
      setInput(input + value);
    }
  };

  const onClear = () => {
    setInput("");
  };

  const onBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const onEnter = () => {
    if (input === "1234") {
      setisAdmin(true);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setInput("");
      }, 500);
    }
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  return (
    <AnimatePresence>
      <div className=" relative top-24">
    
      <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div animate={shake ? shakeAnimation : {}} className="flex space-x-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < input.length ? "bg-black" : "bg-gray-100"} ${shake ? "bg-red-500" : ""}`}></div>
            ))}
        </motion.div>
        <div className="grid grid-cols-3 place-items-center justify-items-end gap-4 mt-12">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <button key={num} className="w-12 h-12 bg-gray-50  text-xl" onClick={() => onButtonClick(num.toString())}>
              {num}
            </button>
          ))}
          <button className="w-12 h-12 /bg-red-50 text-black text-xl" onClick={onClear}>
            C
          </button>
          <button className="w-12 h-12 bg-gray-50  text-xl" onClick={() => onButtonClick("0")}>
            0
          </button>
          <button className="w-10 h-8  bg-gray-50 rounded-s-lg  text-xl" onClick={onBackspace}>
            <svg className="w-6 h-6 ps-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
          </button>
          <button className="col-start-3 mt-4 hidden flex justify-start items-end ps-2 w-full h-12 bg-black text-white text-xl" onClick={onEnter}>
            {"↵"}
          </button>
        </div>
        {/* <div className="text-black my-4 text-sm">PIN CODE IS 1234</div> */}
      </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PinCode;
