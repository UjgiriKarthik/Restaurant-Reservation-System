import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Manager = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use Vite environment variable
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/reservation`);
      setReservations(data.reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <section className="manager-page">
      <div className="container">
        <h1>All Reservations</h1>
        {loading ? (
          <p>Loading reservations...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Registered At</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res, index) => (
                <tr key={res._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(res.createdAt).toLocaleString()}</td>
                  <td>{res.firstName} {res.lastName}</td>
                  <td>{res.email}</td>
                  <td>{res.phone}</td>
                  <td>{res.date}</td>
                  <td>{res.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Manager;
