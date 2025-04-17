// downloadVoterExcel.js
import * as XLSX from 'xlsx';
import logo from '../../../assets/moses_horizontal.png'; // You may choose to include the logo in Excel or leave it out

export const downloadVoterExcel = (voters) => {
    // Prepare table data for all voters (removing 'Organization' and changing verified status to 'Vote')
    const tableData = voters.map(voter => ({
        'Voter ID': voter.id || 'N/A',
        'Name': `${voter.first_name} ${voter.middle_name} ${voter.surname}`,
        'Email': voter.email || 'N/A',
        'Member': voter.member || 'N/A',
        'Allow Proxy': voter.allow_proxy === "true" ? 'Yes' : 'No',
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert table data to a sheet
    const ws = XLSX.utils.json_to_sheet(tableData);

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Voter List');

    // Prepare to download the Excel file
    XLSX.writeFile(wb, `voter_list_${new Date().toLocaleDateString()}.xlsx`);
};
