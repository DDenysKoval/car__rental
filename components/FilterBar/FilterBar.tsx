"use client";

import { useId } from "react";
import css from "./FilterBar.module.css";
import Button from "../ButtonLink/Button";
import { Form, Formik } from "formik";
import { fetchBrands } from "@/libs/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Select from "react-select";

const FilterBar = () => {
  const fieldId = useId();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
    placeholderData: keepPreviousData,
  });

  const handleSubmit = () => {};

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className={css.form}>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-brand`}>
            Car brand
          </label>
          <div className={css.selectWrapper}>
            <Select
              instanceId="brand"
              options={data?.map((brand) => ({ value: brand, label: brand }))}
              placeholder="Choose a brand"
              classNamePrefix="customSelect"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#f7f7f7",
                  borderRadius: 12,
                  border: state.isFocused ? "none" : "none",
                  boxShadow: "none",
                  height: "44px",
                  width: "200px",
                  padding: "2px 8px",
                }),
                option: (base, state) => ({
                  ...base,
                  padding: "8px 12px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  color: state.isFocused ? "#101828" : "#8d929a",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 310,
                  overflowY: "auto",
                  padding: 0,
                  scrollbarColor: "#dadde1 #fff",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#555",
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),
              }}
            />
          </div>
        </div>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-price`}>
            Price/ 1 hour
          </label>
          <div className={css.selectWrapper}>
            <Select
              instanceId="price"
              options={[
                { value: 30, label: 30 },
                { value: 40, label: 40 },
                { value: 50, label: 50 },
                { value: 60, label: 60 },
                { value: 70, label: 70 },
                { value: 80, label: 80 },
              ]}
              placeholder="Choose a price"
              formatOptionLabel={(option, { context }) => {
                if (context === "value") {
                  return `To $${option.label}`; // додаємо кастомний текст/емодзі
                }
                return option.label;
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#f7f7f7",
                  borderRadius: 12,
                  border: state.isFocused ? "none" : "none",
                  boxShadow: "none",
                  height: "44px",
                  width: "200px",
                  padding: "2px 8px",
                }),
                option: (base, state) => ({
                  ...base,
                  padding: "8px 12px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  color: state.isFocused ? "#101828" : "#8d929a",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 310,
                  overflowY: "auto",
                  padding: 0,
                  scrollbarColor: "#dadde1 #fff",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#555",
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),
              }}
            />
          </div>
        </div>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-mileage`}>
            Сar mileage / km
          </label>
          <div className={css.mileageWrapper}>
            <Select
              instanceId="mileage-from"
              options={[
                { value: "2,000", label: "2,000" },
                { value: "3,000", label: "3,000" },
                { value: "4,000", label: "4,000" },
                { value: "5,000", label: "5,000" },
                { value: "6,000", label: "6,000" },
                { value: "7,000", label: "7,000" },
              ]}
              placeholder="From"
              formatOptionLabel={(option, { context }) => {
                if (context === "value") {
                  return `From ${option.label}km`; // додаємо кастомний текст/емодзі
                }
                return option.label;
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#f7f7f7",
                  borderRadius: "12px 0 0 12px",
                  border: state.isFocused ? "none" : "none",
                  borderRight: "1px solid #dadde1",
                  boxShadow: "none",
                  height: "44px",
                  width: "160px",
                  padding: "2px 8px",
                }),
                option: (base, state) => ({
                  ...base,
                  padding: "8px 12px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  color: state.isFocused ? "#101828" : "#8d929a",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 310,
                  overflowY: "auto",
                  padding: 0,
                  scrollbarColor: "#dadde1 #fff",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#555",
                  display: "none",
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),
              }}
            />
            <Select
              instanceId="mileage-to"
              options={[
                { value: "2,000", label: "2,000" },
                { value: "3,000", label: "3,000" },
                { value: "4,000", label: "4,000" },
                { value: "5,000", label: "5,000" },
                { value: "6,000", label: "6,000" },
                { value: "7,000", label: "7,000" },
              ]}
              placeholder="To"
              formatOptionLabel={(option, { context }) => {
                if (context === "value") {
                  return `To ${option.label}km`; // додаємо кастомний текст/емодзі
                }
                return option.label;
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#f7f7f7",
                  borderRadius: "0 12px 12px 0",
                  border: state.isFocused ? "none" : "none",
                  boxShadow: "none",
                  height: "44px",
                  width: "160px",
                  padding: "2px 8px",
                }),
                option: (base, state) => ({
                  ...base,
                  padding: "8px 12px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  color: state.isFocused ? "#101828" : "#8d929a",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 310,
                  overflowY: "auto",
                  padding: 0,
                  scrollbarColor: "#dadde1 #fff",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#555",
                  display: "none",
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),
              }}
            />
          </div>
        </div>
        <Button
          text="Search"
          width={156}
          onClick={handleSubmit}
          type="submit"
        />
      </Form>
    </Formik>
  );
};

export default FilterBar;
