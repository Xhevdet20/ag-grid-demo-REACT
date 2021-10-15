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

   const defaultColDef = {
     sortable: true,
     editable: true,
     flex:1,
     filter: true,
     floatingFilter: true
   }

   const onGridReady = (params) => {
     setGridApi(params.api);
     setGridColumnApi(params.columnApi);
    // fetch('https://jsonplaceholder.typicode.com/comments')
    //   .then(resp => resp.json())
    //   .then(res => {
    //     params.api.applyTransaction({add: res})
    //     params.api.paginationGoToPage(10)
    //   });
   }

  //  const onPaginationChange =(pageSize) => {
  //    gridApi.api.paginationSetPageSize(pageSize) 
  //  }

  //  const rowSelectionType = "multiple";

  //  const onSelectionChanged = (event) => {
  //    console.log(event.api.getSelectedRows());

  //  const isRowSelectable = (node) => {
  //    return node.data?(node.data.id%2===0 || node.data.email.includes('.org')):false;
  //  }

  const showColumn=()=>{
    // for single column
    // gridColumnApi.setColumnVisible('dob',hideColumn) 
   
   // for multiple columns
    gridColumnApi.setColumnsVisible(['dob', 'email'],hideColumn)
    setHideColumn(!hideColumn)
   // to fit the size of column
    gridApi.sizeColumnsToFit()
  }

   return (
      <div>
         {/* <select onChange={(e) =>onPaginationChange(e.target.value)}>
           <option value='10' >10</option>
           <option value='25'>25</option>
           <option value='50'>50</option>
           <option value='100'>100</option>
         </select>   */}
         <button onClick={showColumn}>Show DOB</button>
         <div className="ag-theme-alpine" style={{height: '500px'}}>
           <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}    
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}

            // pagination={true}
            // paginationPageSize={10}
            
            // rowSelection={rowSelectionType}
            // onSelectionChanged={onSelectionChanged}
            // rowMultiSelectWithClick={true}
            // isRowSelectable={isRowSelectable}

               >
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