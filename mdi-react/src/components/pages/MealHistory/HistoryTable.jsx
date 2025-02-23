import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { jwt } from "../../../utils/jwt";
import { ApiError, api } from "../../../utils/api";
import Button from "../../core/Button/Button";
import Test from "./test";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import styles from "./HistoryTable.module.scss";

export default function HistoryTable() {
  const nodes = [
    {
      _id: "67b70d15b92424d24c70dad2",
      userId: "67a9adbd385b8cacf1720289",
      mealName: "Brezel",
      category: "Breakfast",
      date: "2024-08-14T10:07:41.000Z",
      notes: "",
      updatedAt: "2025-02-20T11:08:05.347Z",
      user: "67a9adbd385b8cacf1720289",
      __v: 0,
    },
    {
      _id: "67b70d15b92424d24c70dad2",
      userId: "67a9adbd385b8cacf1720289",
      mealName: "Müsli",
      category: "Lunch",
      date: "2024-09-14T10:07:41.000Z",
      notes: "",
      updatedAt: "2025-02-20T11:08:05.347Z",
      user: "67a9adbd385b8cacf1720289",
      __v: 0,
    },
    {
      _id: "67b70d15b92424d24c70dad2",
      userId: "67a9adbd385b8cacf1720289",
      mealName: "Curry",
      category: "Dinner",
      date: "2024-10-4T10:07:41.000Z",
      notes: "",
      updatedAt: "2025-02-20T11:08:05.347Z",
      user: "67a9adbd385b8cacf1720289",
      __v: 0,
    },
  ];
  const navigate = useNavigate();
  const [userIdent, setUserIdent] = useState(null);
  const [logs, setLogs] = useState(nodes);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(getTheme());

  // Just getting the User-ID
  useEffect(() => {
    try {
      const id = getId();
      setUserIdent(id);
    } catch (error) {
      console.error("Error:", error);
      navigate("/login");
    }
  }, []); // Running once at the mount of the component

  // This useEffect runs if userIdent changes
  useEffect(() => {
    if (userIdent) {
      fetchData();
    }
  }, [userIdent]); // Dependent on userIdent

  function getId() {
    const jwt =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    if (!jwt) {
      throw new Error("No auth token found");
    }
    const token = jwtDecode(jwt, { header: false });
    if (!token.id) {
      throw new Error("No user ID found in token");
    }
    console.log(token.id);
    return token.id;
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/meal-logs/${userIdent}`);
      if (response) {
        setLogs(response.meals);
        console.log("Alle meals:", response.meals);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    } finally {
      setLoading(false);
      console.log("Jetzt:", logs.logs);
    }
  };

  // When data-set is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  const print = () => {
    const data = logs;
    console.log("data --", data[12].mealName);
    return <p>{data}</p>;
  };
  return (
    <section className={styles.tableContainer}>
      {/* <Table data={logs} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Category</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Notes</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.mealName}</Cell>
                  <Cell>
                    {item.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Cell>
                  <Cell>{item.catogory}</Cell>
                  <Cell>{item.notes}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table> */}
      {/* <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Meal name</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((item) => (
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.mealName}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Test></Test>
      <Button type="button" onClick={print}>
        Print logs
      </Button>
    </section>
  );
}
