import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCandidateStore } from "../../../stores/useCandidateStore";
import image from "../../../assets/moses_favicon.png";
import QRCode from "qrcode";

export const generatePdfFromSelectedCandidates = async () => {
  const selected = useCandidateStore.getState().selectedCandidates;
  const doc = new jsPDF();

  if (Object.keys(selected).length === 0) return "";

  const minimalQrData = Object.entries(selected).map(([position, user]) => ({
    position: position.toUpperCase(),
    name: `${user?.title ? user.title + " " : ""}${user?.surname}, ${
      user?.first_name
    } ${user?.middle_name}`,
    member: user?.member ?? "",
  }));
  const qrData = JSON.stringify(minimalQrData);
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);

  const imgProps = { x: 15, y: 10, width: 30 };
  doc.addImage(image, "PNG", imgProps.x, imgProps.y, imgProps.width, 30);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Candidate Summary Report", 70, 20); // X and Y positioning

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 70, 25);

  //   const qrImage = { x: 165, y: 10, width: 30 };
  //   doc.addImage(qr, "svg", qrImage.x, qrImage.y, qrImage.width, 30);

  doc.addImage(qrCodeDataUrl, "PNG", 165, 10, 30, 30);

  const startY = 45;

  const rows = Object.entries(selected).map(([position, user]) => {
    const fullName = `${user?.title ? user.title + " " : ""}${user?.surname}, ${
      user?.first_name
    } ${user?.middle_name}`;
    return [position.toUpperCase(), fullName, user?.member ?? ""];
  });

  autoTable(doc, {
    head: [["Candidate No.", "Name", "Member"]],
    body: rows,
    startY,
  });

  return doc.output("bloburl");
};
