"use client";
import { api } from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useMember = (page = 0, limit = 5) => {
  const { data: authData } = useSession();

  return useQuery({
    queryKey: ["member-list", page, limit],
    queryFn: async () => {
      const { data } = await api.get(`/customer?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${authData.user.token}` },
      });
      return data;
    },
    enabled: authData ? true : false,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });
};

export default useMember;
