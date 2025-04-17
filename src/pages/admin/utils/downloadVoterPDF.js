import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/moses_horizontal.png';

export const downloadVoterPDF = (voters) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
        doc.addImage(img, 'PNG', 155, 10, 40, 15);

        const tableBody = voters.map(voter => [
            voter.id || 'N/A',
            `${voter.first_name} ${voter.middle_name} ${voter.surname}`,
            voter.email || 'N/A',
            voter.member || 'N/A',
            voter.allow_proxy === "true" ? 'Yes' : 'No',
        ]);

        autoTable(doc, {
            startY: 30,
            head: [['Voter ID', 'Name', 'Email', 'Member', 'Allow Proxy']],
            body: tableBody,
            theme: 'grid',
            styles: { fontSize: 12 },
            headStyles: { fillColor: [99, 92, 187] },
        });

        doc.save(`voter_list_${new Date().toLocaleDateString()}.pdf`);
    };
};
