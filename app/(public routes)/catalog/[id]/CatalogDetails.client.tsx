"use client";

import { fetchCarById } from "@/libs/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import css from "./CatalogDetails.module.css";
import CatalogDefaultForm from "@/components/CatalogDetailsForm/CatalogDetailsForm";

const CatalogDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  return (
    <div className="container">
      <div className={css.wrapper}>
        <div>
          {data !== undefined ? (
            <Image
              className={css.image}
              src={data.img}
              width={640}
              height={512}
              alt="selected car prewiev"
            />
          ) : (
            <p>Car dont find</p>
          )}
          <CatalogDefaultForm />
        </div>
        {data !== undefined ? (
          <div>
            <div className={css.carTitleinfoWrapper}>
              <p className={css.span}>id: {data.id}</p>
              <h1 className={css.carTitle}>{`${data.model}, ${data.year}`} </h1>
              <div className={css.addressWrapper}>
                <p
                  className={css.carAddress}
                >{`${data.address.replace(/^[^,]*,/, "")}`}</p>
                <p
                  className={css.carAddress}
                >{`Mileage: ${data.mileage.toLocaleString("en-US").replace(/,/g, " ")}km`}</p>
              </div>
              <p className={css.carPrice}>${data.rentalPrice}</p>
              <p className={css.carDescription}>{data.description}</p>
            </div>
            <div className={css.carInfoWrapper}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <h2 className={css.listItemTitle}>Rental Conditions: </h2>
                  <ul className={css.subList}>
                    {data.rentalConditions.map((condition) => (
                      <li className={css.subListItem} key={condition}>
                        <svg className={css.icon} width={16} height={16}>
                          <use href="/icons.svg#icon-check-circle"></use>
                        </svg>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className={css.listItem}>
                  <h2 className={css.listItemTitle}>Car Specifications:</h2>
                  <ul className={css.subList}>
                    <li className={css.subListItem}>
                      <svg className={css.icon} width={16} height={16}>
                        <use href="/icons.svg#icon-Group"></use>
                      </svg>
                      Year: {data.year}
                    </li>
                    <li className={css.subListItem}>
                      <svg className={css.icon} width={16} height={16}>
                        <use href="/icons.svg#icon-Group"></use>
                      </svg>
                      Type: {data.type}
                    </li>
                    <li className={css.subListItem}>
                      <svg className={css.icon} width={16} height={16}>
                        <use href="/icons.svg#icon-fuel-pump"></use>
                      </svg>
                      Fuel Consumption: {data.fuelConsumption}
                    </li>
                    <li className={css.subListItem}>
                      <svg className={css.icon} width={16} height={16}>
                        <use href="/icons.svg#icon-gear"></use>
                      </svg>
                      Engine Size: {data.engineSize}
                    </li>
                  </ul>
                </li>
                <li className={css.listItem}>
                  <h2 className={css.listItemTitle}>
                    Accessories and functionalities:{" "}
                  </h2>
                  <ul className={css.subList}>
                    {data.accessories.map((accessories) => (
                      <li className={css.subListItem} key={accessories}>
                        <svg className={css.icon} width={16} height={16}>
                          <use href="/icons.svg#icon-check-circle"></use>
                        </svg>
                        {accessories}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p>Car dont find</p>
        )}
      </div>
    </div>
  );
};

export default CatalogDetailsClient;
