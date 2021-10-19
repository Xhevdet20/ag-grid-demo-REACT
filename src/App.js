import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const App = () => {
	const [gridApi, setGridApi] = useState(null);

	const columns = [
		{ headerName: "Athlete", field: "athlete" },
		{ headerName: "Age", field: "age" },
		{ headerName: "Country", field: "country" },
		{ headerName: "Year", field: "year" },
		{ headerName: "Date", field: "date" },
		{ headerName: "Sport", field: "sport" },
		{ headerName: "Gold", field: "gold" },
		{ headerName: "Silver", field: "silver" },
		{ headerName: "Bronze", field: "bronze" },
		{ headerName: "Total", field: "total" },
	];

	const defaultColDef = {
		filter: true,
		floatingFilter: true,
		filter: "agTextColumnFilter",
		sortable: true,
	};

	const datasource = {
		getRows(params) {
			console.log(JSON.stringify(params.request, null, 1));
			const { startRow, endRow, filterModel, sortModel } = params.request;
			let url = "http://localhost:4000/olympic?";
			// sorting
			if (sortModel.length) {
				const { colId, sort } = sortModel[0];
				url += `_sort=${colId}&_order=${sort}&`;
			}

			// Filtering
			const filterKeys = Object.keys(filterModel);
			filterKeys.forEach((filter) => {
				url += `${filter}=${filterModel[filter].filter}&`;
			});
			url += `_start=${startRow}&_end=${endRow}`;
			// Pagination
			fetch(url)
				.then((httpResponse) => httpResponse.json())
				.then((response) => {
					params.successCallback(response, 499);
				})
				.catch((error) => {
					console.error(error);
					params.failCallback();
				});
		},
	};

	// register datasource with the grid

	const onGridReady = (params) => {
		setGridApi(params.api);

		params.api.setServerSideDatasource(datasource);
	};

	return (
		<div>
			<div className="ag-theme-alpine" style={{ height: "500px" }}>
				<AgGridReact
					columnDefs={columns}
					defaultColDef={defaultColDef}
					rowModelType="serverSide"
					onGridReady={onGridReady}
					paginationPageSize={8}
					domLayout="autoHeight"
					serverSideStoreType="partial"
					pagination={true}
				></AgGridReact>
			</div>
		</div>
	);
};

export default App;
