import { useState ,useEffect } from "react";
import { FaChampagneGlasses } from "react-icons/fa6";

const Countdown = ({
 
      
  }) => {

    const [primaryColor, setPrimaryColor] = useState("#061826");
    const [secondaryColor, setSecondaryColor] = useState("#2C4053");
    const [textColor, setTextColor] = useState("#ffffff");
    const [startTime, setStartTime] = useState(
      //Date.now() + 48 * 3600 * 1000
      1700927835420
      );
    console.log('setPrimaryColor' ,startTime)
    const [timeRemaining, setTimeRemaining] = useState(
        // dummy time remaining
        {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      );


      
    const calculateTimeRemaining = () => {
        const timeRemaining = startTime - Date.now();
        // console.log(timeRemaining);
        return {
          days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
          seconds: Math.floor((timeRemaining / 1000) % 60),
        };
      };
    
      // Update time remaining every second
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining());
          console.log("Time remaining" + timeRemaining);
        }, 1000);
    
    //    return interval
        return () => {
          console.log("CLEAR TIME")
          clearInterval(interval);
        };
      }, [startTime]);





    return (
        <div className=" min-h-screen flex   justify-center items-center">

     {/* container */}
      <div
        className="flex w-[80%] md:w-6/12 bg-primary rounded-md count sm:px-2 px-1"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Countdown Tiles */}
        <div className="contain-tile w-1/4 h-full flex flex-col justify-center items-center pt-3 pb-1">
          <div
            className="bg-secondary aspect-square w-11/12 rounded-md flex justify-center items-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <span
              className="transition count-text text-7xl font-bold text-white flex justify-center items-center"
              style={{ color: textColor }}
              suppressHydrationWarning={true}
            >
              {timeRemaining.days}
            </span>
          </div>
          <span
            className="transition count-other text-2xl font-semibold text-white flex justify-center items-center"
            style={{ color: textColor }}
          >
            Days
          </span>
        </div>
  
        <div className="contain-tile w-1/4 h-full flex flex-col justify-center items-center pt-3 pb-1">
          <div
            className="bg-secondary aspect-square w-11/12 rounded-md flex justify-center items-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <span
              className="transition count-text text-7xl font-bold text-white flex justify-center items-center"
              style={{ color: textColor }}
              suppressHydrationWarning={true}
            >
              {timeRemaining.hours}
            </span>
          </div>
          <span
            className="transition count-other text-2xl font-semibold text-white flex justify-center items-center"
            style={{ color: textColor }}
          >
            Hours
          </span>
        </div>
  
        <div className="contain-tile w-1/4 h-full flex flex-col justify-center items-center pt-3 pb-1">
          <div
            className="bg-secondary aspect-square w-11/12 rounded-md flex justify-center items-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <span
              className="transition count-text text-7xl font-bold text-white flex justify-center items-center"
              style={{ color: textColor }}
              suppressHydrationWarning={true}
            >
              {timeRemaining.minutes}
            </span>
          </div>
          <span
            className="transition count-other text-2xl font-semibold text-white flex justify-center items-center"
            style={{ color: textColor }}
          >
            Minutes
          </span>
        </div>
  
        <div className="contain-tile w-1/4 h-full flex flex-col justify-center items-center pt-3 pb-1">
          <div
            className="bg-secondary aspect-square w-11/12 rounded-md flex justify-center items-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <span
              className="transition count-text text-7xl font-bold text-white flex justify-center items-center"
              style={{ color: textColor }}
              suppressHydrationWarning={true}
            >
              {timeRemaining.seconds}
            </span>
          </div>
          <span
            className="transition count-other text-2xl font-semibold text-white flex justify-center items-center"
            style={{ color: textColor }}
          >
            Seconds
          </span>
        </div>
      </div>
      </div>
    );
  };
  
  export default Countdown;