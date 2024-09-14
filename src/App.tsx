
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function PaginatorBasicDemo() {
    const [customers, setCustomers] = useState([]);
    const [first, setFirst] = useState<number>(0); 
    const [rows, setRows] = useState<number>(10);   
    const [currentPage, setCurrentPage] = useState<number>(0);

    const sendPageNumber = (page:number) => {
      fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
         .then(response => response.json())
         .then(data => setCustomers(data.data))
  };
    useEffect(() => {
         sendPageNumber(currentPage)
    }, [currentPage]);

    const search= (event) =>{
      setFirst(event.first);
      setRows(event.rows); 
      setCurrentPage(event.page);
    }

    return (
        <div className="card">
            <DataTable value={customers} onPage={search} paginator rows={rows} first={first} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}
        

