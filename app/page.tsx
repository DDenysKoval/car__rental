import css from "./page.module.css";
import LinkComp from "@/components/ButtonLink/Link";

export default function Home() {
  const buttonText = "View Catalog";
  const buttonWidth = 276;
  const link = "/catalog";

  return (
    <main>
      <section className={css.sectionWrapper}>
        <div className={css.heroWrapper}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.subtitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <LinkComp text={buttonText} width={buttonWidth} link={link} />
        </div>
      </section>
    </main>
  );
}
