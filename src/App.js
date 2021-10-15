import React, {useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {

  const [gridApi, setGridApi]= useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hideColumn,setHideColumn]=useState(false)
  const [rowData, setRowData]= useState([
    {id: 1, name: 'Neeraj', email:'neraj@gmail.com', dob: '23/01/1996'},
    {id: 2, name: 'Raj', email:'raj@gmail.com', dob: '08/08/1996'},
    {id: 3, name: 'Negjmedin', email:'nexhi@gmail.com', dob: '09/09/1964'},
    {id: 4, name: 'Shukri', email:'shuki@gmail.com', dob: '01/01/2020'},
  ])

  // select through checkbox and header selection for all items 
  // {headerName: "Id", field: 'id', checkboxSelection : true, headerCheckboxSelection : true},

   const columnDefs = [
     {headerName: "Id", field: 'id',},
     {headerName: "Name", field: 'name'},
     {headerName: "Email", field: 'email'},
     {headerName: "Date of Birth", field: 'dob'},
   ]

   const searchDivStyle ={backgroundColor: '#dedede',padding: 10}
   const searchStyle ={width: '100%', padding: '10px 20px',borderRadius: 20, outline: 0, border: '2px #68bf40 solid', fontSize: '100%'}

   const defaultColDef = {
    //  sortable: true,
    //  editable: true,
     flex:1,
    //  filter: true,
    //  floatingFilter: true
   }

   const onGridReady = (params) => {
     setGridApi(params.api);
     setGridColumnApi(params.columnApi);

   }

   const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
   }

   return (
      <div>
        <div style={searchDivStyle}>
          <input 
            type="search" 
            style={searchStyle} 
            onChange={onFilterTextChange} 
            placeholder="Search something..."
          />
        </div>
         <div className="ag-theme-alpine" style={{height: '500px'}}>
           <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}    
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}>
               <AgGridColumn field="id"></AgGridColumn>
               <AgGridColumn field="name"></AgGridColumn>
               <AgGridColumn field="email"></AgGridColumn>
               <AgGridColumn field="body"></AgGridColumn>
           </AgGridReact>
       </div>
      </div>
   );
};

export default App;