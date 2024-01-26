export async function getStyling(url: string): Promise<Response> {
  let results;
  try {
    results = await fetch(url);
  } catch (error) {
    throw error;
  }

  return results;
}
export async function getXmlData(url: string): Promise<any> {
  let results;
  try {
    results = await fetch(url);
  } catch (error) {
    return "error";
  }

  return results;
}
export async function parseStringToXMLNode(xml: any): Promise<any> {
  let xmlNode: any;
  try {
    xmlNode = new window.DOMParser().parseFromString(xml, "text/xml");
  } catch (error) {
    throw error;
  }
  return xmlNode;
}
