import React from 'react';
import { Modal, Button } from 'antd';

const PrintModal = ({ open, onClose, organization, electionTitle, votingStart, votingEnd, numBallots }) => {
    const logoBase64 = '../../../assets/moses_horizontal.png'; 

    const handlePrint = () => {
        const currentDate = new Date().toLocaleString();
        const printWindow = window.open('');
        printWindow.document.write(`
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        margin: 0;
                        color: #333;
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        border-bottom: 2px solid #635cbb;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .logo {
                        width: 60px;
                        height: auto;
                        margin-right: 20px;
                        flex-shrink: 0;
                    }
                    .title {
                        color: #635cbb;
                    }
                    .title h1 {
                        font-size: 24px;
                        margin: 0;
                    }
                    .title h2 {
                        font-size: 18px;
                        margin: 5px 0;
                    }
                    .content {
                        font-size: 16px;
                        color: #333;
                        line-height: 1.6;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .content p {
                        font-size: 16px;
                    }
                    @page {
                        margin: 0;
                        size: auto;
                    }
                    body {
                        margin-bottom: 60px;
                    }
                    .footer {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        text-align: left;
                        font-size: 14px;
                        color: #333;
                        padding: 10px 0;
                        margin-right: 20px;
                    }
                    .footer .page-number {
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        font-size: 12px;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <img src="${logoBase64}" alt="Moses Logo" class="logo" />
                    <div class="title">
                        <h1>Mobile Secure Election System</h1>
                        <h2>${organization}</h2>
                        <h2>${electionTitle}</h2>
                        <h2>${currentDate}</h2>
                    </div>
                </div>
                <div class="content">
                    <p><strong>Start of Voting:</strong> ${votingStart}</p>
                    <p><strong>End of Voting:</strong> ${votingEnd}</p>
                    <p><strong>No of Ballots:</strong> ${numBallots}</p>
                </div>
                <div class="footer">
                    <p>${currentDate} | Moses | Powered by Tambuli Labs</p>
                    <div class="page-number" style="margin-right: 20px;">
                        1/1
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null} centered width={600}>
            <div className="text-left">
                <h2 className="text-xl font-semibold text-[#635cbb] mb-4">Print Preview</h2>
                <p>Click the button below to open a printable view.</p>
                <Button
                    type="primary"
                    className="mt-4 bg-[#635cbb] hover:bg-[#5144a4] rounded-lg"
                    onClick={handlePrint}
                >
                    Print Now
                </Button>
            </div>
        </Modal>
    );
};

export default PrintModal;
