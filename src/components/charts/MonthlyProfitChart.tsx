import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthlyFinancials } from "../../services/mockDataService";

 export const MonthlyProfitChart = ({ data }: { data: MonthlyFinancials[] }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
          />
          <Bar dataKey="profit" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    );
  };