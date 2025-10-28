import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Results from "./Results";
import type { Inputs } from "../types/Inputs";

const Registration: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [submitted, setSubmitted] = useState<Inputs | null>(null);
  const [showError, setShowError] = useState(false);

  const onSubmit = (data: Inputs) => {
    setSubmitted(data);
    setShowError(false);
    reset();
  };

  const onError = () => {
    setShowError(true);
    setSubmitted(null);
  };

  return (
    <div>
      <form name="registration" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Input
          label="Name"
          placeholder="Enter Name"
          {...register("name", { required: true })}
        />
        <Input
          label="Email"
          placeholder="Enter Email"
          type="email"
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          {...register("password", { required: true })}
        />
        <Button label="Registration" />
        {showError && <div style={{ color: "red", marginTop: 8 }}>All fields are required!</div>}
      </form>
      {submitted && <Results data={submitted} />}
    </div>
  );
};

export default Registration;
