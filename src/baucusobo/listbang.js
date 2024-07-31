import React, { useEffect, useState } from "react";
function DsBangBCSB({ handShowDetailPage, dataBang }) {
  const config = window.config;
  const [dsBang, setDsBang] = useState([]);

  useEffect(() => {
    setDsBang(dataBang.filter((item) => item.status != 0) || []);
  }, [dataBang]);

  return (
    <div className="box-view">
      <h3 className="title">Xem theo bang</h3>

      <div className="list-wrap">
        {dsBang && dsBang.length > 0
          ? dsBang.map((item, index) => {
              return (
                <div
                  className="item-wrap"
                  key={index}
                  onClick={() => handShowDetailPage("CTB", item.FullName)}
                >
                  <div className="item">{item.FullName}</div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default DsBangBCSB;
