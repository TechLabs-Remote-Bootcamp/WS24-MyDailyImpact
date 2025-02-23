import { useEffect, useState, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { jwt } from "../../../utils/jwt";
import { ApiError, api } from "../../../utils/api";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
  }),
  //   columnHelper.accessor((row) => row.lastName, {
  //     id: "lastName",
  //     cell: (info) => <i>{info.getValue()}</i>,
  //     header: () => <span>Last Name</span>,
  //   }),
  columnHelper.accessor("category", {
    header: () => "Category",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("mealName", {
    header: () => <span>Meal name</span>,
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
  }),
];

export default function Tanstack() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        if (!token.id) {
          throw new Error("No user ID found in token");
        }

        // Fetch meals data
        const response = await api.get(`/api/meal-logs/${token.id}`);
        if (response) {
          setData(response.meals);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(
          error instanceof ApiError ? error.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const print = () => {
    const logs = data;
    console.log("data --", logs[12].mealName);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <button onClick={print}>Print log</button>
      <div />
    </div>
  );
}
