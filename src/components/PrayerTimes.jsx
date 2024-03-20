import axios from "axios";
import React, { useEffect, useState } from "react";

const PrayerTimes = () => {
  const [timePray, setTimePray] = useState(null);
  const [now, setNow] = useState();
  let time = new Date().toLocaleTimeString("ru-RU");
  const [ctime, setTime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString("ru-RU");
    setTime(time);
  };
  setInterval(UpdateTime);

  useEffect(() => {
    axios
      .get("https://islomapi.uz/api/present/day?region=Toshkent")
      .then((t) => setTimePray(t.data));
  }, [timePray]);

  if (!timePray) {
    return <h1>Loading...</h1>;
  }
  const hufton = timePray.times.hufton;
  const splitTime = time.split(":").join("");
  const bomdod = timePray.times.tong_saharlik.split(":").join("");

  const condition = (t1, t2, t3) => {
    const h1 = t1.split(":").join("");
    const h2 = t2.split(":").join("");
    const h3 = t3.split(":").join("");
    console.log(h1);
    if (h3 > h1 && h3 < h2) {
      return "timeToPray";
    } else {
      return "not";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      <div className="now text-2xl font-mon font-bold text-slate-600">
        Time: {time}
      </div>
      <div className="prayTimes grid grid-cols-3 gap-5 text-xl font-mono font-bold max-md:grid-cols-2 max-md:gap-2">
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl ${condition(
            timePray.times.tong_saharlik,
            timePray.times.quyosh,
            time
          )}`}
        >
          Fajr: {timePray.times.tong_saharlik}
        </div>
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl`}
        >
          Sunrise: {timePray.times.quyosh}
        </div>
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl ${condition(
            timePray.times.peshin,
            timePray.times.asr,
            time
          )}`}
        >
          Zuhr: {timePray.times.peshin}
        </div>
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl ${condition(
            timePray.times.asr,
            timePray.times.shom_iftor,
            time
          )}`}
        >
          Asr: {timePray.times.asr}
        </div>
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl ${condition(
            timePray.times.shom_iftor,
            timePray.times.hufton,
            time
          )}`}
        >
          Magrib: {timePray.times.shom_iftor}
        </div>
        <div
          className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl ${
            hufton > splitTime || hufton > bomdod ? "timeToPray" : ""
          }`}
        >
          Isha: {timePray.times.hufton}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
