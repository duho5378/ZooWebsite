import React, { useEffect, useState } from 'react';
import './AdminUser.css'

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Khi thành phần được gắn kết, lấy dữ liệu người dùng từ máy chủ
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/allUsers');
      if (!response.ok) {
        throw new Error(`Máy chủ trả về ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Lỗi khi lấy dữ liệu người dùng:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error.message);
    }
  };

  const deleteUser = async (phoneNumber) => {
    try {
      const response = await fetch(`http://localhost:3001/api/deleteUser/${phoneNumber}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Máy chủ trả về ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        // Cập nhật state sau khi xóa thành công
        setUsers((prevUsers) => prevUsers.filter((user) => user.PHONENUMBER !== phoneNumber));
      } else {
        console.error('Lỗi khi xóa người dùng:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error.message);
    }
  };

  return (
    <div className='userAdmin'>
      <h2>User List</h2>
      <table className='userAdminDetail'>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>EMAIL</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.PHONENUMBER}>
              <td>
                <button onClick={() => deleteUser(user.PHONENUMBER)}>Xóa</button>
              </td>
              <td>{user.FIRSTNAME}</td>
              <td>{user.LASTNAME}</td>
              <td>{user.EMAIL}</td>
              <td>{user.PHONENUMBER}</td>
              <td>{user.PASSWORD}</td>
              <td>{user.POINT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
