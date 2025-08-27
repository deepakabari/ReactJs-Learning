import { useEffect, useState } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import UserTable from "./components/UserTable";

interface User {
  id: number;
  name: string;
}

function App() {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleAddUser = () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name: name.trim(),
    };

    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setName("");
    setError("");
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <h1>Sample User Todo</h1>
      <UserInput
        name={name}
        onNameChange={setName}
        onAddUser={handleAddUser}
        error={error}
      />
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
}

export default App;
