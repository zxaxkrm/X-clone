"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home"); // redirect immediately
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
         <FaXTwitter size={280} className="text-white" />
      </div>
    </div>
  );
}

