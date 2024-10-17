import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import Title from "../Title/Title";

import {motion} from "framer-motion"

const monthData = [
  { name: 'January', sales: 4000, revenue: 2400 },
  { name: 'February', sales: 3000, revenue: 2210 },
  { name: 'March', sales: 2000, revenue: 2290 },
  { name: 'April', sales: 2780, revenue: 2000 },
  { name: 'May', sales: 1890, revenue: 2181 },
  { name: 'June', sales: 2390, revenue: 2500 },
  { name: 'July', sales: 3490, revenue: 2100 },
];

const CustomBarChart = ({variants}:{variants:any}) => {
  return (
    <motion.div 
      variants={variants}
      className="h-[450px] w-full rounded-xl bg-white p-4 pb-20 dark:bg-slate-600 dark:text-slate-300 xl:flex-1">
      <Title>Sales and Revenue</Title>
      <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#14b8a6" />
                <Bar dataKey="revenue" fill="#0f766e" />
            </BarChart>
        </ResponsiveContainer>
    </motion.div>
  );
};

export default CustomBarChart;
