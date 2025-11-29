"use client"; // Обовʼязково

import { Car } from "@/types/cars";
import Image from "next/image";
import css from "./Catalog.module.css";
import LinkComp from "../ButtonLink/Link";
import { useCarStore } from "@/libs/store/carStore";

interface CatalogProps {
  cars: Car[];
}

const Catalog = ({ cars }: CatalogProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useCarStore();

  return (
    <div className={css.wrapper}>
      <ul className={css.cataloglist}>
        {cars.map((car) => (
          <li className={css.catalogListItem} key={car.id}>
            <div className={css.imageWrapper}>
              <button
                className={`${css.iconHeart} ${
                  isFavorite(car.id) ? css.activeHeart : ""
                }`}
                type="button"
                onClick={() =>
                  isFavorite(car.id)
                    ? removeFromFavorites(car.id)
                    : addToFavorites(car)
                }
              >
                <svg width={16} height={16}>
                  {!isFavorite(car.id) ? (
                    <use href="/icons.svg#icon-heart"></use>
                  ) : (
                    <use href="/icons.svg#icon-heart-active"></use>
                  )}
                </svg>
              </button>

              <Image
                className={css.image}
                src={car.img}
                width={350}
                height={276}
                alt={`${car.brand} ${car.model}`}
              />
            </div>

            <div className={css.carTitlePriceWrapper}>
              <h2 className={css.carTitle}>
                {car.brand}{" "}
                <span className={css.span}>
                  {car.model.length > 11 ? car.model.slice(0, 11) : car.model}
                </span>
                , {car.year}
              </h2>
              <p className={css.carTitle}>${car.rentalPrice}</p>
            </div>

            <div className={css.overwievWrapper}>
              <p className={css.text}>
                {`${car.address
                  .replace(/^[^,]*,/, "")
                  .replace(", ", " | ")} | ${car.rentalCompany} |`}
              </p>
              <p
                className={css.text}
              >{`${car.type} | ${car.mileage.toLocaleString("en-US").replace(/,/g, " ")}km`}</p>
            </div>

            <LinkComp
              text="Read more"
              link={`/catalog/${car.id}`}
              width={276}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
