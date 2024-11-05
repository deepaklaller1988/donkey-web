import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "@components/buttons/Button";
import { IoMdClose, IoIosArrowRoundForward } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import API from "@lib/Api";
import { useAuth } from "context/AuthContext";
import { handleError } from "@lib/errorHandler";
import User from "@lib/User";
import { toasterSuccess } from "./Toaster";
import { useProfileTab } from "context/ProfileTabContext";

const AuthForm = ({ handleCaptchaChange, handleClose }: any) => {
  const { setToken }: any = useAuth();
  const recaptchaRef = useRef<any>(null);
  const [type, setType] = useState("login");
  // const [captchaValue, setCaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUsername } = useProfileTab();

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
    // setCaptchaValue(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, [type]);

  const endpoints: any = {
    register: "user/signup",
    login: "user/login",
    forgot: "user/forgot-password",
  };

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const data = Object.fromEntries(formData.entries());
      return await API.post(endpoints[type], data);
    },
    onSuccess: async (data: any) => {
      if (data?.data?.accessToken) {
        localStorage.setItem("token", data?.data?.accessToken);
        setToken(data.data?.accessToken);
        toasterSuccess("Login successfull.", 1000, "id");
        setUsername(data?.data?.user?.username);
        User.isUserLoggedIn = true;
        User.role();
        handleClose();
      } else if (type === "forgot" && data.success) {
        toasterSuccess(
          "Please check your email for further instructions",
          3000,
          "id"
        );
        handleClose();
      } else if (type === "register" && data.success) {
        toasterSuccess("Registration successfully !", 1000, "id");
        setType("login");
      }
    },
    onError: async (error: any) => {
      const message = handleError(error?.error?.code);
      setErrorMessage(message);
    },
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // if (!captchaValue) {
    //   setErrorMessage("Please complete the CAPTCHA");
    //   return;
    // }

    const formData = new FormData(event.target);
    const username: any = formData.get("username")?.toString().trim();
    const password: any = formData.get("password")?.toString().trim();
    const repeatPassword = formData.get("repeatPassword")?.toString().trim();

    const validations: any = {
      username: {
        condition: type === "register" && username?.length < 4,
        message: "Username must be at least 4 characters.",
      },
      password: {
        condition: type === "register" && password?.length < 6,
        message: "Password must be at least 6 characters.",
      },
      repeatPassword: {
        condition: type === "register" && password !== repeatPassword,
        message: "Password confirmation does not match.",
      },
    };

    const validationErrors: any = Object.keys(validations)
      .filter((field) => validations[field].condition)
      .map((field) => validations[field].message);

    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join(" "));
      return;
    }

    // formData.set("captcha", captchaValue);
    mutation.mutate(formData);
  };

  // const onCaptchaChange = (value: any) => {
  //   setCaptchaValue(value);
  //   handleCaptchaChange(value);
  // };

  // const handleClickOutside = (event:any) => {
  //   if (event.target.closest('.loginRegisterForgotForm')) {
  //     disableAds();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="loginRegisterForgotForm flex items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
      <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
        <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">
          {type === "login" && "Sign in"}
          {type === "forgot" && "Reset Password"}
          {type === "register" && "Sign up"}
          {type === "profile" && "Info"}
          {type !== "profile" && (
            <IoMdClose
              className="text-white w-6 h-6 cursor-pointer transition hover:text-amber-500"
              onClick={handleClose}
            />
          )}
        </h2>
        {type === "forgot" && (
          <p className="text-sm text-white/50 pb-4">
            We will send you an email with instructions on how to reset
            password.
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {(type === "login" ||
            type === "register" ||
            type === "forgot" ||
            type === "profile") && (
            <>
              {type !== "profile" && (
                <div className="w-full flex flex-col gap-1">
                  {/* <label className="text-white/50">Email</label> */}
                  <input
                    className="p-2 px-4 rounded-lg bg-white/5 text-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
              )}

              {type === "login" && (
                <div className="w-full flex flex-col gap-1">
                  {/* <label className="text-white/50">Password</label> */}
                  <input
                    className="p-2 px-4 rounded-lg bg-white/5 text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
              )}
              {type === "register" && (
                <>
                  {["username", "password", "repeatPassword"].map(
                    (fieldName) => (
                      <div
                        key={fieldName}
                        className="w-full flex flex-col gap-1"
                      >
                        {/* <label htmlFor={fieldName} className="text-white/50">
                          {fieldName === "repeatPassword"
                            ? "Repeat Password"
                            : `${fieldName
                                .charAt(0)
                                .toUpperCase()}${fieldName.slice(1)}`}{" "}
                          <sup>*</sup>
                        </label> */}
                        <input
                          id={fieldName}
                          className="p-2 px-4 rounded-lg bg-white/5 text-white"
                          type={
                            /(password|repeatPassword)/i.test(fieldName)
                              ? "password"
                              : "text"
                          }
                          name={fieldName}
                          placeholder={
                            fieldName === "repeatPassword"
                              ? "Repeat Password"
                              : `${fieldName
                                  .charAt(0)
                                  .toUpperCase()}${fieldName.slice(1)}`
                          }
                          required
                        />
                      </div>
                    )
                  )}
                </>
              )}
            </>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {/* <div className="w-full text-white py-3 flex justify-center captachSet">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={onCaptchaChange}
            />
          </div> */}
          <div>
            <Button type="submit">
              {type === "login" && "Continue"}
              {type === "register" && "Continue"}
              {type === "forgot" && "Forgot password"}
            </Button>
          </div>
          {type === "login" && (
            <>
              <div className="w-full mt-4">
                <button
                  className="text-white flex gap-2 items-center"
                  onClick={() => setType("forgot")}
                >
                  Forgot Password?{" "}
                  <IoIosArrowRoundForward className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full mb-4">
                <button
                  className="text-white flex gap-2 items-center"
                  onClick={() => setType("register")}
                >
                  New?
                  <span className="pColor">Sign up now </span>{" "}
                  <span className="pColor"><IoIosArrowRoundForward className="w-6 h-6" /></span> 
                </button>
              </div>
            </>
          )}
          {type === "register" && (
            <div className="w-full mt-4 flex items-center gap-2 text-white">
              Already have an account?{" "}
              <a
                onClick={() => setType("login")}
                className="pColor cursor-pointer flex gap-2 items-center"
              >
                Sign in <IoIosArrowRoundForward className="w-6 h-6" />
              </a>
            </div>
          )}
          {type === "forgot" && (
            <div className="w-full mb-4">
              <a
                onClick={() => setType("login")}
                className="pColor cursor-pointer flex gap-2 items-center"
              >
                Back to sign in <IoIosArrowRoundForward className="w-6 h-6" />
              </a>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
