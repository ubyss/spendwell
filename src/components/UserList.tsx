import { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
