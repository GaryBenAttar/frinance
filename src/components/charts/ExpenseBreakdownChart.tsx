import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryBreakdown } from "../../services/mockDataService";

 export const ExpenseBreakdownChart = ({ data }: { data: CategoryBreakdown[] }) => {
    // Custom colors for the pie slices
    const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e', '#64748b'];
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };