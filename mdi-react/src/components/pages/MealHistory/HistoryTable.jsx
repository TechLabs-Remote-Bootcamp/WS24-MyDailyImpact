import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { jwt } from "../../../utils/jwt";
import { ApiError, api } from "../../../utils/api";
import Button from "../../core/Button/Button";
import trash from "../../../images/tabler_trash.svg";
import form from "../../../styles/forms.module.scss";
import styles from "./HistoryTable.module.scss";

export default function HistoryTable() {
  const navigate = useNavigate();
  const [userIdent, setUserIdent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const logSchema = {
    mealName: "",
    category: "",
    date: new Date(),
    notes: "",
  };
  let data = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user ID from token
        const jwt =
          localStorage.getItem("auth_token") ||
          sessionStorage.getItem("auth_token");
        if (!jwt) {
          throw new Error("No auth token found");
        }
        const token = jwtDecode(jwt, { header: false });
        console.log(token.id);
        if (!token.id) {
          throw new Error("No user ID found in token");
        }

        // Fetch meals data
        const response = await api.get(`/api/meal-logs/${token.id}`);
        if (response) {
          setLogs(response.meals);
          console.log(logs);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(
          error instanceof ApiError ? error.message : "An API error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    // const convertToLogObject = () => {
    //   if (!logs || logs.length === 0) {
    //     console.log("Keine Logs zum Konvertieren vorhanden");
    //     return [];
    //   }
    //   const convertedLogs = logs.map((log) => ({
    //     mealName: log.mealName,
    //     category: log.category,
    //     date: formatDate(log.date),
    //     notes: log.notes,
    //     id: log._id, // Falls Sie die ID später brauchen
    //     userId: log.userId, // Falls Sie die userId später brauchen
    //   }));
    //   console.log("Konvertierte Logs:", convertedLogs);
    //   return convertedLogs;
    // };

    fetchData();
    // data = convertToLogObject();
    // console.log(data[2]);
  }, []); // Only run once on mount

  // When data-set is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  function formatDate(logDate) {
    const dateObj = new Date(logDate);
    const formattedDate = dateObj.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  const print = () => {
    console.log(data);
    // const x = logs;
    // console.log("data --", x[12].mealName);
    // return <p>{data}</p>;
  };

  return (
    <div className={styles["formpage-grid"]}>
      <section className={styles.formSection}>
        <table className={styles.tableContainer}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Meal name</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tabelBody}>
            {logs.map((item) => (
              <tr key={item._id}>
                <td>{formatDate(item.date)}</td>
                <td>{item.category}</td>
                <td>{item.mealName}</td>
                <td>{item.notes}</td>
                <td>Icon</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={form.buttonSection}>
        <Button type="button">Print logs</Button>
      </section>
    </div>
  );
}
