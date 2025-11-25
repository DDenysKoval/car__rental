import { Car } from "@/types/cars";
import Image from "next/image";
import css from "./Catalog.module.css";
import LinkComp from "../ButtonLink/Link";
import ButtonComp from "../ButtonLink/Button";

interface CatalogProps {
  cars: Car[];
}

const Catalog = ({ cars }: CatalogProps) => {
  const handleClick = () => {};
  return (
    <div className={css.wrapper}>
      <ul className={css.cataloglist}>
        {cars.map((car) => (
          <li className={css.catalogListItem} key={car.id}>
            <div className={css.imageWrapper}>
              <Image
                className={css.image}
                src={car.img}
                width={350}
                height={276}
                alt="car-photo"
              />
            </div>
            <div className={css.carTitlePriceWrapper}>
              <h2 className={css.carTitle}>
                {car.brand} <span className={css.span}>{car.model}</span>,{" "}
                {car.year}
              </h2>
              <p className={css.carTitle}>${car.rentalPrice}</p>
            </div>
            <div className={css.overwievWrapper}>
              <p
                className={css.text}
              >{`${car.address.replace(/^[^,]*,/, "")} | ${car.rentalCompany} |`}</p>
              <p className={css.text}>{`${car.type} | ${car.mileage}km`}</p>
            </div>
            <LinkComp
              text="Read more"
              link={`/catalog/${car.id}`}
              width={276}
            />
          </li>
        ))}
      </ul>
      <ButtonComp
        text="Load more"
        width={156}
        type="button"
        onClick={handleClick}
      />
    </div>
  );
};

export default Catalog;
