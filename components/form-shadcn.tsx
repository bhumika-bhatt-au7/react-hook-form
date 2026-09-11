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

import { useForm, Controller, SubmitHandler } from "react-hook-form";

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<UserDetails>({
    defaultValues: {
      department: "",
      checkedOptions: [],
      radioOption: "",
    },
  });

  const submit: SubmitHandler<UserDetails> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-1/2 mx-auto py-10">
      <form onSubmit={handleSubmit(submit)}>
        <FieldSet>
          <FieldLegend className="text-2xl font-semibold">
            User Details
          </FieldLegend>
          <FieldDescription>Fill in your details below</FieldDescription>
          <div className="border border-gray-200 rounded-xl px-10 py-8 shadow-sm bg-white m-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" placeholder="John Doe" {...register("name")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="about">About</FieldLabel>
                <Textarea
                  id="about"
                  placeholder="Write about yourself"
                  rows={4}
                  {...register("about")}
                />
              </Field>
              <Field>
                <FieldLabel>Department</FieldLabel>
                <Controller
                  control={control}
                  name="department"
                  render={({ field }) => (
                    <Select items={items} onValueChange={field.onChange}>
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
                  )}
                />
              </Field>
              <FieldSet>
                <FieldLabel>Select the checkbox</FieldLabel>
                <FieldGroup className="gap-3">
                  {checkboxOptions.map((option) => (
                    <Controller
                      key={option.value}
                      name="checkedOptions"
                      control={control}
                      render={({ field }) => (
                        <Field key={option.value} orientation="horizontal">
                          <Checkbox
                            id={option.id}
                            value={option.value}
                            onCheckedChange={(checked) => {
                              const currentValues = getValues("checkedOptions");
                              const newValues = checked
                                ? [...currentValues, option.value]
                                : currentValues.filter(
                                    (v) => v !== option.value
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
                      )}
                    />
                  ))}
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldLabel>Select the radio option</FieldLabel>
                <Controller
                  name="radioOption"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange}>
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
                  )}
                />
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
