"use client";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex max-md:flex-col max-md:px-auto items-center justify-between p-8 px-20 ">
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

        <SignUp.Root>
          <SignUp.Step name="start" className="flex flex-col gap-4" >
            <Clerk.Connection
              name="google"
              className="bg-white my-2 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm  items-center justify-center flex w-72  font-semibold py-2 rounded-full gap-2"
            >
              <FcGoogle size={20} />
              Sign Up With Google
            </Clerk.Connection>

            <Clerk.Connection
              name="google"
              className="bg-white cursor-pointer hover:bg-gray-200 text-gray-800 text-sm  items-center justify-center flex w-72  font-semibold py-2 rounded-full gap-2"
            >
              <FaApple size={20} />
              Sign Up With Apple
            </Clerk.Connection>

            <div className="flex flex-col gap-4">
              <h1 className="text-white text-xs">Sign Up With Credentials</h1>
              <Clerk.Field name="username" className="flex flex-col gap-2">
                <Clerk.Input
                className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm bg-white" 
                placeholder="Username"/>
                <Clerk.FieldError className="text-red-300 text-sm"/>
              </Clerk.Field>

              <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
                <Clerk.Input
                className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm bg-white" 
                placeholder="Enter Email"/>
                <Clerk.FieldError className="text-red-300 text-sm"/>
              </Clerk.Field>

              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm bg-white" 
                placeholder="Enter password"/>
                <Clerk.FieldError className="text-red-300 text-sm"/>
              </Clerk.Field>
              <SignUp.Captcha/>
              <SignUp.Action submit 
              className="bg-blue-400 rounded-full
               p-2 w-72 font-bold text-center text-primary-text hover:bg-blue-700">
                Sign Up
              </SignUp.Action>
            </div>
          </SignUp.Step>
           <SignUp.Step name="continue" className="flex flex-col gap-4">
        

        <Clerk.Field name="username">
          <Clerk.Label>Username</Clerk.Label>
          <Clerk.Input placeholder="Enter Username" className="py-2 px-6 rounded-full w-72 mb-2 text-black bg-white placeholder:text-sm"/>
          <Clerk.FieldError className="text-red-300 text-sm"/>
        </Clerk.Field>

        <SignUp.Action submit className="mt-2 text-sm underline w-72 text-center text-blue-500 cursor-pointer" >Continue</SignUp.Action>
      </SignUp.Step>
          <SignUp.Step name="verifications" >
            <SignUp.Strategy name="email_code">
              <h1 className="text-xs mt-3  text-white">Check your email</h1>
              <Clerk.Field name="code" className="flex flex-col gap-4">
                <Clerk.Input placeholder="Enter code" className="py-2 px-6 rounded-full w-72 mb-2 text-black bg-white placeholder:text-sm"/>
                <Clerk.FieldError className="text-red-300 text-sm"/>
              </Clerk.Field>
              <SignUp.Action submit 
              className="bg-blue-400 rounded-full
               p-2 w-72 font-bold text-center text-primary-text hover:bg-blue-700">
                Verify
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
          <div className="w-72 flex items-center gap-4">
            <div className="h-px border border-border flex-grow"></div>
            <span className="text-secondary-text">OR</span>
            <div className="h-px border border-border flex-grow"></div>
          </div>
          <Link
            href="/sign-in"
            className="bg-blue-400 rounded-full p-2 text-white font-bold w-80 flex items-center justify-center hover:bg-blue-700 text-center"
          >
            Already have an account?
          </Link>
          <p className="w-72 text-xs text-white">
            By signing up, you agree to the{" "}
            <span className="text-blue-400">Terms of Service</span> and{" "}
            <span className="text-blue-400">Privacy Policy</span>, including{" "}
            <span className="text-blue-400">Cookie Use</span> .
          </p>
        </SignUp.Root>
      </div>
    </div>
  );
};

export default SignUpPage;
