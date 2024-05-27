import { useContext } from "react";
import "../App.css";
import { Context } from "../Context/Context";
function Login() {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isloginLoading } =
    useContext(Context);
  return (
    <>
      <form
        className="w-full max-w-[600px] mx-auto flex flex-col gap-y-5 justify-center"
        onSubmit={loginUser}
      >
        <h2 className="text-2xl text-white">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="rounded-md px-3 focus:outline-[#92dce5]"
          name="email"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-md px-3 focus:outline-[#92dce5]"
          name="password"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />

        <button type="submit" className="bg-blue-400 rounded-md text-white">
          {isloginLoading ? "Logging in.." : "Login"}
        </button>

        {loginError?.error && (
          <div className="h-[90px] bg-red-300 pt-4 ps-2 text-red-500 rounded-md">
            
            {loginError?.message}
          </div>
        )}
      </form>
    </>
  );
}

export default Login;
