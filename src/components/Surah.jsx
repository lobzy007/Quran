import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Home from "./Home";
import SurahList from "./SurahList";
import AudioPlayer from "react-h5-audio-player";
import ReactAudioPlayer from "react-audio-player";
import "react-h5-audio-player/lib/styles.css";
import audioBtn from "./img/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL2pvYjEzMzgtZWxlbWVudC0zNi1wLnBuZw.webp";
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
import Player from "./AudioPlayer";

const Surah = () => {
  const { number } = useParams();
  const [position, setPosition] = useState("bottom");
  const [positionAudio, setPositionAudio] = useState("bottom");
  const [transDataUz, setTransDataUz] = useState(null);
  const [transDataEn, setTransDataEn] = useState(null);
  const [transDataRu, setTransDataRu] = useState(null);
  const [transData, setTransData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState(null);
  const [author, setAuthor] = useState("ar.alafasy");
  // const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState("none");
  const [audioPlayer, setAudioPlayer] = useState(false);

  const { isLoading, data, isFetching, isError, refetch } = useQuery(
    "surah",
    () => {
      return axios.get(`https://api.alquran.cloud/v1/surah/${number}`);
    }
  );

  const { isLoading: audioLoading, data: audio } = useQuery(
    "audioSurah",
    () => {
      return axios.get(
        `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`
      );
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

  // const audioPlaying = (i) => {
  //   setIsPlaying(i);
  // };

  // const [isPlaying, setIsPlaying] = useState(
  //   Array(audio.data.data.ayahs.length).fill(false)
  // );

  // console.log(audioPlayer);

  if (isLoading || isFetching || audioLoading || !transData) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  console.log(isPlaying);

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
    <div className="flex w-full max-md:flex-col-reverse max-md:w-full">
      <div className="flex w-full overflow-y-scroll h-[88.5vh] max-md:h-[75.5vh]">
        <div className="font-mono font-extrabold text-xl w-full flex flex-col gap-6 m-4 max-[500px]:m-[4px]">
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
              {/* <ReactAudioPlayer src={audio.data.data.ayahs[i].audio} controls /> */}
              {audio &&
                audio.data &&
                audio.data.data &&
                audio.data.data.ayahs && (
                  <button
                    onClick={() => {
                      setAudioPlayer(true);
                      setIsPlaying(i);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        isPlaying === i ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                      />
                    </svg>
                  </button>
                )}
              {/* <AudioPlayer
                src={audio.data.data.ayahs[i].audio}
                // autoPlay={isPlaying[i]}
                showJumpControls={"false"}
                onEnded={handleAudioEnded}
                onPlay={() => handlePlayAudio(i)}
                // onEnded={}
                // other props here
              /> */}
              {/* <audio src={audio.data.data.ayahs[i].audio} controls /> */}
            </div>
          ))}
        </div>
      </div>
      <div className="changeLang mx-10 mt-2 flex flex-col items-center justify-start gap-6 ">
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

        {/* <DropdownMenu>
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
        </DropdownMenu> */}
      </div>
      {/* <Player
        src={`${
          isPlaying !== "none"
            ? `${audio.data.data.ayahs[isPlaying].audio}`
            : " "
        }`}
        isPlaying={isPlaying}
        number={number}
        hiddenOrNot={`${isPlaying >= 0 ? " " : "hidden"}`}
      /> */}
      <div
        className={`w-[90%] h-[100px] align-bottom fixed bottom-0 left-0 right-1 m-auto p-0 ${
          isPlaying >= 0 ? " " : "hidden"
        }`}
      >
        <AudioPlayer
          src={`${
            isPlaying !== "none"
              ? `${audio.data.data.ayahs[isPlaying].audio}`
              : " "
          }`}
          // autoPlay={isPlaying[i]}
          autoPlay
          className={`rounded-2xl border-slate-600 border-4 text-slate-700 bg-slate-300 `}
          // showJumpControls={"false"}
          controls
          onEnded={() => setIsPlaying(isPlaying + 1)}
          // other props here
        />
      </div>
    </div>
  );
};

export default Surah;
