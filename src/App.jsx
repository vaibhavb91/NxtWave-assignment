import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [listData, setListData] = useState([]);
  const [showNewListColumn, setShowNewListColumn] = useState(false);

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
  const handleCreateListClick = () => {
    setShowNewListColumn(true);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>list creation</h1>
        <button style={{ padding: "10px" }} onClick={handleCreateListClick}>
          create a new list
        </button>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input type="checkbox" />
              <h4>List 1: ({list1.length})</h4>
            </div>
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
        {showNewListColumn && (
          <div
            style={{ overflow: "auto", maxHeight: "500px", padding: "30px" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h4>List 3: </h4>
              <ul></ul>
            </div>
          </div>
        )}

        {Array.isArray(list2) && list2.length > 0 && (
          <div
            style={{ overflow: "auto", maxHeight: "500px", padding: "30px" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input type="checkbox" />
              <h4>List 2: ({list2.length})</h4>
            </div>
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
