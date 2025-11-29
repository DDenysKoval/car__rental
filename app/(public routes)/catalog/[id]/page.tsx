import { fetchServerCarById } from "@/libs/api/serverApi";
import CatalogDetailsClient from "./CatalogDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./CatalogDetails.module.css";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Selected Car Details",
  description: "Select Car Details",
};

const CatalogDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchServerCarById(id),
  });

  return (
    <section className={css.section}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogDetailsClient />
        <Toaster position="top-center" reverseOrder={false} />
      </HydrationBoundary>
    </section>
  );
};
export default CatalogDetailsPage;
