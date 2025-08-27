interface UserInputProps {
  name: string;
  onNameChange: (value: string) => void;
  onAddUser: () => void;
  error: string;
}

const UserInput = ({
  name,
  onNameChange,
  onAddUser,
  error,
}: UserInputProps) => {
  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="Enter username"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <button className="add" onClick={onAddUser}>
        Add User
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserInput;
