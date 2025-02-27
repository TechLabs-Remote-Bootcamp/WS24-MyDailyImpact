import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ApiError, api } from "../../../utils/api";
import { useImpactMetrics } from "../../../context/ImpactMetricsContext";
import styles from "./HistoryTable.module.scss";

export default function HistoryTable() {
  const [token, setToken] = useState(null);
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { decreaseMetrics, loadMetrics } = useImpactMetrics();

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
      setToken(token);
      console.log(token);
      if (!token.id) {
        throw new Error("No user ID found in token");
      }

      // Fetch meals data
      const response = await api.get(`/api/meal-logs/${token.id}`);
      if (response) {
        setLogs(response.meals);
        setCount(response.totalLogs);
        console.log(response.totalLogs);
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

  const counting = () => {
    setCount(logs.length);
    console.log("count", count);
    let x = document.getElementsByName("logRow");
    console.log("x", x.length);
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run once on mount

  useEffect(() => {
    counting();
  }, [logs]); // Runs when logs are changing

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

  async function deleteMealLog(mealId) {
    console.log("Deleting meal:", mealId);
    try {
      // Find the meal to be deleted to get its category (needed for metrics update)
      const mealToDelete = logs.find((log) => log._id === mealId);
      if (!mealToDelete) {
        throw new Error("Meal not found");
      }
      console.log("Meal to delete:", mealToDelete);

      const response = await fetch(
        `http://localhost:5001/api/meal-logs/meal/${mealId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: api.setAuthHeader(token),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete meal log, status: " + response.status
        );
      }

      const data = await response.json();
      console.log("Delete response data:", data);

      // Update the impact metrics to reflect the deletion
      if (token && token.id) {
        console.log("Decreasing metrics for:", mealToDelete.category);
        await decreaseMetrics(mealToDelete.category, token.id);

        // Force reload metrics to ensure everything is up to date
        await loadMetrics(token.id);
        console.log("Metrics updated after deletion");
      }

      // Remove the deleted meal from the logs state
      setLogs(logs.filter((log) => log._id !== mealId));
      console.log(logs);
      console.log("Updated logs after deletion");
      setCount((prev) => prev - 1);

      // Optional: Show a success message to the user
      alert("Meal deleted successfully and impact metrics updated!");

    } catch (error) {
      console.error("Error deleting meal log:", error);
      setError(
        "An error occurred while deleting the meal log: " + error.message
      );
      alert("Failed to delete meal: " + error.message);
    }
  }

  // Add a function to go back to dashboard (forcing a reload)
  const backToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <p className={styles.textLine}>Total logs: {count}</p>
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
              <tr key={item._id} name="logRow">
                <td>{formatDate(item.date)}</td>
                <td>{item.category}</td>
                <td>{item.mealName}</td>
                <td>{item.notes}</td>
                <td className={styles.actions}>
                  <button onClick={() => deleteMealLog(item._id)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                        stroke="#5055BA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
