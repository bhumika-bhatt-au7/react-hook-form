"use client";

import { checkboxOptions, items, radioOptions } from "@/lib/utils";
import { useState } from "react";

const inputClass =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

const labelClass = "text-sm font-medium leading-none";

const intialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  about: "",
  department: "",
  checkboxOptions: [],
  radioOption: "",
};

export function BasicForm() {
  const [data, setData] = useState(intialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    console.log({ name, value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    setData((prevState) => {
      return {
        ...prevState,
        checkboxOptions: checked
          ? [...prevState.checkboxOptions, value]
          : prevState.checkboxOptions.filter((val) => val !== value),
      };
    });
  };

  const validate = (data) => {
    const newErrors: any = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ValidationErrors = validate(data);
    if (Object.keys(ValidationErrors).length > 0) {
      return;
    }
    console.log("submitting", data);
  };

  return (
    <div className="w-1/2 mx-auto py-10">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-6">
          <legend className="mb-3 text-2xl font-semibold">User Details</legend>
          <p className="text-muted-foreground text-sm">
            Fill in your details below
          </p>
          <div className="border border-gray-200 rounded-xl px-10 py-8 shadow-sm bg-white m-6">
            <div className="flex w-full flex-col gap-7">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className={inputClass}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className={inputClass}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="about" className={labelClass}>
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Write about yourself"
                  rows={4}
                  className={`${inputClass} min-h-16 py-2`}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="department" className={labelClass}>
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className={inputClass}
                  onChange={handleChange}
                >
                  {items.map((item) => (
                    <option key={item.label} value={item.value ?? ""}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <fieldset className="flex flex-col gap-3">
                <label className={labelClass}>Select the checkbox</label>
                <div className="flex flex-col gap-3">
                  {checkboxOptions.map((option) => (
                    <div key={option.value} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={option.id}
                        value={option.value}
                        name="checkboxOptions"
                        className="size-4 shrink-0 rounded-[4px] border border-input shadow-xs"
                        onChange={handleCheckbox}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-normal"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset className="flex flex-col gap-3">
                <label className={labelClass}>Select the radio option</label>
                <div className="grid w-full gap-3">
                  {radioOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={option.id}
                        value={option.value}
                        name="radioOptions"
                        className="size-4 shrink-0 rounded-full border border-input"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-normal"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="flex w-full items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
