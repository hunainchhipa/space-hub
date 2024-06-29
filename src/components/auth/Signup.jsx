import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SignUp = ({ setCreateAccount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://192.168.1.2:8000/api/register",
        data
      );
    } catch (error) {
      console.error(
        "Register failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            isInvalid={!!errors.first_name}
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-danger">{errors.first_name.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Smith"
            isInvalid={!!errors.last_name}
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <p className="text-danger">{errors.last_name.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="johnsmith"
            isInvalid={!!errors.user_name}
            {...register("user_name", {
              required: "Username is required",
            })}
          />
          {errors.user_name && (
            <p className="text-danger">{errors.user_name.message}</p>
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
            isInvalid={!!errors.mobile_number}
            {...register("mobile_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.mobile_number && (
            <p className="text-danger">{errors.mobile_number.message}</p>
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
