"use client";

import { checkboxOptions, items, radioOptions, UserDetails } from "@/lib/utils";

import { useForm } from "react-hook-form";

const inputClass =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

const labelClass = "text-sm font-medium leading-none";

export function BasicFormRHF() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<UserDetails>();

  const data = watch();

  console.log(errors);

  const submit = () => {};

  return (
    <div className="w-1/2 mx-auto py-10">
      <form onSubmit={handleSubmit(submit)}>
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
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                  className={inputClass}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  {...register("email")}
                  placeholder="john@example.com"
                  className={inputClass}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be atleast 8 character long",
                    },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (val !== getValues("password")) {
                        return "Password and confirm password should match";
                      }
                    },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="about" className={labelClass}>
                  About
                </label>
                <textarea
                  {...register("about")}
                  placeholder="Write about yourself"
                  rows={4}
                  className={`${inputClass} min-h-16 py-2`}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="department" className={labelClass}>
                  Department
                </label>
                <select {...register("department")} className={inputClass}>
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
                        {...register("checkedOptions")}
                        className="size-4 shrink-0 rounded-[4px] border border-input shadow-xs"
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
                        {...register("radioOption")}
                        className="size-4 shrink-0 rounded-full border border-input"
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
