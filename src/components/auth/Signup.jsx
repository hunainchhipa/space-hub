import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SignUp = ({ setCreateAccount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // handle form submission
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            isInvalid={!!errors.firstName}
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-danger">{errors.firstName.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Smith"
            isInvalid={!!errors.lastName}
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-danger">{errors.lastName.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="johnsmith"
            isInvalid={!!errors.userName}
            {...register("userName", {
              required: "Username is required",
            })}
          />
          {errors.userName && (
            <p className="text-danger">{errors.userName.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="johnsmith007"
            isInvalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="9837636786"
            isInvalid={!!errors.phone}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            isInvalid={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center mt-3">
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </div>
        <div className="text-center mt-3">
          <span
            className="text-muted cursor-pointer"
            onClick={() => setCreateAccount(false)}
          >
            Already have an account? Sign in
          </span>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
