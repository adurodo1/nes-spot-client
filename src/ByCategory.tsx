import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";
import {
  getStyling,
  getXmlData,
  parseStringToXMLNode,
} from "./utilities/helper";

function Category({ urlParam }: any) {
  let { param } = useParams<{ param: string }>();

  const path = "/root/parent";

  let stylingurl: string = `${import.meta.env.VITE_API}/xslfileforcategories`;

  let xmlresponsedata: string = `${
    import.meta.env.VITE_API
  }/news/group/${param}`;

  let xsltprocessor = new XSLTProcessor();

  async function applyStylingToXmlLNode(xsl: any, evaluatedXmlNode: any) {
    xsltprocessor.importStylesheet(await xsl);
    let DomFragment = xsltprocessor.transformToFragment(
      evaluatedXmlNode,
      document
    );

    return DomFragment;
  }

  async function main() {
    // setRevisit(true);
    console.log("this ran");
    //get styling
    let xslsheet: Promise<Response>;
    let xmldata: Promise<Response> | any;
    try {
      xslsheet = getStyling(stylingurl);
      //get data
      xmldata = getXmlData(xmlresponsedata);
      if (xmldata === "error") throw new Error("error");
    } catch (error) {
      xmldata = "error";
      console.log(error);
      throw error;
    }

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

      pr().then(async (res) => {
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
      <div className="container"></div>
    </>
  );
}

export default Category;
