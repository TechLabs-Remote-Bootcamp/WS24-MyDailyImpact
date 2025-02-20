import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { jwt } from "../../../utils/jwt";
import { ApiError, api } from "../../../utils/api";
import Button from "../../core/Button/Button";
import styles from "./HistoryTable.module.scss";

export default function HistoryTable() {
  const navigate = useNavigate();
  const [userIdent, setUserIdent] = useState(null);
  const data = [
    {
      column1: "Wert1",
      column2: "Wert2",
      column3: "Wert3",
      column4: "Wert4",
    },
    {
      column1: "Wert5",
      column2: "Wert6",
      column3: "Wert7",
      column4: "Wert8",
    },
    // Weitere Objekte...
  ];

  useEffect(() => {
    try {
      const id = getId();
      setUserIdent(id);
    } catch (error) {
      console.error("Error:", error);
      navigate("/login");
    }
  }, []); // Running once at the mount of the component

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

  // just for testing the get request
  const onSubmit2 = async () => {
    try {
      const response = await api.get(`/api/meal-logs/${userIdent}`);
      console.log(response);
      console.log(response.meals);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ApiError) {
        console.error("API Error Status:", error.status);
        console.error("API Error Message:", error.message);
      }
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Spalte 1</th>
            <th>Spalte 2</th>
            <th>Spalte 3</th>
            <th>Spalte 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.column1}</td>
              <td>{item.column2}</td>
              <td>{item.column3}</td>
              <td>{item.column4}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="button" onClick={onSubmit2}>
        Print logs
      </Button>
    </>
  );
}
