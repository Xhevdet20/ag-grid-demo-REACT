import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import _ from "lodash";

const App = () => {
	const [gridApi, setGridApi] = useState(null);
	const [searchText, setSearchText] = useState("");

	const columns = [
		{
			headerName: "Athlete",
			field: "athlete",
			filter: "agTextColumnFilter",
			// cellRenderer: "loading",
		},
		{ headerName: "Age", field: "age", filter: "agTextColumnFilter" },
		{ headerName: "Country", field: "country", filter: "agTextColumnFilter" },
		{ headerName: "Year", field: "year", filter: "agTextColumnFilter" },
		{ headerName: "Date", field: "date", filter: "agTextColumnFilter" },
		{ headerName: "Sport", field: "sport", filter: "agTextColumnFilter" },
		{ headerName: "Gold", field: "gold", filter: "agTextColumnFilter" },
		{ headerName: "Silver", field: "silver", filter: "agTextColumnFilter" },
		{ headerName: "Bronze", field: "bronze", filter: "agTextColumnFilter" },
		{ headerName: "Total", field: "total", filter: "agTextColumnFilter" },
	];

	useEffect(() => {
		if (gridApi) {
			onGridReady(gridApi);
		}
	}, [searchText]);

	const search = _.debounce((text) => {
		setSearchText(text);
	}, 1000);

	const datasource = {
		getRows(params) {
			console.log(JSON.stringify(params.request, null, 1));
			const { startRow, endRow, filterModel, sortModel } = params.request;
			let url = "http://localhost:4000/olympic?";
			//Quick filter
			if (searchText) {
				url += `q=${searchText}&`;
			}

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

	const onGridReady = (params) => {
		setGridApi(params);
		// register datasource with the grid
		params.api.setServerSideDatasource(datasource);
	};
	// const components = {
	// 	loading: (params) => {
	// 		if (params.value !== undefined) {
	// 			return params.value;
	// 		} else {
	// 			return "<img src='https://www.ag-grid.com/example-assets/loading.gif'/>";
	// 		}
	// 	},
	// };	defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
	return (
		<div>
			<h1 align="center">React-App</h1>
			<h4 align="center">Implement Infinite Scroll in ag Grid</h4>
			<input
				type="search"
				placeholder="search something..."
				style={{ padding: 10, fontSize: "105%", width: "100%", outline: 0 }}
				onChange={(e) => search(e.target.value)}
			/>
			<div className="ag-theme-alpine" style={{ height: 400 }}>
				<AgGridReact
					columnDefs={columns}
					defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
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
