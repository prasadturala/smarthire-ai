import io
from typing import Optional

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extract raw text from PDF bytes using PyMuPDF (fitz) or fallback parser.
    """
    try:
        import fitz  # PyMuPDF
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        return text.strip()
    except ImportError:
        # Fallback to pypdf or plain text decode
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(pdf_bytes))
            text = ""
            for page in reader.pages:
                text += (page.extract_text() or "") + "\n"
            return text.strip()
        except Exception:
            return pdf_bytes.decode("utf-8", errors="ignore")
