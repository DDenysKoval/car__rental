"use client";

import { useId, useState } from "react";
import css from "./FilterBar.module.css";
import Button from "../ButtonLink/Button";
import { Form, Formik, FormikHelpers } from "formik";
import { fetchBrands } from "@/libs/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Select from "react-select";

export interface SearchFormValues {
  brand: string;
  price: number;
  mileageFrom: number;
  mileageTo: number;
}

const initialValues: SearchFormValues = {
  brand: "",
  price: 0,
  mileageFrom: 0,
  mileageTo: 0,
};

interface FilterBarProps {
  onSearch: (values: SearchFormValues) => void;
}

const FilterBar = ({ onSearch }: FilterBarProps) => {
  const [isClearable, setIsClearable] = useState(true);
  const fieldId = useId();

  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
    placeholderData: keepPreviousData,
  });

  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    onSearch(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form className={css.form}>
          <div className={css.formWrapper}>
            <label className={css.title} htmlFor={`${fieldId}-brand`}>
              Car brand
            </label>
            <Select
              name="brand"
              instanceId="brand"
              isClearable={isClearable}
              options={data?.map((brand) => ({ value: brand, label: brand }))}
              placeholder="Choose a brand"
              value={
                data
                  ?.map((brand) => ({ value: brand, label: brand }))
                  .find((opt) => opt.value === values.brand) || null
              }
              onChange={(option) => setFieldValue("brand", option?.value)}
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
                  borderRadius: 12,
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
          <div className={css.formWrapper}>
            <label className={css.title} htmlFor={`${fieldId}-price`}>
              Price/ 1 hour
            </label>
            <Select
              name="price"
              instanceId="price"
              isClearable={isClearable}
              options={[
                { value: 30, label: 30 },
                { value: 40, label: 40 },
                { value: 50, label: 50 },
                { value: 60, label: 60 },
                { value: 70, label: 70 },
                { value: 80, label: 80 },
              ]}
              placeholder="Choose a price"
              value={
                values.price
                  ? { value: values.price, label: values.price }
                  : null
              }
              onChange={(option) => setFieldValue("price", option?.value)}
              formatOptionLabel={(option, { context }) => {
                if (context === "value") {
                  return `To $${option.label}`;
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
                  borderRadius: 12,
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

          <div className={css.formWrapper}>
            <label className={css.title} htmlFor={`${fieldId}-mileage`}>
              Сar mileage / km
            </label>
            <div className={css.mileageWrapper}>
              <Select
                name="mileageFrom"
                instanceId="mileage-from"
                isClearable={isClearable}
                options={[
                  { value: 2000, label: "2,000" },
                  { value: 3000, label: "3,000" },
                  { value: 4000, label: "4,000" },
                  { value: 5000, label: "5,000" },
                  { value: 6000, label: "6,000" },
                  { value: 7000, label: "7,000" },
                ]}
                placeholder="From"
                formatOptionLabel={(option, { context }) => {
                  if (context === "value") {
                    return `From ${option.label}km`;
                  }
                  return option.label;
                }}
                value={
                  values.mileageFrom
                    ? {
                        value: values.mileageFrom,
                        label: values.mileageFrom.toLocaleString(),
                      }
                    : null
                }
                onChange={(option) =>
                  setFieldValue("mileageFrom", option?.value)
                }
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
                    borderRadius: 12,
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
                name="mileageTo"
                instanceId="mileage-to"
                isClearable={isClearable}
                options={[
                  { value: 2000, label: "2,000" },
                  { value: 3000, label: "3,000" },
                  { value: 4000, label: "4,000" },
                  { value: 5000, label: "5,000" },
                  { value: 6000, label: "6,000" },
                  { value: 7000, label: "7,000" },
                ]}
                placeholder="To"
                formatOptionLabel={(option, { context }) => {
                  if (context === "value") {
                    return `To ${option.label}km`;
                  }
                  return option.label;
                }}
                value={
                  values.mileageTo
                    ? {
                        value: values.mileageTo,
                        label: values.mileageTo.toLocaleString(),
                      }
                    : null
                }
                onChange={(option) => setFieldValue("mileageTo", option?.value)}
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
                    borderRadius: 12,
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
          <Button text="Search" width={156} type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default FilterBar;
