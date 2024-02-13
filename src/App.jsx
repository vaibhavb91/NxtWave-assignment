import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        setListData(response.data.lists);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const filterEvenOddElements = (elements, isEven) => {
    return elements.filter((_, index) => index % 2 === (isEven ? 0 : 1));
  };

  const list1 = filterEvenOddElements(listData, true);
  const list2 = filterEvenOddElements(listData, false);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>list creation</h1>
        <button style={{ padding: "10px" }}>create a new list</button>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          marginTop: "20px",
        }}
      >
        {Array.isArray(list1) && list1.length > 0 && (
          <div
            style={{ overflow: "auto", maxHeight: "500px", padding: "30px" }}
          >
            <h2>List 1:</h2>
            <ul>
              {list1.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid",
                    margin: "10px",
                    width: "80%",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </li>
                  <li style={{ display: "flex", flexDirection: "column" }}>
                    {item.description}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(list2) && list2.length > 0 && (
          <div
            style={{ overflow: "auto", maxHeight: "500px", padding: "30px" }}
          >
            <h2>List 2:</h2>
            <ul>
              {list2.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid",
                    margin: "10px",
                    width: "80%",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </li>
                  <li style={{ display: "flex", flexDirection: "column" }}>
                    {item.description}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
