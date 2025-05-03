import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { constants } from "../constants/constants";

function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const response = await fetch(`${constants.BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "applicaion/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      navigate("/");
    } else {
      setError({});
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const navigate = useNavigate();
  return (
    <div className="mx-auto mt-6 max-w-md bg-white rounded-sm border border-gray-300 shadow-xl">
      <img src={logo} alt="" />
      <form onSubmit={handleSubmit} className="p-6 pb-4">
        <p className="text-3xl font-medium">Sign in to your account</p>
        <div className="mt-4">
          <label htmlFor="email" className="font-bold text-lg ">
            Email:
          </label>
          <br />
          <input
            id="email"
            type="email"
            className="w-full mt-1 p-1.5 border border-gray-600 rounded-sm outline-none"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <label htmlFor="password" className="font-bold text-lg mt-2 block">
          Password:
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-1.5 border border-gray-600 rounded-sm outline-none"
            type={passwordVisible ? "text" : "password"}
            required
            minLength={8}
          />
          <button
            onClick={() => {
              setPasswordVisible((prev) => !prev);
            }}
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <i
              className={`bi ${
                passwordVisible ? "bi-eye-slash" : "bi-eye"
              } text-xl block text-gray-500 hover:text-gray-700 transition-colors`}
            ></i>
          </button>
        </div>
        {error && <div className="error">{error.message}</div>}

        <div className="w-full text-blue-500 hover:text-blue-700 transition-colors text-md text-right">
          <Link to={"/register"}>Create a new account</Link>
        </div>
        <button
          className={` mt-2 mx-auto block px-4 py-2 text-white text-xl font-semibold border ${
            pending
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-700 border-blue-700"
          }  transition-colors cursor-pointer rounded`}
          disabled={pending}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
