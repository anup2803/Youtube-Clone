import React, { useEffect, useState } from "react";

const SpinnerLoader = () => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const loader = setInterval(() => {
      setCurrentProgress((prevProgress) => {
        let newProgress = prevProgress + Math.random() * 40;

        if (newProgress >= 100) {
          newProgress = 100;
          clearInterval(loader);
        }

        return newProgress;
      });
    }, 800);

    return () => clearInterval(loader);
  }, []);

  return (
    <div
      className="h-1 bg-red-500 transition-all duration-300 absolute z-40 top-0 left-0"
      style={{ width: `${currentProgress}%` }}
    />
  );
};

export default SpinnerLoader;
