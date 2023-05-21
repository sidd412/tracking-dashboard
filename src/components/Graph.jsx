import React, { useState } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseChart = ({ data }) => {
  const months = [
    { value: 1, name: 'Jan' },
    { value: 2, name: 'Feb' },
    { value: 3, name: 'Mar' },
    { value: 4, name: 'Apr' },
    { value: 5, name: 'May' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Jul' },
    { value: 8, name: 'Aug' },
    { value: 9, name: 'Sep' },
    { value: 10, name: 'Oct' },
    { value: 11, name: 'Nov' },
    { value: 12, name: 'Dec' },
  ];

  const years = Array.from(new Set(data.map((item) => new Date(item.date).getFullYear())));

  const [selectedYear, setSelectedYear] = useState('');

  const filteredData = selectedYear ? data.filter((item) => new Date(item.date).getFullYear() === selectedYear) : data;

  const monthlyExpenses = filteredData.reduce((acc, item) => {
    const month = new Date(item.date).getMonth() + 1;
    acc[month] = (acc[month] || 0) + parseInt(item.amount);
    return acc;
  }, {});

  const chartData = Object.keys(monthlyExpenses).map((month) => ({
    month: months.find((m) => m.value === parseInt(month)).name,
    expenses: monthlyExpenses[month],
  }));

  return (
    <div>
        <h1>Expense Chart</h1>
      <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;



