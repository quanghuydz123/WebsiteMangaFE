import Title from "../Title/Title";
import {motion} from "framer-motion"
const tableData = [
    {
      id: 1,
      receiptName: "Receipt A",
      date: "2024-01-01",
      amount: "$100.00"
    },
    {
      id: 2,
      receiptName: "Receipt B",
      date: "2024-01-02",
      amount: "$200.00"
    },
    {
      id: 3,
      receiptName: "Receipt C",
      date: "2024-01-03",
      amount: "$150.00"
    },
    {
      id: 4,
      receiptName: "Receipt D",
      date: "2024-01-04",
      amount: "$250.00"
    }
  ];
  

const Table = ({variants}:{variants:any}) => {
  return (
    <motion.div 
        variants={variants}
        className="flex-1 rounded-xl
     bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
      <Title>Receipt</Title>
      <table className="min-w-full">
        <thead>
          <tr className="text-sm md:text-base">
            <th className="px-4 py-2 text-left font-semibold text-slate-400">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Receipt Name</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Date</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Amount</th>
          </tr>
        </thead>
        <tbody>
  {tableData.map((item) => (
    <tr className="border-b border-slate-200 text-sm md:text-base" key={item.id}>
      <td className="px-4 py-3 font-medium">{item.id}</td>
      <td className="px-4 py-3 font-medium">{item.receiptName}</td>
      <td className="px-4 py-3 font-medium">{item.date}</td>
      <td className="px-4 py-3 font-medium">{item.amount}</td>
    </tr>
  ))}
</tbody>

      </table>
    </motion.div>
  );
};

export default Table;
