import React from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {

   const columnDefs = [
     {headerName: "Id", field: 'id'},
     {headerName: "Name", field: 'name'},
     {headerName: "Email", field: 'email'},
     {headerName: "Body", field: 'body'},
   ]

   const defaultColDef = {
     sortable: true,
     editable: true,
     flex:1,
     filter: true,
     floatingFilter: true
   }

   const onGridReady = (params) => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(resp => resp.json())
      .then(res => params.api.applyTransaction({add: res}));
   }

   const rowSelectionType = "single";

   const onSelectionChanged = (event) => {
     console.log(event.api.getSelectedRows());
   }

   return (
       <div className="ag-theme-alpine" style={{height: 400}}>
           <AgGridReact
            columnDefs={columnDefs}    
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
               >
               <AgGridColumn field="id"></AgGridColumn>
               <AgGridColumn field="name"></AgGridColumn>
               <AgGridColumn field="email"></AgGridColumn>
               <AgGridColumn field="body"></AgGridColumn>
           </AgGridReact>
       </div>
   );
};

export default App;