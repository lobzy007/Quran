import axios from "axios";
import React, { useEffect, useState } from "react";

const PrayerTimes = () => {
  const [timePray, setTimePray] = useState(null);
  const [now, setNow] = useState()
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
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

  console.log(timePray);

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      <div className="now text-2xl font-mon font-bold text-slate-600">Time: {time}</div>
      <div className="prayTimes grid grid-cols-3 gap-5 text-xl font-mono font-bold">
        <div className={`bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl`}>
          Fajr: {timePray.times.tong_saharlik}
        </div>
        <div className="bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl">
          Sunrise: {timePray.times.quyosh}
        </div>
        <div className="bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl">
          Zuhr: {timePray.times.peshin}
        </div>
        <div className="bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl">
          Asr: {timePray.times.asr}
        </div>
        <div className="bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl">
          Magrib: {timePray.times.shom_iftor}
        </div>
        <div className="bomdod px-10 py-8 border-2 border-slate-500 bg-slate-300 flex justify-center items-center rounded-2xl">
          Isha: {timePray.times.hufton}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
