import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generatePdf(name: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawText(`Happy Birthday ${name}!`, {
    x: 50,
    y: 250,
    size: 28,
    font
  });

  const bytes = await pdfDoc.save();
  return bytes;
}
