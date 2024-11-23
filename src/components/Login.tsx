"use client";

import { auth } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";

const Login: React.FC = () => {
  const { loading } = useAuth();
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <CgSpinner className="animate-spin w-12 h-12 text-gray-400" />
      </div>
    );

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          로그인
        </h2>

        <button
          className="mt-4 w-full px-6 py-2 duration-200 border rounded-3xl hover:bg-[#00B98D] hover:text-white"
          type="button"
          onClick={handleSignInWithGoogle}
        >
          Google 계정으로 로그인
        </button>
      </div>
    </section>
  );
};

export default Login;
