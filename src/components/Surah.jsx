import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Home from "./Home";
import SurahList from "./SurahList";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContextUI } from "./UpdateUI";

const Surah = () => {
  const { number } = useParams();
  const [position, setPosition] = useState("bottom");
  const [positionAudio, setPositionAudio] = useState("bottom");
  const [transDataUz, setTransDataUz] = useState(null);
  const [transDataEn, setTransDataEn] = useState(null);
  const [transDataRu, setTransDataRu] = useState(null);
  const [audio, setAudio] = useState(null);
  const [transData, setTransData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState(null);
  const [author, setAuthor] = useState("ar.alafasy");

  const { isLoading, data, isFetching, isError, refetch } = useQuery(
    "surah",
    () => {
      return axios.get(`https://api.alquran.cloud/v1/surah/${number}`);
    }
  );

  useEffect(() => {
    axios
      .get(`https://api.alquran.cloud/v1/surah/${number}/uz.sodik`)
      .then((t) => setTransDataUz(t.data.data));
    axios
      .get(`https://api.alquran.cloud/v1/surah/${number}/en.asad`)
      .then((t) => setTransDataEn(t.data.data));
    axios
      .get(`https://api.alquran.cloud/v1/surah/${number}/ru.kuliev`)
      .then((t) => setTransDataRu(t.data.data));
  }, [transDataRu, transDataEn, transDataUz]);

  // useEffect(() => {
  //   axios
  //     .get(`https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`)
  //     .then((a) => setAudio(a.data.data.ayahs));
  // }, [audio]);

  useEffect(() => {
    if (lang == "uz") {
      setTransData(transDataUz);
    } else if (lang == "ru") {
      setTransData(transDataRu);
    } else {
      setTransData(transDataEn);
    }
  }, [transData, transDataEn, transDataRu, transDataUz]);

  if (isLoading || isFetching || !transData) {
    return <h1>Loading...</h1>;
  }

  //   function condition() {
  //     if (lang == "uz") {
  //       setTransData(transDataUz);
  //     } else if (lang == "ru") {
  //       setTransData(transDataRu);
  //     } else if (lang == "en") {
  //       setTransData(transDataEn);
  //     }
  //   }

  return (
    <>
      <div className="flex w-full overflow-y-scroll h-[88.5vh]">
        <div className="font-mono font-extrabold text-xl w-full flex flex-col gap-6 m-4">
          {data.data.data.ayahs?.map((a, i) => (
            <div
              className="flex flex-col justify-between gap-6 items-start p-8 bg-slate-100 rounded-2xl"
              key={a.number}
            >
              <div className="text flex justify-between gap-10 items-start w-full">
                <h1 className="text-slate-800">
                  {data.data.data.number}:{a.numberInSurah}
                </h1>
                <h1 className="text-right">{a.text}</h1>
              </div>
              <hr className="w-full h-[1px] bg-slate-700 border-slate-700 p-0 m-0" />
              <div className="trans font-medium text-lg font-sans">
                {transData.ayahs[i].text}
              </div>
              <audio src={audio} controls />
            </div>
          ))}
        </div>
      </div>
      <div className="changeLang mx-10 mt-2 flex flex-col items-center justify-start gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={"bg-slate-300 font-bold text-base"}
            >
              Change Language
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem
                value="top"
                onClick={() => {
                  setLang("uz");
                }}
              >
                Uzbek
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="bottom"
                onClick={() => {
                  setLang("en");
                }}
              >
                English
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="right"
                onClick={() => {
                  setLang("ru");
                }}
              >
                Russian
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={"bg-slate-300 font-bold text-base"}
            >
              Change Hafiz
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={positionAudio}
              onValueChange={setPositionAudio}
              className="overflow-y-scroll h-50"
            >
              <DropdownMenuRadioItem value="top">Uzbek</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                English
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                Russian
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Surah;
