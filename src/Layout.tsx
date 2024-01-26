import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";

function Layout({ setUrlParam }: any) {
  /*   useEffect(() => {
    main();
  }, [urlParam]); */

  return (
    <>
      <div className="wrapper">
        <ul role="news_header">
          <li>
            <Link
              to="/category/politics"
              onClick={() => setUrlParam("politics")}
            >
              {" "}
              Politics
            </Link>
          </li>
          <li>
            <Link to="/category/finance" onClick={() => setUrlParam("Finance")}>
              {" "}
              Finance
            </Link>
          </li>
          <li>
            <Link to="/category/sports " onClick={() => setUrlParam("Sports")}>
              {" "}
              Sports
            </Link>
          </li>
        </ul>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default Layout;
