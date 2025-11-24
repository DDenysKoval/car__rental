"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./CatalogPage.module.css";
import { fetchAllCars } from "@/libs/api/clientApi";
import FilterBar from "@/components/FilterBar/FilterBar";
import Catalog from "@/components/Catalog/Catalog";

const CatalogPageClient = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchAllCars(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container">
      <FilterBar />
      {data?.cars !== undefined && data.cars.length !== 0 ? (
        <Catalog cars={data?.cars} />
      ) : (
        <p className={css.empty}>Cars not found.</p>
      )}
    </div>
  );
};

export default CatalogPageClient;
