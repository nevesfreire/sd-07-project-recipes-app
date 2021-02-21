import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
// funcção retirada de exemplos da Component UI.
function CircularStatic() {
  const percentualRage = 10;
  const limitProgress = 100;
  const beggining = 0;
  const interval = 800;
  const [progress, setProgress] = useState(percentualRage);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= limitProgress ? beggining
        : prevProgress + percentualRage));
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={ progress } />;
}

export default CircularStatic;
