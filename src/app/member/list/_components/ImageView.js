import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const ImageView = ({ member_id }) => {
  console.log(member_id);

  const { data: authData } = useSession();
  const { data } = useQuery({
    queryKey: ["get-image", member_id],
    queryFn: async () => {
      const { data } = await api.get(`/customer/barcode-image/${member_id}`, {
        headers: {
          Authorization: `Bearer ${authData.user.token}`,
        },
      });
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: authData ? true : false,
    staleTime: 10 * 60 * 1000,
  });
  return (
    <div>
      {data ? (
        <Image
          src={data.image_data.barcode}
          width={150}
          height={100}
          alt={member_id}
        />
      ) : (
        <Skeleton className="h-[90px] w-[150px]"/>
      )}
    </div>
  );
};

export default ImageView;
