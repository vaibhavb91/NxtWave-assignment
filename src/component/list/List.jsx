import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import "./list.css";

const List = () => {
  const [listData, setListData] = useState([]);
  const [showNewListColumn, setShowNewListColumn] = useState(false);
  const [isList1Checked, setList1Checked] = useState(false);
  const [isList2Checked, setList2Checked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTransferArrow, setShowTransferArrow] = useState(false);
  const [newList, setNewList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        setListData(response.data.lists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
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
    if (isList1Checked && isList2Checked) {
      setShowNewListColumn(true);
      setShowTransferArrow(true);
      setList1Checked(false);
      setList2Checked(false);
    } else {
      alert("Please check both List 1 and List 2 before creating a new list");
    }
  };

  const handleLeftArrowClick = (item) => {
    handleTransferItem(item, "newList", "list1");
  };

  const handleRightArrowClick = (item) => {
    handleTransferItem(item, "newList", "list2");
  };

  const handleTransferItem = (item, fromList, toList) => {
    if (fromList === "list1" || fromList === "list2") {
      setListData((prevList) =>
        prevList.filter((listItem) => listItem !== item)
      );
      setNewList((prevList) => [
        ...prevList,
        { ...item, transferredToList: fromList },
      ]);
      setShowTransferArrow(true);
    } else if (
      fromList === "newList" &&
      (toList === "list1" || toList === "list2")
    ) {
      setNewList((prevList) =>
        prevList.filter((listItem) => listItem !== item)
      );

      setListData((prevList) => [
        ...prevList,
        { ...item, transferredToList: toList },
      ]);
      setShowTransferArrow(true);
    } else {
      setShowTransferArrow(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>List Creation</h1>
        <button
          className="button"
          style={{ padding: "10px" }}
          onClick={handleCreateListClick}
        >
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
            style={{ overflow: "auto", maxHeight: "500px", padding: "13px" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="checkbox"
                checked={isList1Checked}
                onChange={() => setList1Checked(!isList1Checked)}
              />
              <h4>List 1: ({list1?.length})</h4>
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
                    padding: "17px 20px",
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
                  {showTransferArrow && (
                    <span
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        fontSize: "34px",
                        display: "flex",
                        justifyContent: "right",
                      }}
                      onClick={() => handleTransferItem(item, "list1")}
                    >
                      &#8594;
                    </span>
                  )}
                </div>
              ))}
            </ul>
          </div>
        )}
        {showNewListColumn && (
          <div
            style={{ overflow: "auto", maxHeight: "500px", padding: "13px" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h4>New List: ({showNewListColumn?.length}) </h4>
            </div>
            <ul>
              {newList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid",
                    margin: "10px",
                    width: "80%",
                    borderRadius: "10px",
                    padding: "17px 20px",
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
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        fontSize: "40px",
                      }}
                      onClick={() => handleLeftArrowClick(item)}
                    >
                      &#8594;
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        fontSize: "40px",
                      }}
                      onClick={() => handleRightArrowClick(item)}
                    >
                      &#8592;
                    </span>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(list2) && list2.length > 0 && (
          <div
            style={{
              overflow: "auto",
              maxHeight: "500px",
              padding: "13px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="checkbox"
                checked={isList2Checked}
                onChange={() => setList2Checked(!isList2Checked)}
              />
              <h4>List 2: ({list2?.length})</h4>
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
                    padding: "17px 20px",
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
                  {showTransferArrow && (
                    <span
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        fontSize: "34px",
                        display: "flex",
                        justifyContent: "left",
                      }}
                      onClick={() => handleTransferItem(item, "list2")}
                    >
                      &#8592;
                    </span>
                  )}{" "}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
