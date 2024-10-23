import { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { FormikHelpers } from "formik";
import {
  useSubmitAuthDataMutation,
  useRegisterUserMutation,
} from "@/state/api";

// Define interfaces for form values
interface RegisterValues {
  nom: string;
  prenom: string;
  image: File | null;
  email: string;
  motPasse: string;
}

interface LoginValues {
  email: string;
  motPasse: string;
}

// Validation schema for registration
const registerSchema = yup.object().shape({
  nom: yup.string().required("First Name is required"),
  prenom: yup.string().required("Last Name is required"),
  image: yup.mixed().required("Profile picture is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  motPasse: yup.string().required("Password is required"),
});

// Validation schema for login
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  motPasse: yup.string().required("Password is required"),
});

// Initial values for registration and login
const initialValuesRegister: RegisterValues = {
  nom: "",
  prenom: "",
  image: null,
  email: "",
  motPasse: "",
};

const initialValuesLogin: LoginValues = {
  email: "",
  motPasse: "",
};

const AuthForm = () => {
 
  
  const [submitAuthData] = useSubmitAuthDataMutation();
  const [registerUser] = useRegisterUserMutation();
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const router = useRouter();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Registration function
  const register = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    console.log("Register Values:", values); // Ajoutez cette ligne pour vérifier les valeurs

    // Add form data for registration
    formData.append("nom", values.nom);
    formData.append("prenom", values.prenom);
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("email", values.email);
    formData.append("motPasse", values.motPasse);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const savedUser = await registerUser(formData).unwrap();
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      
    }
  };

  // Login function
  const login = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    try {
      const loggedIn = await submitAuthData(values).unwrap();
      onSubmitProps.resetForm();

      if (loggedIn) {
        localStorage.setItem("token", loggedIn.token);
        //setPageType("register");
        router.push("/compte"); // Utilisez router.push pour rediriger
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (
    values: LoginValues | RegisterValues,
    onSubmitProps: FormikHelpers<LoginValues | RegisterValues>
  ) => {
    if (isLogin) {
      await login(values as LoginValues, onSubmitProps as FormikHelpers<LoginValues>);
    } else {
      await register(values as RegisterValues, onSubmitProps as FormikHelpers<RegisterValues>);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <FormikForm onSubmit={handleSubmit} className='space-y-6'>
          {isRegister && (
            <>
              <div className='flex flex-col md:flex-row space-y-4 md:space-y-0'>
                <div className='w-full md:w-1/2'>
                  <label htmlFor='nom' className='block mb-2'>
                    First Name
                  </label>
                  <Field
                    name='nom'
                    className='border p-2 rounded w-full'
                    placeholder='Enter your first name'
                  />
                  <ErrorMessage
                    name='nom'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <label htmlFor='prenom' className='block mb-2'>
                    Last Name
                  </label>
                  <Field
                    name='prenom'
                    className='border p-2 rounded w-full'
                    placeholder='Enter your last name'
                  />
                  <ErrorMessage
                    name='prenom'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='image' className='block mb-2'>
                  Profile Picture
                </label>
                <Dropzone
                  accept={{ "image/jpeg": [], "image/png": [] }}
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("image", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className='border-2 border-dashed border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-100'
                    >
                      <input {...getInputProps()} />
                      {!(values as RegisterValues).image? (
                        <p>Add Picture Here</p>
                      ) : (
                        <p>{(values.image as File).name}</p>
                      )}
                    </div>
                  )}
                </Dropzone>
                <ErrorMessage
                  name='image'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </>
          )}

          {/* Common fields for login and register */}
          <div>
            <label htmlFor='email' className='block mb-2'>
              Email
            </label>
            <Field
              name='email'
              type='email'
              className='border p-2 rounded w-full'
              placeholder='Enter your email'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>
          <div>
            <label htmlFor='motPasse' className='block mb-2'>
              Password
            </label>
            <Field
              name='motPasse'
              type='password'
              className='border p-2 rounded w-full'
              placeholder='Enter your password'
            />
            <ErrorMessage
              name='motPasse'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>

          {/* Link to switch between forms */}
          <p className='text-center'>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setPageType("register")}
                  className='text-blue-500 cursor-pointer hover:underline'
                >
                  Sign Up here.
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setPageType("login")}
                  className='text-blue-500 cursor-pointer hover:underline'
                >
                  Login here.
                </span>
              </>
            )}
          </p>
        </FormikForm>
      )}
    </Formik>
  );
};

export default AuthForm;
