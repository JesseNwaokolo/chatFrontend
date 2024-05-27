import "../App.css";
import { useContext } from "react";
import { Context } from "../Context/Context";

function Register() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(Context);
  return (
    <>
      <form
        className="w-full max-w-[600px] mx-auto flex flex-col gap-y-5 justify-center"
        onSubmit={registerUser}
      >
        <h2 className="text-2xl text-white">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="rounded-md px-3 focus:outline-[#92dce5]"
          name="name"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Email"
          className="rounded-md px-3 focus:outline-[#92dce5]"
          name="email"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-md px-3 focus:outline-[#92dce5]"
          name="password"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, password: e.target.value });
          }}
        />

        <button type="submit" className="bg-blue-400 rounded-md text-white">
          {isRegisterLoading ? "Loading..." : "Register"}
        </button>

        {registerError?.error && (
          <div className="h-[90px] bg-red-300 pt-4 ps-2 text-red-500 rounded-md">
            {registerError?.message}
          </div>
        )}
      </form>
    </>
  );
}

export default Register;
