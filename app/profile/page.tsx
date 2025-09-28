"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../components/layout/Breadcrumb";
import { User } from "../types";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">User not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-10">
      <Breadcrumb />

      <div className="mt-8 flex gap-12 pt-12 flex-col lg:flex-row p-4 lg:pt-12">
        {/* Left Sidebar - User Profile */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-[#222327] border border-[#383B42] rounded-md p-6">
            {/* Profile Picture */}
            <div className="flex gap-6 pb-6 border-b-2 border-[#383B42] mb-6">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-orange-500 flex items-center justify-center ">
                <span className="text-text-m font-medium ">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-text-l font-medium text-[#E7E7E7]">
                  {user.firstName}
                </h3>
                <p className="text-text-s text-[#B0B0B0]">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="w-full p-2 text-center text-[#262626] text-text-m font-medium bg-[#F29145] rounded-lg mt-2 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Section - Transaction History */}
        <div className="flex-1">
          <div className="mb-6 w-1/2">
            <h2 className="text-text-l font-semibold text-[#F29145] mb-2 text-center">
              Transactions
            </h2>
            <div className="w-full h-0.5 bg-[#F29145]"></div>
          </div>

          {user.orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-text-m text-[#B0B0B0]">
                No transactions found
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#222327] border border-[#383B42] rounded-md p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Lock Icon */}
                    <div className="w-6 h-6  rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <Image
                        src="/order.svg"
                        alt="Order"
                        width={24}
                        height={24}
                      />
                    </div>

                    <div className="flex-1">
                      {/* Date and Time */}
                      <div className="text-text-m text-[#B0B0B0] mb-4">
                        {formatDate(order.createdAt)}{" "}
                        {formatTime(order.createdAt)}
                      </div>

                      {/* Order Number */}
                      <div className="text-text-l font-medium mb-3">
                        Your order nr {order.id}
                      </div>

                      {/* Order Items */}
                      <div className="space-y-1">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-text-m text-[#E7E7E7]"
                          >
                            <span className="w-2 h-2 bg-[#E7E7E7] rounded-full"></span>
                            <span className="text-text-l font-medium">
                              {item.product.name}
                            </span>
                            <span className="text-[#B0B0B0]">
                              ({item.quantity})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
