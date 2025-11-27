"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./CatalogPage.module.css";
import { fetchAllCars } from "@/libs/api/clientApi";
import FilterBar, { SearchFormValues } from "@/components/FilterBar/FilterBar";
import Catalog from "@/components/Catalog/Catalog";
import { useState } from "react";
import ButtonComp from "@/components/ButtonLink/Button";
import { SyncLoader } from "react-spinners";
import { Car } from "@/types/cars";

const CatalogPageClient = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState(100);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(10000);
  const limit = 12;

  const { data, isFetching } = useQuery({
    queryKey: ["cars", brand, rentalPrice, minMileage, maxMileage, currentPage],
    queryFn: () =>
      fetchAllCars(
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        currentPage,
        limit
      ),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (filters: SearchFormValues) => {
    setBrand(filters.brand);
    setRentalPrice(filters.price);
    setMinMileage(filters.mileageFrom);
    setMaxMileage(filters.mileageTo);
    setCurrentPage(1);
  };

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <FilterBar onSearch={handleSearch} />
      {isFetching && (
        <div className={css.loaderWrapper}>
          <SyncLoader size={10} color={"#0b44cd"} />
        </div>
      )}
      {!isFetching &&
        (data?.cars?.length ? (
          <Catalog cars={data.cars} />
        ) : (
          <p className={css.empty}>Cars not found.</p>
        ))}
      {!isFetching && (
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
