import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Env = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  let navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("");
//         console.log(response.data.data);
//         setData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [count]);

  const data = [
    { "name": "Alice", "env_var": "ALICE_CONFIG" },
    { "name": "Bob", "env_var": "BOB_PATH" },
    { "name": "Carol", "env_var": "CAROL_ENV" },
    { "name": "Dave", "env_var": "DAVE_HOME" },
    { "name": "Eve", "env_var": "EVE_API_KEY" },
    { "name": "Frank", "env_var": "FRANK_LOG_LEVEL" },
    { "name": "Grace", "env_var": "GRACE_DB_URL" },
    { "name": "Heidi", "env_var": "HEIDI_PORT" },
    { "name": "Ivan", "env_var": "IVAN_SECRET" },
    { "name": "Judy", "env_var": "JUDY_ENDPOINT" },
    { "name": "Kelsey", "env_var": "KELSEY_MODE" },
    { "name": "Larry", "env_var": "LARRY_TIMEOUT" },
    { "name": "Mallory", "env_var": "MALLORY_DEBUG" },
    { "name": "Nia", "env_var": "NIA_REGION" },
    { "name": "Oscar", "env_var": "OSCAR_CACHE" },
    { "name": "Peggy", "env_var": "PEGGY_USER" },
    { "name": "Quentin", "env_var": "QUENTIN_PASSWORD" },
    { "name": "Robin", "env_var": "ROBIN_VERSION" },
    { "name": "Steve", "env_var": "STEVE_DOMAIN" },
    { "name": "Trent", "env_var": "TRENT_SERVICE" },
    { "name": "Uma", "env_var": "UMA_KEY" },
    { "name": "Victor", "env_var": "VICTOR_LIB_PATH" },
    { "name": "Wendy", "env_var": "WENDY_QUERY_LIMIT" },
    { "name": "Xavier", "env_var": "XAVIER_RETRY_COUNT" },
    { "name": "Yvonne", "env_var": "YVONNE_PROXY" },
    { "name": "Zack", "env_var": "ZACK_API_SECRET" }
  ]
  
  const recordsPerPage = 5;
  const filteredData = data.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
          <button className="button" onClick={() => navigate("/")}>
            Back
          </button>
          {/* <button className="button">Env Variables</button> */}
        </div>
        <div className="search-refresh">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={() => setCount(count + 1)}>
            Refresh
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S. no.</th>
              <th>Name</th>
              <th>Environment Variable</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.env_var}</td>
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

export default Env;
