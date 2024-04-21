import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Home from "./components/Home";
import axios from "axios";
import Surah from "./components/Surah";
import SurahList from "./components/SurahList";
import { ContextUI } from "./components/UpdateUI";
import { useState } from "react";
import PrayerTimes from "./components/PrayerTimes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const [state, setState] = useState();

  return (
    <ContextUI.Provider value={{ setState, state }}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/time" element={<PrayerTimes />} />
          <Route path="/surah" element={<SurahList />}>
            <Route path=":number" element={<Surah />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ContextUI.Provider>
  );
}

export default App;

// suralar https://api.alquran.cloud/v1/surah
// mualif bo'yicha detail suralar https://api.alquran.cloud/v1/surah/${number}/${author}
// number surani nomeri, author qori misol uchun ar.alafasy
// detail surah tillar boyicha https://api.alquran.cloud/v1/surah/${number}/${lang}
// number surani nomeri, lang til bo'yicha misol uchun uz
// namoz vaqtlari https://islomapi.uz/api/present/day?region=Toshkent
