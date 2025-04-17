import React from 'react'
import { useCandidateStore } from '../../../stores/useCandidateStore';
import { useState, useEffect } from 'react';
import { generatePdfFromSelectedCandidates } from '../utils/generatePDF';

const Ballot = () => {
    const selectedCandidates = useCandidateStore(state => state.selectedCandidates);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            if (Object.keys(selectedCandidates).length > 0) {
                const url = await generatePdfFromSelectedCandidates();
                setPdfUrl(url);
            }
        };

        fetchPdf();
    }, [selectedCandidates]);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-10">
            {pdfUrl ? (
                <div>
                    <iframe
                        src={pdfUrl}
                        title="PDF Preview"
                        style={{ height: '62vh', width: '50vw', border: '1px solid #ccc' }}
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-[80vh]">
                    <p>Loading PDF Preview...</p>
                </div>
            )}
        </div>
    )
}

export default Ballot