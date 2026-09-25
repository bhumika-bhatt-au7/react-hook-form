"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldError,
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

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userDetailsSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "email is required"),
    password: z.string().min(1, "email is required"),
    confirmPassword: z.string().min(1, "email is required"),
    about: z.string().min(1, "email is required"),
    department: z.string().min(1, "email is required"),
    checkedOptions: z.string().array().min(1, "Selet atleast one option"),
    radioOption: z.string().min(1, "email is required"),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "password and confirm password should match ",
  });

export function Form() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      department: "",
      checkedOptions: [],
      radioOption: "",
    },
  });

  const submit: SubmitHandler<UserDetails> = (data) => {
    console.log(data, errors);
  };

  console.log({ errors });

  return (
    <div className="w-1/2 mx-auto py-10">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <FieldSet>
          <FieldLegend className="text-2xl font-semibold">
            User Details
          </FieldLegend>
          <FieldDescription>Fill in your details below</FieldDescription>
          <div className="border border-gray-200 rounded-xl px-10 py-8 shadow-sm bg-white m-6">
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input {...field} id="name" placeholder="John Doe" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </Field>
                )}
              />
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="about">About</FieldLabel>
                    <Textarea
                      {...field}
                      id="about"
                      placeholder="Write about yourself"
                      rows={4}
                    />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Department</FieldLabel>
                    <Select
                      items={items}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
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
                )}
              />
              <Controller
                name="checkedOptions"
                control={control}
                render={({ field }) => (
                  <FieldSet>
                    <FieldLabel>Select the checkbox</FieldLabel>
                    <FieldGroup className="gap-3">
                      {checkboxOptions.map((option) => (
                        <Field key={option.value} orientation="horizontal">
                          <Checkbox
                            id={option.id}
                            value={option.value}
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value ?? [];
                              const newValues = checked
                                ? [...currentValues, option.value]
                                : currentValues.filter(
                                    (v: string) => v !== option.value
                                  );
                              field.onChange(newValues);
                            }}
                          />
                          <FieldLabel
                            htmlFor={option.id}
                            className="font-normal"
                          >
                            {option.label}
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                )}
              />
              <Controller
                name="radioOption"
                control={control}
                render={({ field }) => (
                  <FieldSet>
                    <FieldLabel>Select the radio option</FieldLabel>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {radioOptions.map((option) => (
                        <Field key={option.id} orientation="horizontal">
                          <RadioGroupItem value={option.value} id={option.id} />
                          <FieldLabel
                            htmlFor={option.id}
                            className="font-normal"
                          >
                            {option.label}
                          </FieldLabel>
                        </Field>
                      ))}
                    </RadioGroup>
                  </FieldSet>
                )}
              />
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
