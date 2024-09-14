import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Auth = () => {

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return <div>Loading...</div>;
  if (isSignedIn)
    console.log(user.emailAddresses[0].emailAddress, user.fullName);
  return (
    <header className=" px-10 h-10  ">
      <SignedOut>
        <div className="flex justify-center gap-4">
          <SignInButton className="text-2xl bg-green-500 p-3 rounded-xl"/>
          <SignUpButton className="text-2xl bg-teal-600 p-3 rounded-xl" />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="text-2x flex float-end items-center">
          <UserButton showName />
        </div>
      </SignedIn>
    </header>
  );
};

export default Auth;
