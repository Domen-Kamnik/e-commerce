import { Link, useNavigate } from "react-router";
import { constants } from "../constants/constants";
import {
  RegistrationResponseDTO,
  RegistrationResponseError,
} from "../types/dto/responseDTO";
import { User } from "../types/domain/user";
import { setAccessToken } from "../hooks/useFetch";
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import logo from "../assets/logo.png";

function Register() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({
      email: false,
      name: false,
      password: password === passwordConfirmation ? false : true,
    });
    if (password !== passwordConfirmation) return;
    setPending(true);
    try {
      const response = await fetch(`${constants.BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      setPending(false);
      if (response.ok) {
        const data: RegistrationResponseDTO = await response.json();
        setAccessToken(data.accessToken);
        const user: User = { name, email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        const error: RegistrationResponseError = await response.json();
        setError(error);
      }
    } catch (err: any) {
      setPending(false);
    }
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<RegistrationResponseError>({
    email: false,
    name: false,
    password: false,
  });
  const { setUser } = useUser();
  const navigate = useNavigate();
  return (
    <div className="mx-auto mt-6 max-w-md bg-white rounded-sm border border-gray-300 shadow-xl">
      <img src={logo} alt="" />
      <form onSubmit={handleSubmit} className="p-6 pb-4">
        <p className="text-3xl font-medium">Create your new account</p>
        <div className="mt-4">
          <label htmlFor="email" className="font-bold text-lg ">
            Email:
          </label>
          <br />
          <input
            id="email"
            type="email"
            className="w-full mt-1 p-1.5 border border-gray-600 rounded-sm"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        {error.email && <div className="error">Email taken</div>}

        <div className="mt-2">
          <label htmlFor="name" className="text-lg font-bold">
            Your full name:
          </label>
          <br />
          <input
            type="text"
            className="w-full mt-1 p-1.5 border border-gray-600 rounded-sm "
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
          />
        </div>
        {error.name && (
          <div className="error">Someone is already using your name</div>
        )}
        <label htmlFor="password" className="font-bold text-lg mt-2 block">
          Password:
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-1.5 border border-gray-600 rounded-sm"
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
        <label
          htmlFor="passwordConfirmation"
          className="font-bold text-lg mt-2 block"
        >
          Confirm password:
        </label>
        <div className="relative mt-1">
          <input
            id="passwordConfirmation"
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            value={passwordConfirmation}
            className={`w-full p-1.5 border ${
              password === passwordConfirmation
                ? "border-gray-600"
                : "border-red-400 outline-none"
            } rounded-sm`}
            type={passwordVisible ? "text" : "password"}
            required
            minLength={8}
          />
        </div>
        {error.password && <div className="error">Passwords don't match</div>}
        <button
          className={` mt-2 mx-auto block px-4 py-2 text-white text-xl font-semibold border ${
            pending
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-700 border-blue-700"
          }  transition-colors cursor-pointer rounded`}
          disabled={pending}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
