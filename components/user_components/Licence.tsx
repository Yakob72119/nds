"use client";

import { useRouter } from "next/navigation";
import { Download, Printer, X } from "lucide-react";

export default function DocumentationIntro() {
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/licence.pdf";
    link.download = "Service_License.pdf";
    link.click();
  };

  const handlePrint = () => {
    const iframe = document.getElementById("pdf-viewer") as HTMLIFrameElement;
    iframe?.contentWindow?.print();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b shadow z-50">
        <h2 className="text-lg font-semibold">📄 Service License Document</h2>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <X size={16} />
            Close
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          id="pdf-viewer"
          src="/licence.pdf"
          className="w-full h-full"
          style={{ border: "none" }}
          title="Service License PDF"
        />
      </div>
    </div>
  );
}
