import React from "react";
import CardItem from "./CardItem";

import {motion} from "framer-motion";

import { FaDollarSign, FaMoneyBillWave, FaUserPlus, FaShoppingCart } from 'react-icons/fa';

const cartItems = [
  { id: 1, title: "Total Earning", value: "$2200.00", icon: <FaDollarSign /> },
  { id: 2, title: "Total Expenses", value: "$1200.00", icon: <FaMoneyBillWave /> },
  { id: 3, title: "New Users", value: "150", icon: <FaUserPlus /> },
  { id: 4, title: "Total Sales", value: "320", icon: <FaShoppingCart /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y:0,
    transition: {
      duration: 0.4,
      ease:"easeOut",
    },
  },
};


const Cards = () => {
  return (
    <motion.div
      className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cartItems.map((item, index) => (
        <CardItem item={item} key={index} variants={itemVariants} />
      ))}
    </motion.div>
  );
  
};

export default Cards;
