import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Category from "./ByCategory.tsx";
import Layout from "./Layout.tsx";
import BySource from "./BySource.tsx";
import { useState } from "react";

function App() {
  const [urlParam, setUrlParam] = useState<string | undefined>();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout setUrlParam={setUrlParam} />,
      children: [
        {
          path: "/:param",
          element: <BySource urlParam={urlParam} />,
        },
        {
          path: "/category/:param",
          element: <Category urlParam={urlParam} />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
