import { Link } from "react-router-dom";

export default function FormExtra() {
  return (
    <div className="flex items-center justify-between text-[16px]">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-400 focus:ring-purple-400 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-neutral-400"
        >
          Ghi nhớ
        </label>
      </div>

      <div className="">
        <Link
          to="/forgot-password"
          className="text-cyan-600 hover:opacity-80 duration-200 font-bold"
        >
          Quên mật khẩu?
        </Link>
      </div>
    </div>
  );
}
