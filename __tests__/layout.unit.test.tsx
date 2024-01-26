// sum.test.js
import { expect, test, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../src/App";
import React from "react";

describe("View landing page", () => {
  it("when i visit the home page, I would like to see summary of available news   so that I can get information", async ({
    expect,
  }) => {
    //Arrange
    const wrap = render(<App />);
    expect(wrap).toMatchSnapshot();
    // ACT
    expect(screen.getByRole("news_header")).toHaveTextContent(
      "Politics Finance Sports"
    );
  });
});
