import { auth } from "@/firebase";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuth = () => {
  const [user, loading] = useAuthState(auth);
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (pathname === "/login" && user) {
      return redirect("/");
    }

    if (pathname !== "/login" && !user) {
      return redirect("/login");
    }
  }, [user, pathname, loading]);

  return { user, loading };
};

export default useAuth;
