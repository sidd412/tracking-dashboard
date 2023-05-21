import React from 'react';
import {ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

// import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const ExpenseChart = ({ data }) => {
  // Calculate total expenses for each category
  const categoryExpenses = data.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (acc[category]) {
      acc[category] += parseFloat(amount);
    } else {
      acc[category] = parseFloat(amount);
    }
    return acc;
  }, {});

  // Convert category expenses to an array of objects for pie chart
  const pieData = Object.keys(categoryExpenses).map((category, index) => ({
    name: category,
    value: categoryExpenses[category],
    fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
  }));

  return (
    <div>
      <h2>Total Expense by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
