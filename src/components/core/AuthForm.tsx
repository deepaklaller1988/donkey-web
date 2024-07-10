import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@components/buttons/Button';
import { IoMdClose, IoIosArrowRoundForward } from 'react-icons/io';
import FetchApi from '@lib/FetchApi';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/AuthContext';

const AuthForm = ({ handleCaptchaChange, handleClose }: any) => {
  const { setToken }: any = useAuth();
  const [type, setType] = useState("login");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  let endpoint = '';

  if (type === 'register') {
    endpoint = 'http://localhost:5000/signup';
  } else if (type === 'login') {
    endpoint = 'http://localhost:5000/login';
  } else if (type === 'forgot') {
    endpoint = 'http://localhost:5000/forgot-password';
  }

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const data = Object.fromEntries(formData.entries());
      return await FetchApi.post(endpoint, data);
    },
    onSuccess: async (data: any) => {
      if (data?.data?.accessToken) {
        localStorage.setItem("token", data.data?.accessToken);
        setToken(data.data?.accessToken);
        setSuccessMessage('Login successful!');
        handleClose();
      } else if (type === 'forgot') {
        setSuccessMessage('Please check your email for further instructions.');
      } else if (type === 'register') {
        setSuccessMessage('Registration successful! You can now log in.');
        setType('login');
      }
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An error occurred. Please try again.');
    }
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!captchaValue) {
      setErrorMessage('Please complete the CAPTCHA');
      return;
    }

    const formData: any = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    if (type === 'register') {
      if (username.length < 4) {
        setErrorMessage('Username must be at least 4 characters.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (password !== repeatPassword) {
        setErrorMessage('Password confirmation does not match.');
        return;
      }
    }

    formData.append('captcha', captchaValue);
    mutation.mutate(formData);
  };

  const onCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    handleCaptchaChange(value);
  };

  return (
    <div className="loginRegisterForgotForm flex items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
      <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
        <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">
          {type === 'login' && 'Login'}
          {type === 'forgot' && 'Forgot Password'}
          {type === 'register' && 'Account Sign up'}
          <IoMdClose className="text-white w-6 h-6 cursor-pointer transition hover:text-amber-500" onClick={handleClose} />
        </h2>
        {type === 'forgot' && (
          <p className="text-sm text-white/50 pb-4">
            We will send an email to your box, just follow that link to set your new password.
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {(type === 'login' || type === 'register' || type === 'forgot') && (
            <>
              <div className="w-full flex flex-col gap-1">
                <label className="text-white/50">Email</label>
                <input
                  className="p-2 px-4 rounded-lg bg-white/5 text-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

              {type === 'login' && (
                <div className="w-full flex flex-col gap-1">
                  <label className="text-white/50">Password</label>
                  <input
                    className="p-2 px-4 rounded-lg bg-white/5 text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
              )}
              {type === 'register' && (
                <>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-white/50">Username <sup>*</sup></label>
                    <input
                      className="p-2 px-4 rounded-lg bg-white/5 text-white"
                      type="text"
                      name="username"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-white/50">Password <sup>*</sup></label>
                    <input
                      className="p-2 px-4 rounded-lg bg-white/5 text-white"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-white/50">Repeat Password <sup>*</sup></label>
                    <input
                      className="p-2 px-4 rounded-lg bg-white/5 text-white"
                      type="password"
                      name="repeatPassword"
                      placeholder="Repeat Password"
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="w-full text-white py-3">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={onCaptchaChange}
            />
          </div>
          <div>
            <Button type="submit">
              {type === 'login' && 'Sign In'}
              {type === 'register' && 'Sign up'}
              {type === 'forgot' && 'Forgot password'}
            </Button>
          </div>
          {type === 'login' && (
            <>
              <div className="w-full mt-4">
                <button className="pColor flex gap-2 items-center" onClick={() => setType("forgot")}>Forgot your Password <IoIosArrowRoundForward className="w-6 h-6" /></button>
              </div>
              <div className="w-full mb-4">
                <button className="pColor flex gap-2 items-center" onClick={() => setType("register")}>Sign up for a new account <IoIosArrowRoundForward className="w-6 h-6" /></button>
              </div>
            </>
          )}
          {type === 'register' && (
            <div className="w-full mt-4 flex items-center gap-2 text-white">
              Already have an account? <a onClick={() => setType("login")} className="pColor cursor-pointer flex gap-2 items-center">Login Here <IoIosArrowRoundForward className="w-6 h-6" /></a>
            </div>
          )}
          {type === 'forgot' && (
            <div className="w-full mb-4">
              <a onClick={() => setType("login")} className="pColor cursor-pointer flex gap-2 items-center">Back to sign in <IoIosArrowRoundForward className="w-6 h-6" /></a>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default AuthForm;
