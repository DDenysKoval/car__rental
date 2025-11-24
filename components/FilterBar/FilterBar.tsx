"use client";

import { useId } from "react";
import css from "./FilterBar.module.css";
import Button from "../ButtonLink/Button";
import { Form, Formik } from "formik";

const FilterBar = () => {
  const fieldId = useId();

  const handleSubmit = () => {};

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-brand`}>
            Car brand
          </label>
          <select name="brand" id={`${fieldId}-brand`} defaultValue="" />
        </div>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-price`}>
            Price/ 1 hour
          </label>
          <select name="price" id={`${fieldId}-price`} defaultValue="">
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
          </select>
        </div>
        <div className={css.formWrapper}>
          <label className={css.title} htmlFor={`${fieldId}-mileage`}>
            Сar mileage / km
          </label>
          <select name="mileage" id={`${fieldId}-mileage`} defaultValue="" />
        </div>
        <Button text="Search" width={156} onSubmit={handleSubmit} />
      </Form>
    </Formik>
  );
};

export default FilterBar;
