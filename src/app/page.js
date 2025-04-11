"use client";
import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/navigation";
import { Footer, Header, Login } from "@/components";

async function fetchQuotes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/all/`
  );
  const data = await response.json();
  return data;
}

const QuotesTable = () => {
  const [quotes, setQuotes] = useState([]);
  const router = useRouter();
  const tableRef = useRef();

  const [columnDefs] = useState([
    {
      headerName: "Quote ID",
      field: "quoteId",
      width: "360px",
      cellRenderer: (params) => (
        <button
          className="btn-link"
          style={{ color: "#00b41e" }}
          onClick={() => handleQuoteClick(params.value)}
        >
          {params.value}
        </button>
      ),
    },
    { headerName: "Client Name", field: "clientDetails.name", width: "170px" },
    {
      headerName: "Phone",
      field: "clientDetails.phone",
      width: "170px",
    },
    { headerName: "Email", field: "clientDetails.email", width: "230px" },
    {
      headerName: "Services No.",
      width: "155px",
      field: "services.length",
      valueGetter: (params) => params.data.services.length,
    },
    { headerName: "Amount", field: "amount", width: "155px" },
    {
      headerName: "Property Owner",
      field: "clientDetails.propertyOwner",
      width: "155px",
      cellRenderer: (params) => <div>{params.value ? "Yes" : "No"}</div>,
    },
    {
      headerName: "Date Created",
      field: "dateCreated",
      width: "230px",
      sort: "desc",
      valueGetter: (params) => params.data.dateCreated || "2 days ago",
    },
  ]);

  useEffect(() => {
    async function getData() {
      const data = await fetchQuotes();
      setQuotes(data);
    }

    getData();
  }, []);

  const handleQuoteClick = (quoteId) => {
    router.push(`/quote-details?quoteId=${quoteId}`);
  };

  return (
    <div>
      <div className={"flex flex-row items-center justify-content-between"}>
        <h2
          style={{
            color: "#00b41e",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Quotes Data
        </h2>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "60vh", width: "100%", overflowX: "scroll" }}
        ref={tableRef}
      >
        <AgGridReact
          rowData={quotes}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
        />
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightgreen bg-gradient-to-t from-darkgreen">
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(isLoggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <main className="max-h-screen bg-lightgreen bg-gradient-to-t from-darkgreen overflow-hidden">
      <div className="flex flex-col h-screen md:pl-[120px] md:pr-[120px]">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex h-[78vh] flex-col justify-between flex-1 bg-white rounded-3xl mr-5 ml-5 p-5 pt-[120px] pb-[120px] ">
          <QuotesTable />
        </div>
        <Footer />
      </div>
    </main>
  );
}
