import "./App.css";
import React, { useState, useEffect } from "react";
import PageBCSB from "./baucusobo/index";
import PageCTB from "./chitetbang/index";
import TongTuyenCu from "./tongtuyencu";

function App() {
  const [isPage, setPage] = useState("BCSB");
  const [bang, setBang] = useState("");

  useEffect(() => {}, []);

  const ShowDetailPage = (page, data) => {
    setPage(page);
    setBang(data);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {isPage == "CTB" && (
        <PageCTB bang={bang} ShowDetailPage={ShowDetailPage} />
      )}
      {isPage == "BCSB" && (
        <PageBCSB ShowDetailPage={ShowDetailPage}></PageBCSB>
      )}
      {isPage == "TTC" && (
        <TongTuyenCu ShowDetailPage={ShowDetailPage}></TongTuyenCu>
      )}
    </div>
  );
}

export default App;
