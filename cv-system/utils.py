"""
Utilitaires partagés pour le CV system.
Encodage base64, conversion HTML -> PDF via Edge/Chrome headless,
et injection d'icônes vectorielles.
"""
import os
import base64
import subprocess
import tempfile
import sys


def image_to_base64(image_path):
    """Convertit une image locale en URI base64 utilisable directement en HTML."""
    if not os.path.exists(image_path):
        return ""
    ext = os.path.splitext(image_path)[1].lower().replace(".", "")
    if ext == "jpg":
        ext = "jpeg"
    elif ext == "svg":
        ext = "svg+xml"
    with open(image_path, "rb") as f:
        data = base64.b64encode(f.read()).decode("utf-8")
    return f"data:image/{ext};base64,{data}"


def find_browser_executable():
    """Détecte l'exécutable Microsoft Edge ou Google Chrome disponible sous Windows."""
    candidates = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None


def render_html_to_pdf(html_path, output_pdf_path):
    """
    Compile un fichier HTML en PDF haute fidélité
    au format A4 via Chromium headless.
    """
    browser_path = find_browser_executable()
    if not browser_path:
        raise RuntimeError("Aucun navigateur (Edge ou Chrome) trouvé pour compiler le PDF.")

    target_html = os.path.abspath(html_path)
    os.makedirs(os.path.dirname(os.path.abspath(output_pdf_path)), exist_ok=True)
    abs_pdf = os.path.abspath(output_pdf_path)

    cmd = [
        browser_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={abs_pdf}",
        target_html
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=45)

    if not os.path.exists(abs_pdf) or os.path.getsize(abs_pdf) == 0:
        raise RuntimeError(f"Échec compilation PDF (code {result.returncode}) : {result.stderr}")

    return abs_pdf


def get_svg_icon(name, color="#4b5563", size=13):
    """Retourne une icône SVG vectorielle légère."""
    icons = {
        "location": f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
        "phone": f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        "email": f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        "linkedin": f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
        "globe": f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    }
    return icons.get(name, "")
