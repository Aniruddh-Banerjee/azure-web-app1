import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count,setCount] = useState(0);
  let navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakerapi.it/api/v2/persons?_quantity=23");
        console.log(response.data.data)
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  // const data = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@maqsoftware.com",
  //     country: "USA",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@maqsoftware.com",
  //     country: "UK",
  //   },
  //   {
  //     id: 3,
  //     name: "Carlos Diaz",
  //     email: "carlos.diaz@maqsoftware.com",
  //     country: "Mexico",
  //   },
  //   {
  //     id: 4,
  //     name: "Anna Lee",
  //     email: "anna.lee@maqsoftware.com",
  //     country: "Canada",
  //   },
  //   {
  //     id: 5,
  //     name: "Liam Wong",
  //     email: "liam.wong@maqsoftware.com",
  //     country: "China",
  //   },
  //   {
  //     id: 6,
  //     name: "Emily Davis",
  //     email: "emily.davis@maqsoftware.com",
  //     country: "Australia",
  //   },
  //   {
  //     id: 7,
  //     name: "Michael Brown",
  //     email: "michael.brown@maqsoftware.com",
  //     country: "Germany",
  //   },
  //   {
  //     id: 8,
  //     name: "Sophia Wilson",
  //     email: "sophia.wilson@maqsoftware.com",
  //     country: "France",
  //   },
  //   {
  //     id: 9,
  //     name: "James Taylor",
  //     email: "james.taylor@maqsoftware.com",
  //     country: "Japan",
  //   },
  //   {
  //     id: 10,
  //     name: "Olivia Martin",
  //     email: "olivia.martin@maqsoftware.com",
  //     country: "Italy",
  //   },
  //   {
  //     id: 11,
  //     name: "Tom Holland",
  //     email: "tom.holland@maqsoftware.com",
  //     country: "England",
  //   },
  // ];
  const recordsPerPage = 5;
  const filteredData = data.filter((item) =>
    (item.address.country).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="header">
          <button className="button" onClick={() => {
            setCount(count + 1)}
          }>Get Data</button>
          
          <button className="button" onClick={() => navigate("/env")}>Env Variables</button>
        </div>
        <div className="search-refresh">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={() => setCount(count + 1)}>Refresh</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S. no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td>{item.firstname + " " + item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.address.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
