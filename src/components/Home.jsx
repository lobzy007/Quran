import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import moon from "./img/150396-quran-holy-free-hq-image2.png";
import { Link } from "react-router-dom";

const fetchData = () => {
  return axios.get("https://api.alquran.cloud/v1/surah");
};

const Home = () => {
  const { isLoading, data, isFetching, isError } = useQuery("surah", fetchData);

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  console.log(data.data.data);

  return (
    <div className="grid p-2 grid-cols-3 gap-4 font-mono font-extrabold text-xl m-6">
      {data.data.data?.map((s) => (
        <Link
          to={`/surah/${s.number}`}
          key={s.number}
          className="bg-[#3e3cc444] transition-all cursor-pointer p-4 flex items-center gap-2 rounded-2xl justify-between hover:scale-105"
        >
          <div className="img relative flex flex-col items-center gap-2">
            <img src={moon} alt="moon" className="mix-blend-multiply w-14" />
            <p className="absolute top-[-10px] text-center text-xl text-slate-800">
              {s.number}
            </p>
          </div>
          <div className="name flex flex-col items-center justify-center text-center">
            <h1>{s.englishName}</h1>
            <h3 className="text-slate-600">{s.englishNameTranslation}</h3>
          </div>
          <h1>{s.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Home;
