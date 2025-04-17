export const handlePrint = () => {
    const table = document.getElementById("voter-table");

    if (!table) {
        console.error("Table element not found!");
        return;
    }

    const tableHTML = table.outerHTML;

    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    text-align: center;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-bottom: 20px;
                }
                .header img {
                    width: 150px;
                    object-fit: contain;
                }
                h1 {
                    margin: 0;
                    font-size: 24px;
                    color: #333;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-align: left;
                }
                th {
                    background-color: #f3f0ff;
                    color: #635cbb;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="/assets/moses_horizontal.png" alt="Logo" />
            </div>
            ${tableHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.onload = () => {
        printWindow.print();
    };
};
