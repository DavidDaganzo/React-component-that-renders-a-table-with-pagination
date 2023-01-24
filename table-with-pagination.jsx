import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setIsLoading(true);
    const response = await fetch(`${USERS_URL}?page=${page - 1}`);
    const json = await response.json();
    setData(json.results);
    setTotalPages(Math.ceil(json.count / 10));
    setIsLoading(false);
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isLoading) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          disabled={isLoading || currentPage === 1}
          onClick={() => handlePageChange(1)}>
          first
        </button>
        <button
          className="previous-page-btn"
          disabled={isLoading || currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          previous
        </button>
        <button
          className="next-page-btn"
          disabled={isLoading || currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          next
        </button>
        <button
          className="last-page-btn"
          disabled={isLoading || currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}>
          last
        </button>
      </section>
    </div>
  );
}