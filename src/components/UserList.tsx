import UserCard from './UserCard';

const users = [
  { id: 1, firstName: "Tony", lastName: "Katrib", email: "tony@example.com", status: "Active", dob: "2003-05-13" },
  { id: 2, firstName: "Bob", lastName: "", email: "bob@example.com", status: "Locked", dob: "1992-05-12" },
  { id: 3, firstName: "Eve", lastName: "", email: "eve@example.com", status: "Active", dob: "1995-09-20" },
  { id: 4, firstName: "Tony", lastName: "Katrib", email: "tony@example.com", status: "Active", dob: "2003-05-13" },
  { id: 5, firstName: "Bob", lastName: "", email: "bob@example.com", status: "Locked", dob: "1992-05-12" },
  { id: 6, firstName: "Eve", lastName: "", email: "eve@example.com", status: "Active", dob: "1995-09-20" },
];

export default function UserList() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        className="mb-6 w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded text-black"
      />
      <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}