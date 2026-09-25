"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { checkboxOptions, items, radioOptions, UserDetails } from "@/lib/utils";

import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues: UserDetails = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  about: "",
  department: "",
  checkedOptions: [],
  radioOption: "",
};

const UserValiddationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().email("Invalid email").required("Required"),
});

export function FormikForm() {
  const { errors, handleChange, values, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: UserValiddationSchema,
    });

  console.log(values);

  return (
    <div className="w-1/2 mx-auto py-10">
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldLegend className="text-2xl font-semibold">
            User Details
          </FieldLegend>
          <FieldDescription>Fill in your details below</FieldDescription>
          <div className="border border-gray-200 rounded-xl px-10 py-8 shadow-sm bg-white m-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={values.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="about">About</FieldLabel>
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Write about yourself"
                  rows={4}
                  value={values.about}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel>Department</FieldLabel>
                <Select
                  items={items}
                  value={values.department}
                  onValueChange={(value) => setFieldValue("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.label} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <FieldSet>
                <FieldLabel>Select the checkbox</FieldLabel>
                <FieldGroup className="gap-3">
                  {checkboxOptions.map((option) => (
                    <Field key={option.value} orientation="horizontal">
                      <Checkbox
                        id={option.id}
                        value={option.value}
                        checked={values.checkedOptions.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const exisiting = values.checkedOptions;
                          const updated = checked
                            ? [...exisiting, option.value]
                            : exisiting.filter((v) => v !== option.value);
                          setFieldValue("checkedOptions", updated);
                          // setValues((prev) => ({
                          //   ...prev,
                          //   checkedOptions: checked
                          //     ? [...prev.checkedOptions, option.value]
                          //     : prev.checkedOptions.filter(
                          //         (v) => v !== option.value
                          //       ),
                          // }));
                        }}
                      />
                      <FieldLabel htmlFor={option.id} className="font-normal">
                        {option.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldLabel>Select the radio option</FieldLabel>
                <RadioGroup
                  value={values.radioOption}
                  onValueChange={(value) =>
                    // setValues((prev) => ({ ...prev, radioOption: value }))
                    setFieldValue("radioOption", value)
                  }
                >
                  {radioOptions.map((option) => (
                    <Field key={option.id} orientation="horizontal">
                      <RadioGroupItem value={option.value} id={option.id} />
                      <FieldLabel htmlFor={option.id} className="font-normal">
                        {option.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </div>
        </FieldSet>
      </form>
    </div>
  );
}
