"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./CatalogPage.module.css";
import { AllCarsHttpResponse, fetchAllCars } from "@/libs/api/clientApi";
import FilterBar, { SearchFormValues } from "@/components/FilterBar/FilterBar";
import Catalog from "@/components/Catalog/Catalog";
import { useState } from "react";
import ButtonComp from "@/components/ButtonLink/Button";
import { SyncLoader } from "react-spinners";

const CatalogPageClient = () => {
  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState(100);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(10000);
  const limit = 12;

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<AllCarsHttpResponse>({
      queryKey: ["cars", brand, rentalPrice, minMileage, maxMileage],
      queryFn: ({ pageParam = 1 }) =>
        fetchAllCars(
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          pageParam,
          limit
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.cars.length < limit ? undefined : allPages.length + 1,
    });

  const handleSearch = (filters: SearchFormValues) => {
    setBrand(filters.brand);
    setRentalPrice(filters.price);
    setMinMileage(filters.mileageFrom);
    setMaxMileage(filters.mileageTo);
  };

  const handleClick = () => {
    fetchNextPage();
  };

  const allCars = data?.pages.flatMap((page) => page.cars) ?? [];
  console.log(allCars);

  return (
    <div className="container">
      <FilterBar onSearch={handleSearch} />
      {isLoading && (
        <div className={css.loaderWrapper}>
          <SyncLoader size={10} color={"#0b44cd"} />
        </div>
      )}
      {!isLoading &&
        (allCars.length ? (
          <Catalog cars={allCars} />
        ) : (
          <p className={css.empty}>Cars not found.</p>
        ))}
      {!isLoading && hasNextPage && (
        <div className={css.buttonWrapper}>
          <ButtonComp
            text="Load more"
            width={156}
            type="button"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogPageClient;
