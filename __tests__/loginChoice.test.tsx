import { render, screen, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContext from "../context/AuthContext";
import LoginChoice from "../components/LoginChoice/LoginChoice";

jest.mock("next/router", () => require("next-router-mock"));

describe(LoginChoice, () => {
  it("renders a heading", () => {
    render(
      <AuthContext.Provider
        value={{
          loggedInUser: "",
          setLoggedInUser: "",
          firebaseError: null,
          createAccount: null,
          logIn: null,
          googleSignIn: null,
        }}
      >
        <LoginChoice />
      </AuthContext.Provider>
    );

    const heading = screen.getByRole("heading", {
      name: "Welcome",
    });
    expect(heading).toBeInTheDocument();
  });
});
