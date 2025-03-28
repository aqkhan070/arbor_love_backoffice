"use client";
import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/navigation"; // Correct import
import { Footer, Header } from "@/components";

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

export default function Home() {
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
    // <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-green-500">
    //   <Header />
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">src/app/page.js</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src={logo}
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Explore starter templates for Next.js.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}
