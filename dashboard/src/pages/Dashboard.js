import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"; // Import Recharts

// Registering ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue ($)",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [trendData, setTrendData] = useState([]); // State for trendline data
  const [totalSales, setTotalSales] = useState(0);
  const [totalSalesThisWeek, setTotalSalesThisWeek] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const ip = "http://localhost:5000";
    async function fetchData() {
      try {
        const revenueResponse = await fetch(`${ip}/api/revenue`);
        const revenue = await revenueResponse.json();
        const totalSalesResponse = await fetch(`${ip}/api/total-sales`);
        const sales = await totalSalesResponse.json();
        const totalOrdersResponse = await fetch(`${ip}/api/total-orders`);
        const orders = await totalOrdersResponse.json();
        const totalCustomersResponse = await fetch(`${ip}/api/total-customers`);
        const customers = await totalCustomersResponse.json();
        const topProductsResponse = await fetch(`${ip}/api/top-products`);
        const products = await topProductsResponse.json();

        // Set data into state for weekly revenue
        setRevenueData({
          labels: revenue.labels,
          datasets: [
            {
              label: "Revenue ($)",
              data: revenue.data,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        // Set trendline data (assuming revenue.data has daily data for trendline)
        setTrendData(
          revenue.data.map((revenueValue, index) => ({
            name: `Week ${index + 1}`,
            uv: revenueValue, // Assuming 'uv' stands for revenue
          }))
        );

        const lastData = revenue.data[revenue.data.length - 1];
        setTotalSales(sales.totalSales);
        setTotalSalesThisWeek(lastData);
        setTotalOrders(orders.totalOrders);
        setTotalCustomers(customers.totalCustomers);
        setTopProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const revenueOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Revenue",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h4>Total Sales</h4>
              <h2 className="text-primary">${totalSales}</h2>
              <p className="text-muted">Over All</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h4>Total Orders</h4>
              <h2 className="text-success">{totalOrders}</h2>
              <p className="text-muted">This Week</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h4>Total Customers</h4>
              <h2 className="text-warning">{totalCustomers}</h2>
              <p className="text-muted">Registered Users</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h4>Revenue</h4>
              <h2 className="text-danger">${totalSalesThisWeek}</h2>
              <p className="text-muted">This Week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Revenue Bar Chart (Weekly)</h4>
              <Bar data={revenueData} options={revenueOptions} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body w-100">
              <h4>Revenue Trendline</h4>
              <LineChart width={300} height={300} data={trendData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Top Products</h4>
              <ul className="list-group">
                {topProducts.map((product, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {product.productName}{" "}
                    <span className="badge bg-primary rounded-pill">
                      {product.sold} Sold
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
