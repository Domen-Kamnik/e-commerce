import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserProvider";
import { useNavigate } from "react-router";

function UserDropdown() {
  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  if (!user) return;

  function getNameInitials(name: string) {
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? parts[0][0].toUpperCase() + "." + parts[1][0].toUpperCase() + "."
      : parts[0][0] + ".";
  }

  function handleClickOutside(e: MouseEvent) {
    if (userDropdownVisible && !liRef.current?.contains(e.target as Node))
      setUserDropdownVisible(false);
  }
  useEffect(() => {
    addEventListener("click", handleClickOutside);
    return () => removeEventListener("click", handleClickOutside);
  });
  const liRef = useRef<HTMLLIElement | null>(null);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  return (
    <li ref={liRef} className="relative">
      <button
        onClick={() => {
          setUserDropdownVisible((prev) => !prev);
        }}
        className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-700 hover:from-purple-900 to-purple-300 hover:to-purple-500 cursor-pointer"
      >
        {getNameInitials(user.name)}
      </button>
      {userDropdownVisible && (
        <ul className="absolute text-gray-900 bg-white right-0 mt-2 w-32 rounded shadow-md z-10">
          <li>
            <button
              onClick={logout}
              className="w-full py-2 cursor-pointer hover:bg-gray-100 rounded"
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}

export default UserDropdown;
