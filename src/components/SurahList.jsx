import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Surah from "./Surah";
import { ContextUI } from "./UpdateUI";

const SurahList = () => {
  const { isLoading, data, isFetching, isError, refetch } = useQuery(
    "surahs",
    () => {
      return axios.get(`https://api.alquran.cloud/v1/surah`);
    }
  );
  const { number } = useParams();
  //   const [state, setState] = useState();
  const { setState, state } = useContext(ContextUI);
  const navigate = useNavigate();

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex mt-4 ml-4 mr-4">
      <div className="flex flex-col font-mono font-extrabold gap-1 text-l text-left overflow-y-scroll h-[88.5vh] w-[400px]">
        {data.data.data?.map((s) => (
          <NavLink
            to={`/surah/${s.number}`}
            onClick={() => {
              //   navigate(`/surah/${s.number}`);
              refetch();
              setState(s.number);
            }}
            key={s.number}
            className="bg-[#3e3cc444] transition-all mr-[1px] cursor-pointer p-2 flex items-center gap-2 rounded-2xl justify-start hover:bg-[#3e3cc46c]"
          >
            <p className="w-10 flex justify-center items-center h-10 bg-slate-600 rounded-full  text-center text-xl text-slate-800">
              {s.number}
            </p>
            <div className="name flex flex-col items-start justify-center text-start">
              <h1>{s.englishName}</h1>
              <h3 className="text-slate-600">{s.englishNameTranslation}</h3>
            </div>
          </NavLink>
        ))}
        {/* <Surah numberState={state} /> */}
      </div>
      <Outlet />
    </div>
  );
};

export default SurahList;
