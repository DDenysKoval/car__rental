import { Car } from "@/types/cars";
import Image from "next/image";
import css from "./Catalog.module.css";

interface CatalogProps {
  cars: Car[];
}

const Catalog = ({ cars }: CatalogProps) => {
  return (
    <ul className={css.cataloglist}>
      {cars.map((car) => (
        <li className={css.catalogListItem} key={car.id}>
          <Image
            className={css.image}
            src={car.img}
            width={276}
            height={276}
            alt="car-photo"
          />
          <div className={css.carTitlePriceWrapper}>
            <h2 className={css.carTitle}>
              {car.brand} <span className={css.span}>{car.model}</span>,{" "}
              {car.year}
            </h2>
            <p className={css.carTitle}>${car.rentalPrice}</p>
          </div>
          <p
            className={css.text}
          >{`${car.address.replace(",", " | ").replace(",", " | ")} | ${car.rentalCompany}`}</p>
        </li>
      ))}
    </ul>
  );
};

export default Catalog;
