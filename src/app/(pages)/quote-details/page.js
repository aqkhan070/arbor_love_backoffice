"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Image } from "antd";
import { Footer, Header } from "@/components";

async function fetchQuoteDetails(quoteId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/${quoteId}`
  );
  const data = await response.json();
  return data;
}

const QuoteDetails = () => {
  const router = useRouter();
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const quoteId = params.get("quoteId");

    if (quoteId) {
      async function getQuoteDetails() {
        const data = await fetchQuoteDetails(quoteId);
        setQuoteDetails(data);
        setLoading(false);
      }
      getQuoteDetails();
    }
  }, []);

  if (loading) {
    return (
      <div className="banter-loader-wrapper min-h-screen max-h-screen">
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
  }

  return (
    <main className="min-h-screen max-h-screen bg-lightgreen bg-gradient-to-t from-darkgreen text-[#343a40] modal-body">
      <div className="flex flex-col h-screen md:pl-[120px] md:pr-[120px]">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex h-[78vh] flex-col justify-between flex-1 bg-white rounded-3xl mr-5 ml-5 p-5 pt-[120px] pb-[120px] overflow-auto">
          <button
            className="self-start mb-4 px-2 py-1 bg-[#00b41e] text-white rounded text-xs"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
          <section className="mb-4">
            <h5 className="modal-section-title">Client Details</h5>
            <p>
              <strong>Name:</strong> {quoteDetails.clientDetails.name}
            </p>
            <p>
              <strong>Address:</strong> {quoteDetails.clientDetails.address}
            </p>
            <p>
              <strong>Phone:</strong> {quoteDetails.clientDetails.phone}
            </p>
            <p>
              <strong>Email:</strong> {quoteDetails.clientDetails.email}
            </p>
            <p>
              <strong>Owner:</strong>{" "}
              {quoteDetails.clientDetails.isOwner ? "Yes" : "No"}
            </p>
            <p>
              <strong>Additional Info:</strong>{" "}
              {quoteDetails?.clientDetails?.additionalInfo ?? "N/A"}
            </p>
          </section>
          <section className="mb-4">
            <h5 className="modal-section-title">Amount</h5>
            <p>
              <strong>Total Amount:</strong> {quoteDetails.amount}
            </p>
          </section>
          <section className="mb-4">
            <h5 className="modal-section-title">Services</h5>
            {quoteDetails.services.map((service, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded service-section"
              >
                <p>
                  <strong>Type:</strong> {service?.serviceType ?? "--"}
                </p>
                <p>
                  <strong>Trees:</strong> {service?.numOfTrees ?? "--"}
                </p>
                <p>
                  <strong>Tree Type:</strong> {service?.treeType ?? "--"}
                </p>
                <p>
                  <strong>Height:</strong> {service?.treeHeight ?? "--"}
                </p>
                <p>
                  <strong>Location:</strong> {service?.treeLocation ?? "--"}
                </p>
                <p>
                  <strong>Utility Lines:</strong>{" "}
                  {service?.utilityLines ? "Yes" : "No"}
                </p>

                <p>
                  <strong>Property Fenced:</strong>{" "}
                  {service?.propertyFenced ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Equipment Access:</strong>{" "}
                  {service?.equipmentAccess ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Emergency Cutting:</strong>{" "}
                  {service?.emergencyCutting ? "Yes" : "No"}
                </p>
                {service?.treeType === "Tree Removal" && (
                  <>
                    <p>
                      <strong>Stump Removal:</strong>{" "}
                      {service?.stumpRemoval ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Fallen Down:</strong>{" "}
                      {service?.fallenDown ? "Yes" : "No"}
                    </p>
                  </>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  <Image.PreviewGroup>
                    {service.imageUrls.map((url, idx) => (
                      console.log("backoffice",`${process.env.NEXT_PUBLIC_API_BASE_URL}${url.imageUrl}`),
                      <Image
                        key={idx}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url.imageUrl}`}
                        alt={`Service ${index} Image ${idx}`}
                        className="small-image"
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            ))}
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default QuoteDetails;
