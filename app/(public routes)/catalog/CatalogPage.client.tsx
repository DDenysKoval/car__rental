"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./CatalogPage.module.css";
import { fetchAllCars } from "@/libs/api/clientApi";
import FilterBar from "@/components/FilterBar/FilterBar";
import Catalog from "@/components/Catalog/Catalog";
import { useState } from "react";

const CatalogPageClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrise] = useState(0);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(0);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchAllCars("", 100, 0, 10000, 1, 12),
    placeholderData: keepPreviousData,
  });

  const onSubmit = () => {};

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
