import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import {
  getStyling,
  getXmlData,
  parseStringToXMLNode,
} from "./utilities/helper";

function BySource({ urlParam }: any) {
  let { param } = useParams<{ param: string }>();

  let stylingurl: string = "http://127.0.0.1:3000/xslfile";

  let xmlresponsedata: string = `http://127.0.0.1:3000/news/${param}`;

  const path = "/root";

  let xsltprocessor = new window.XSLTProcessor();

  async function applyStylingToXmlLNode(xsl: any, evaluatedXmlNode: any) {
    xsltprocessor.importStylesheet(await xsl);
    let DomFragment = xsltprocessor.transformToFragment(
      evaluatedXmlNode,
      document
    );

    return DomFragment;
  }

  async function main() {
    //get styling
    let xslsheet: Promise<Response> = getStyling(stylingurl);

    //get data
    let xmldata: Promise<Response> = getXmlData(xmlresponsedata);

    //resolve xsl styling and xml data
    Promise.all([xslsheet, xmldata]).then(async (c) => {
      //text() is asynchronous ensure that transformation is done
      const pr = () =>
        new Promise<any>(async (res: any, rej) => {
          let tempxsl = await c[0].text();
          let xslnode: any = parseStringToXMLNode(tempxsl);
          let tempxml = await c[1].text();
          let xmlnode: any = parseStringToXMLNode(tempxml);
          let xsl = await xslnode;
          let xml = await xmlnode;

          res({ xsl, xml });
        });

      pr().then(async (res: any) => {
        //get the root path

        if (await res.xml) {
          //evaluate path to build nodes
          var nodes = await res.xml.evaluate(
            path,
            await res.xml,
            null,
            XPathResult.ANY_TYPE,
            null
          );

          var currentNode = nodes.iterateNext();

          document.getElementsByClassName("container")[0].innerHTML = "";

          while (currentNode) {
            //Applly styling to each node based on provided path
            let resultDocument = await applyStylingToXmlLNode(
              res.xsl,
              currentNode
            );

            document
              .getElementsByClassName("container")[0]
              .appendChild(resultDocument);

            console.log(currentNode);
            currentNode = nodes.iterateNext();
          }
        }
      });
    });
  }

  useEffect(() => {
    main();
  }, [urlParam]);

  return (
    <>
      <h2>News from {param?.toLocaleUpperCase()}</h2>
      <div className="container"></div>
    </>
  );
}

export default BySource;
