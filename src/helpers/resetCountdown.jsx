function resetCountdown(setActive, setTime) {
  const oneMinute = 60;
  const threeSeconds = 0.05;
  setActive(false);
  setTime(threeSeconds * oneMinute);
}

export default resetCountdown;
