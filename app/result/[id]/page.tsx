import Navbar from "@/app/components/Navbar";
import ResultGraph from "@/app/components/ResultGraph";
import React from "react";

function Result({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-screen min-h-full h-screen p-10 bg-gradient-to-r from-[#12141d] to-[#0f1117]">
      <div className="w-full min-h-full rounded-3xl bg-[#1a1d24] p-10 flex flex-col items-center">
        <Navbar />
        <section className="flex flex-col items-center gap-5 mt-7">
          <h1 className="font-medium text-5xl mb-5">Result</h1>
          <ResultGraph id={params.id} />
        </section>
      </div>
    </main>
  );
}

export default Result;
