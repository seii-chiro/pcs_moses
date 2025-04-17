import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/moses_horizontal.png'

export const downloadVoterPDF = (selectedVoter, allowProxy) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
        doc.addImage(img, 'PNG', 10, 10, 30, 30);

        doc.setFontSize(18);
        doc.text('Voter Information', 50, 20);

        doc.setLineWidth(0.5);
        doc.line(10, 45, 200, 45);

        const tableBody = [
            ['Voter ID', selectedVoter?.id || 'N/A'],
            ['Name', `${selectedVoter?.first_name} ${selectedVoter?.middle_name} ${selectedVoter?.surname}`],
            ['Email', selectedVoter?.email || 'N/A'],
            ['Member', selectedVoter?.member || 'N/A'],
            ['Organization', selectedVoter?.organization || 'N/A'],
            ['Verified', selectedVoter?.verified ? 'Yes' : 'No'],
            ['Allow Proxy', allowProxy ? 'Yes' : 'No'],
        ];

        autoTable(doc, {
            startY: 50,
            head: [['Field', 'Value']],
            body: tableBody,
            theme: 'grid',
            styles: { fontSize: 12 },
            headStyles: { fillColor: [99, 92, 187] },
        });

        doc.save(`voter_${selectedVoter?.id || 'data'}.pdf`);
    };
};
