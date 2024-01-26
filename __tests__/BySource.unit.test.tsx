// sum.test.js
import { expect, test, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../src/App";
import React from "react";
import BySource from "../src/BySource";

import {
  getStyling,
  getXmlData,
  parseStringToXMLNode,
} from "../src/utilities/helper";

describe("View By Source page", () => {
  it("when i visit a source page, I would like to see a list of available information", async ({
    expect,
  }) => {
    // const wrap = render(<BySource urlParam={"cnn"} />);
    // expect(wrap).toMatchSnapshot();
  });

  it("getStyling method retrieves xml styling", async ({ expect }) => {
    //Arrange
    let stylingurl: string = "http://127.0.0.1:3000/xslfile";
    //Act
    let xslsheet: Promise<Response> = getStyling(stylingurl);
    expect(await xslsheet).toBeDefined();
    expect(await xslsheet).toBeTypeOf("object");
  });

  it("getStyling method retrieves xml styling", async ({ expect }) => {
    //Arrange
    let stylingurl: string = "http://127.0.0.1:3000/news/cnn";
    //Act
    let xmldata: Promise<Response> = getXmlData(stylingurl);
    expect(await xmldata).toBeDefined();
    expect(await xmldata).toBeTypeOf("object");
  });

  it("create xml node ", async ({ expect }) => {
    //Arrange
    let stylingurl: string = "http://127.0.0.1:3000/news/cnn";
    //Act
    let xmldata: Promise<Response> = getXmlData(stylingurl);

    let tempxsl = (await xmldata).text();
    let xslnode: any = parseStringToXMLNode(tempxsl);
    expect(await xslnode).toBeTypeOf("object");
  });
});
