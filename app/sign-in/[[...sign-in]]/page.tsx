"use client";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex max-md:flex-col max-md:px-auto items-center justify-between p-8 px-20 h-screen">
      <div className="max-md:hidden">
        <FaXTwitter size={280} className="text-white" />
      </div>
      <div className="md:hidden">
        <FaXTwitter size={100} className="text-white" />
      </div>

      <div>
        <h1 className="text-primary-text text-5xl  md:text-7xl font-bold">
          Happening now
        </h1>
        <p className="text-primary-text font-bold text-2xl md:text-3xl mt-5">
          Join today.
        </p>

        <SignIn.Root>
          <Clerk.Connection
            name="google"
            className="bg-white my-2 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm  items-center justify-center flex w-72  font-semibold py-2 rounded-full gap-2"
          >
            <FcGoogle size={20} />
            Sign In With Google
          </Clerk.Connection>

          <Clerk.Connection
            name="google"
            className="bg-white cursor-pointer hover:bg-gray-200 text-gray-800 text-sm  items-center justify-center flex w-72  font-semibold py-2 rounded-full gap-2"
          >
            <FaApple size={20} />
            Sign In With Apple
          </Clerk.Connection>

          <SignIn.Step name="start">
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Input
                placeholder="johndoe@gmail.com"
                className="bg-white cursor-pointer my-2 hover:bg-gray-200 text-gray-800 text-sm w-72 px-6  items-center justify-center flex   font-semibold py-2 rounded-full gap-2"
              />
              <Clerk.FieldError className="text-red-300 text-sm" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="mt-2 text-sm underline w-72 text-center text-blue-500 cursor-pointer"
            >
              Continue
            </SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="password">
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="password"
                  className="bg-white cursor-pointer my-2 hover:bg-gray-200 text-gray-800 text-sm w-72 px-6  items-center justify-center flex   font-semibold py-2 rounded-full gap-2"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <div className="flex flex-col gap-2">
                <SignIn.Action
                
                  submit
                  className="mt-2 text-sm underline w-72 text-center text-blue-500 cursor-pointer"
                >
                  Continue
                </SignIn.Action>

                <SignIn.Action
                  navigate="forgot-password"
                  className="mt-2 text-sm underline w-72 text-center text-secondary-text hover:text-white cursor-pointer"
                >
                  Forgot password
                </SignIn.Action>
              </div>
            </SignIn.Strategy>
            <SignIn.Strategy name="reset_password_email_code">
              <p className="text-xs  mb-2 text-white mt-1">
                We sent a code to <SignIn.SafeIdentifier />.
              </p>

              <Clerk.Field name="code" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter code"
                  className="bg-white cursor-pointer my-2 hover:bg-gray-200 text-gray-800 text-sm w-72 px-6  items-center justify-center flex   font-semibold py-2 rounded-full gap-2"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="mt-2 text-sm underline w-72 text-center text-blue-500 cursor-pointer"
              >
                Continue
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
          <SignIn.Step
            name="forgot-password"
            className="flex justify-between w-72 text-sm"
          >
            <SignIn.SupportedStrategy name="reset_password_email_code">
              <span className="underline text-blue-500 mt-2">
                Reset Password
              </span>
            </SignIn.SupportedStrategy>
            <SignIn.Action
              navigate="previous"
              className="underline text-secondary-text mt-2 hover:text-white"
            >
              Go back
            </SignIn.Action>
          </SignIn.Step>
          <SignIn.Step name="reset-password">
            <h1>Reset your password</h1>

            <Clerk.Field name="password">
              <Clerk.Label>New password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="confirmPassword">
              <Clerk.Label>Confirm password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit>Reset password</SignIn.Action>
          </SignIn.Step>
          <div className="w-72 flex items-center gap-4">
            <div className="h-px border border-border flex-grow"></div>
            <span className="text-secondary-text">OR</span>
            <div className="h-px border border-border flex-grow"></div>
          </div>
          <Link
            href="/sign-up"
            className="bg-blue-400 rounded-full p-2 text-white font-bold w-80 flex items-center justify-center hover:bg-blue-700 text-center"
          >
            Create Account
          </Link>
          <p className="w-72 text-xs text-white">
            By signing up, you agree to the <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>,
            including <span className="text-blue-400">Cookie Use</span> .
          </p>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default SignInPage;
