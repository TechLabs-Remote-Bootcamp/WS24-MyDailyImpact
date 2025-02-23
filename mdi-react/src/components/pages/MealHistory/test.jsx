import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";

export default function Test() {
  //   const nodes = [
  //     {
  //       id: "0",
  //       name: "Shopping List",
  //       deadline: new Date(2020, 1, 15),
  //       type: "TASK",
  //       isComplete: true,
  //       nodes: 3,
  //     },
  //   ];

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

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        DATE: (array) => array.sort((a, b) => a.date - b.date),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const key = "Compact Table";

  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    {
      label: "Date",
      renderCell: (item) => item.date,
    },
    { label: "Category", renderCell: (item) => item.category },
    { label: "Meal name", renderCell: (item) => item.mealName },
    {
      label: "Notes",
      renderCell: (item) => item.notes,
    },
  ];

  return <CompactTable columns={COLUMNS} data={data} theme={theme} />;
}
