import React, { useMemo } from "react";
import {
  MRT_FullScreenToggleButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
} from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import PrintIcon from "@mui/icons-material/Print";

const BasicTable = () => {
  const GeoUrl = `http://localhost:5000/api/v1/territory?populate=yes&count=yes&page=1&limit=none&sort=-createdAt`;

  // functionalities
  const fetchTodoList = () => {
    return axios.get(GeoUrl);
  };

  // get data
  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: ["geo"],
    queryFn: fetchTodoList,
  });

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
        enableClickToCopy: true,
        // accessorFn: (row) => <b>{row.name.firstName}</b>,
        // Cell: ({ cell }) => console.log(cell.getValue()),
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 150,
      },
      {
        accessorKey: "parentTerritory.name", //normal accessorKey
        header: "Parent Territory",
        size: 200,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },
      {
        accessorKey: "territoryType.territoryType",
        header: "Territory Type",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
    ],
    []
  );

  return (
    <Box p={2}>
      <MaterialReactTable
        columns={columns}
        data={data?.data?.data ?? []}
        enableColumnActions={false}
        enableRowNumbers={false}
        enableColumnFilters={true} //filter all separate columns
        enablePagination={true}
        enableBottomToolbar={true}
        enableSorting={true}
        enableTopToolbar={true}
        initialState={{ density: "compact" }}
        state={{
          showAlertBanner: isError,
          showProgressBars: isLoading,
        }}
        muiLinearProgressProps={({ isTopToolbar }) => ({
          sx: {
            display: isTopToolbar ? "block" : "none",
          },
        })}
        //customize built-in buttons in the top-right of top toolbar
        renderToolbarInternalActions={({ table }) => (
          <Box>
            {/* add custom button to print table  */}
            <IconButton
              onClick={() => {
                window.print();
              }}
            >
              <PrintIcon />
            </IconButton>
            {/* along-side built-in buttons in whatever order you want them */}
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <MRT_FullScreenToggleButton table={table} />
          </Box>
        )}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "netwrok error",
              }
            : undefined
        }
      />
    </Box>
  );
};

export default BasicTable;
