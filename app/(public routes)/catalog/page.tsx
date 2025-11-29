import { Metadata } from "next";
import CatalogPageClient from "./CatalogPage.client";

export const metadata: Metadata = {
  title: "Car Rent Catalog",
  description: "Car Rent Catalog List",
};

const CatalogPage = async () => {
  return (
    <main>
      <section>
        <CatalogPageClient />
      </section>
    </main>
  );
};

export default CatalogPage;
