import React, { useState, ChangeEvent, useEffect } from 'react';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { motion } from 'framer-motion'; 
import ApiService from '../../../apis/apiService';
import { Base, User } from '../../../constrants/apiResponse';



const userService = new ApiService<Base<User[]>>('users');
const UserTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Adjust as needed based on the total number of users

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changed to page:', page);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Partial<User>>({ userName: '', email: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUser('/get-all');
        setUsers(response.data.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addUser = () => {
    if (newUser.userName && newUser.email) {
      const user: User = { _id: (users.length + 1).toString(), userName: newUser.userName, email: newUser.email, isDeleted: false };
      setUsers([...users, user]);
      setNewUser({ userName: '', email: '' });
    }
  };

  const editUser = (user: User) => {
    setIsEditing(true);
    setCurrentUser(user);
    setNewUser({ userName: user.userName, email: user.email });
  };

  const updateUser = () => {
    if (currentUser && newUser.userName && newUser.email) {
      setUsers(
        users.map((user) => (user._id === currentUser._id ? { ...user, ...newUser } : user))
      );
      setIsEditing(false);
      setNewUser({ userName: '', email: '' });
      setCurrentUser(null);
    }
  };

  const softDeleteUser = (_id: string) => {
    setUsers(users.map((user) => (user._id === _id ? { ...user, isDeleted: true } : user)));
  };

  const restoreUser = (_id: string) => {
    setUsers(users.map((user) => (user._id === _id ? { ...user, isDeleted: false } : user)));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management Table</h2>

      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="userName"
            value={newUser.userName || ''}
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
        <button
          type="button"
          onClick={isEditing ? updateUser : addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </form>

      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <table className="min-w-full table-fixed"> 
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Email</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={user._id}>
                  <td className="px-4 py-3 font-medium">{user._id}</td>
                  <td className={`px-4 py-3 font-medium ${user.isDeleted ? 'line-through text-gray-400' : ''}`}>
                    {user.userName}
                  </td>
                  <td className="px-4 py-3 font-medium truncate">{user.email}</td>
                  <td className="px-4 py-3 font-medium flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                    {!user.isDeleted ? (
                      <>
                        <button
                          onClick={() => editUser(user)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => softDeleteUser(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => restoreUser(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                      >
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
