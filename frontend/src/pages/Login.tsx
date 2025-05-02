import { useState } from "react";

function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="mx-auto max-w-md bg-white rounded-sm">
      <form onSubmit={handleSubmit} className="p-6 pb-4">
        <label htmlFor="email">Email: </label>
        <br />
        <input
          id="email"
          type="email"
          className="w-full mt-2 p-1 border border-gray-600 rounded-sm outline-none"
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="relative">
          <input
            className="w-full mt-2 p-1 border border-gray-600 rounded-sm outline-none"
            type={passwordVisible ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <i
              className={`bi ${
                passwordVisible ? "bi-eye-slash" : "bi-eye"
              } text-xl block my-auto`}
            ></i>
          </button>
        </div>

        <button className=" mt-3 mx-auto block px-4 py-2 text-white text-xl font-semibold border border-blue-700 bg-blue-500 hover:bg-blue-700 transition-colors cursor-pointer rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
