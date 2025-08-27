interface User {
  id: number;
  name: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onDelete }: UserTableProps) => {
  if (users.length === 0) {
    return <p>No users added yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>
              <button className="delete" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
