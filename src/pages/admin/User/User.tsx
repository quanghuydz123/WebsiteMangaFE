import React, { useState, ChangeEvent } from 'react';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { motion } from 'framer-motion';


interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isDeleted: boolean;
}

const UserTable: React.FC = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changed to page:', page);
  };

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Liễu Như Yên', email: 'john@example.com', age: 25, isDeleted: false },
    { id: 2, name: 'Ngô Diệc Phàm', email: 'jane@example.com', age: 30, isDeleted: false }
  ]);

  const [newUser, setNewUser] = useState<Partial<User>>({ name: '', email: '', age: undefined });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };


  const addUser = () => {
    if (newUser.name && newUser.email && newUser.age !== undefined) {
      const id = users.length + 1;
      const user: User = { id, ...newUser, isDeleted: false } as User;
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', age: undefined });
    }
  };


  const editUser = (user: User) => {
    setIsEditing(true);
    setCurrentUser(user);
    setNewUser({ name: user.name, email: user.email, age: user.age });
  };

 
  const updateUser = () => {
    if (currentUser && newUser.name && newUser.email && newUser.age !== undefined) {
      setUsers(
        users.map((user) => (user.id === currentUser.id ? { ...user, ...newUser } : user))
      );
      setIsEditing(false);
      setNewUser({ name: '', email: '', age: undefined });
      setCurrentUser(null);
    }
  };

  const softDeleteUser = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, isDeleted: true } : user)));
  };


  const restoreUser = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, isDeleted: false } : user)));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management Table</h2>

      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block font-semibold">Age:</label>
          <input
            type="number"
            name="age"
            value={newUser.age?.toString() || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your age"
          />
        </div>
        <button
          type="button"
          onClick={isEditing ? updateUser : addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </form>

      <motion.div
        className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300"
      >
        <table className="min-w-full">
          <thead>
            <tr className="text-sm md:text-base">
              <th className="px-4 py-2 text-left font-semibold text-slate-400">ID</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Email</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Age</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-b border-slate-200 text-sm md:text-base" key={user.id}>
                <td className="px-4 py-3 font-medium">{user.id}</td>
                <td className={`px-4 py-3 font-medium ${user.isDeleted ? 'line-through text-gray-400' : ''}`}>
                  {user.name}
                </td>
                <td className="px-4 py-3 font-medium">{user.email}</td>
                <td className="px-4 py-3 font-medium">{user.age}</td>
                <td className="px-4 py-3 font-medium space-x-2">
                  {!user.isDeleted ? (
                    <>
                      <button
                        onClick={() => editUser(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => softDeleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => restoreUser(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
