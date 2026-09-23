"""
Moteur de rendu du CV — REPRODUCTION HAUTE FIDÉLITÉ DU MODÈLE ATTRACTIVECV.
Exactement 1 page A4 (210mm x 297mm).
CV pur et autonome (sans éditeur visuel).
"""
import os
import sys
import json
import argparse
import shutil
from utils import image_to_base64, render_html_to_pdf

LABELS = {
    "fr": {
        "profil": "PROFIL",
        "competences": "COMPÉTENCES",
        "langues": "LANGUES",
        "formation": "FORMATION",
        "certifications": "CERTIFICATIONS",
        "experiences": "EXPÉRIENCES PROFESSIONNELLES",
    },
    "en": {
        "profil": "PROFILE",
        "competences": "KEY SKILLS",
        "langues": "LANGUAGES",
        "formation": "EDUCATION",
        "certifications": "CERTIFICATIONS",
        "experiences": "PROFESSIONAL EXPERIENCE",
    }
}


def generate_cv_html(data, lang="fr"):
    lang_key = lang if lang in LABELS else data.get("lang", "fr")
    labels = LABELS.get(lang_key, LABELS["fr"])
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Photo portrait
    photo_b64 = ""
    candidate_photos = [
        os.path.join(script_dir, "assets", "portrait_framed.jpg"),
        os.path.join(script_dir, "assets", "mee.png"),
    ]
    for cp in candidate_photos:
        if os.path.exists(cp):
            photo_b64 = image_to_base64(cp)
            break

    nom              = data.get("nom", "JESSE OGOULA").upper()
    titre            = data.get("titre", "AI & DIGITAL TRANSFORMATION LEAD | PRODUCT & OPERATIONS")
    profil           = data.get("profil", "")
    disponibilite    = data.get("disponibilite", "")
    contact          = data.get("contact", {})
    competences_list = data.get("competences_flat", [])
    langues_list     = data.get("langues", [])
    formations_list  = data.get("formations", [])
    certifications_list = data.get("certifications", [])
    experiences      = data.get("experiences_4", data.get("experiences", []))

    if not competences_list:
        if lang_key == "fr":
            competences_list = [
                "Transformation digitale & IA",
                "Déploiement LLMs (OpenAI, Claude)",
                "Automatisation Make & n8n",
                "Prompt engineering (PIQPACC)",
                "Product Management & Agilité",
                "Cartographie des processus",
                "Marketing digital & Acquisition",
                "Traffic Management & SEO/SEA",
                "Outils no-code / low-code",
                "Conduite du changement"
            ]
        else:
            competences_list = [
                "Digital Transformation & AI",
                "LLM Deployment (OpenAI, Claude)",
                "Make & n8n Workflow Automation",
                "Prompt Engineering (PIQPACC)",
                "Product Management & Agile",
                "Business Process Mapping",
                "Digital Marketing & Growth",
                "Traffic Management & SEO/SEA",
                "No-code & Low-code Tools",
                "Organizational Change Management"
            ]

    # Icônes SVG fines exactes
    icon_loc   = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2c3038" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
    icon_phone = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2c3038" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>'
    icon_mail  = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2c3038" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
    icon_in    = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2c3038" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>'
    icon_globe = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2c3038" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'

    profil_clean = profil
    if disponibilite and "disponible" not in profil.lower() and "available" not in profil.lower():
        profil_clean = f"{profil} {disponibilite}"

    html = f"""<!DOCTYPE html>
<html lang="{lang_key}">
<head>
    <meta charset="UTF-8">
    <title>CV — {nom}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {{
            size: A4 portrait;
            margin: 0;
        }}
        * {{
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}
        html, body {{
            margin: 0;
            padding: 0;
            background: #3a3f47;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #2b303a;
            -webkit-font-smoothing: antialiased;
        }}

        /* ── Coquille A4 stricte (210mm x 297mm) ── */
        .page {{
            position: relative;
            width: 210mm;
            height: 297mm;
            max-height: 297mm;
            margin: 20px auto;
            background: #ffffff;
            display: flex;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(0,0,0,.45);
        }}
        @media print {{
            body {{
                background: none;
            }}
            .page {{
                margin: 0;
                box-shadow: none;
                width: 210mm;
                height: 297mm;
            }}
        }}

        /* ════════════════════════════════════════
           SIDEBAR GAUCHE (69mm)
        ════════════════════════════════════════ */
        .sidebar {{
            width: 69mm;
            min-width: 69mm;
            height: 297mm;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            position: relative;
            z-index: 10;
        }}

        /* Photo de profil studio (70mm) */
        .photo-wrap {{
            width: 69mm;
            height: 70mm;
            background: #d1d6dc;
            overflow: hidden;
            flex-shrink: 0;
        }}
        .photo-wrap img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 20%;
            display: block;
        }}

        /* Bandeau Nom & Titre (26mm) avec onglet débordant */
        .banner-wrap {{
            position: relative;
            width: 69mm;
            height: 26mm;
            flex-shrink: 0;
        }}
        .name-banner {{
            background: #7d8692;
            color: #ffffff;
            padding: 10px 14px 9px;
            width: 69mm;
            height: 26mm;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }}
        .name-banner-tab {{
            position: absolute;
            top: 0;
            left: 69mm;
            width: 12mm;
            height: 26mm;
            background: #d2d7de;
            z-index: 15;
        }}
        .name-banner h1 {{
            font-family: 'Montserrat', sans-serif;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            margin: 0;
            line-height: 1.15;
            color: #ffffff;
        }}
        .name-banner p {{
            font-family: 'Montserrat', sans-serif;
            font-size: 6.8px;
            font-weight: 600;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            margin: 4px 0 0;
            color: #f1f3f5;
            line-height: 1.25;
        }}

        /* Bloc sombre COMPÉTENCES (90.5mm) */
        .block-dark {{
            background: #18191c;
            color: #ffffff;
            padding: 13px 13px 10px;
            height: 90.5mm;
            box-sizing: border-box;
            flex-shrink: 0;
        }}
        .section-lbl-white {{
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #a45252;
            margin: 0 0 9px;
        }}
        .skill-item {{
            font-size: 10.5px;
            color: #f3f4f6;
            margin-bottom: 0;
            line-height: 2.25;
            letter-spacing: 0.1px;
        }}
        .skill-item:last-child {{
            margin-bottom: 0;
        }}

        /* Bloc blanc inférieur (LANGUES, FORMATION, CERTIFICATIONS) (110.5mm) */
        .block-light {{
            background: #ffffff;
            padding: 13px 13px 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
        }}
        .section-lbl-dark {{
            font-family: 'Montserrat', sans-serif;
            font-size: 9.6px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #4b5563;
            margin: 0 0 8px;
        }}
        .sidebar-divider {{
            height: 1px;
            background: #374151;
            margin: 11px 0 9px;
            border: none;
            width: 100%;
        }}
        .langue-row {{
            font-size: 8.2px;
            color: #374151;
            margin-bottom: 4px;
            line-height: 1.35;
        }}
        .langue-row strong {{
            font-weight: 600;
            color: #1f2937;
        }}
        .formation-block {{
            margin-bottom: 8px;
        }}
        .formation-block:last-child {{
            margin-bottom: 0;
        }}
        .formation-school {{
            font-family: 'Montserrat', sans-serif;
            font-size: 8.3px;
            font-weight: 700;
            text-transform: uppercase;
            color: #4b5563;
            letter-spacing: 0.2px;
            margin-bottom: 1.5px;
        }}
        .formation-diplome {{
            font-size: 7.9px;
            color: #374151;
            margin-bottom: 1px;
        }}
        .formation-meta {{
            font-size: 7.5px;
            color: #6b7280;
        }}

        /* ════════════════════════════════════════
           CORPS PRINCIPAL DROIT (141mm)
        ════════════════════════════════════════ */
        .main {{
            width: 141mm;
            height: 297mm;
            padding: 14mm 13mm 10mm 15mm;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            position: relative;
            box-sizing: border-box;
        }}

        /* Section PROFIL (alignée avec le haut de la photo) */
        .profil-container {{
            height: 56mm;
            box-sizing: border-box;
        }}
        .main-title {{
            font-family: 'Montserrat', sans-serif;
            font-size: 12.2px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #a45252;
            margin: 0 0 6px;
        }}
        .profil-text {{
            font-size: 11px;
            line-height: 1.45;
            color: #4b5563;
            text-align: justify;
            margin: 0;
        }}

        /* Cartouche Contact compact */
        .contact-card {{
            border-top: 1px solid #4b5563;
            border-bottom: 1px solid #4b5563;
            padding: 2px 0;
            margin-bottom: 4mm;
        }}
        .contact-row {{
            display: flex;
            align-items: center;
            padding: 2px 0;
            border-bottom: 1px solid #e5e7eb;
            font-size: 7.9px;
            color: #374151;
        }}
        .contact-row:last-child {{
            border-bottom: none;
        }}
        .contact-col-full {{
            width: 100%;
            display: flex;
            align-items: center;
        }}
        .contact-col-half {{
            width: 50%;
            display: flex;
            align-items: center;
        }}
        .contact-icon {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            margin-right: 6px;
            flex-shrink: 0;
        }}
        .contact-card a {{
            color: #374151;
            text-decoration: none;
        }}

        /* Expériences Professionnelles */
        .exp-section {{
            flex: 1;
            display: flex;
            flex-direction: column;
        }}
        .exp-container {{
            display: flex;
            flex-direction: column;
            gap: 11px;
        }}
        .exp-item {{
            position: relative;
        }}
        .exp-title {{
            font-family: 'Montserrat', sans-serif;
            font-size: 10.2px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #374151;
            margin-bottom: 3.5px;
        }}
        .exp-subrow {{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 5px;
        }}
        .exp-company {{
            font-size: 9px;
            font-weight: 600;
            color: #4b5563;
        }}
        .exp-date {{
            font-size: 8.4px;
            color: #6b7280;
            font-weight: 500;
            white-space: nowrap;
        }}
        .exp-bullets {{
            margin: 0;
            padding-left: 13px;
            font-size: 8px;
            line-height: 1.45;
            color: #4b5563;
        }}
        .exp-bullets li {{
            margin-bottom: 2px;
        }}
        .exp-bullets li:last-child {{
            margin-bottom: 0;
        }}
    </style>
</head>
<body>
<div class="page">

    <!-- ══ SIDEBAR GAUCHE (69mm) ══ -->
    <div class="sidebar">
        <!-- Photo portrait (70mm) -->
        <div class="photo-wrap">
            {"<img src='" + photo_b64 + "' alt='" + nom + "'>" if photo_b64 else ""}
        </div>

        <!-- Bandeau Nom & Titre (26mm) -->
        <div class="banner-wrap">
            <div class="name-banner">
                <h1>{nom}</h1>
                <p>{titre}</p>
            </div>
            <div class="name-banner-tab"></div>
        </div>

        <!-- Bloc sombre COMPÉTENCES (90.5mm) -->
        <div class="block-dark">
            <div class="section-lbl-white">{labels['competences']}</div>
"""
    for comp in competences_list:
        html += f"""            <div class="skill-item">{comp}</div>\n"""

    html += f"""        </div>

        <!-- Bloc blanc inférieur (110.5mm) -->
        <div class="block-light">
            <div class="section-lbl-dark">{labels['langues']}</div>
"""
    for lg in langues_list:
        html += f"""            <div class="langue-row"><strong>{lg['nom']}</strong> : {lg['niveau']}</div>\n"""

    html += f"""            <hr class="sidebar-divider">

            <div class="section-lbl-dark">{labels['formation']}</div>
"""
    for f in formations_list:
        html += f"""            <div class="formation-block">
                <div class="formation-school">{f['ecole']}</div>
                <div class="formation-diplome">{f['diplome']}</div>
                <div class="formation-meta">{f['periode']}, {f['lieu']}</div>
            </div>\n"""

    if certifications_list:
        html += f"""            <hr class="sidebar-divider" style="margin: 8px 0;">
            <div class="section-lbl-dark">{labels['certifications']}</div>
"""
        for c in certifications_list[:3]:
            html += f"""            <div class="formation-block" style="margin-bottom:6px;">
                <div class="formation-diplome" style="font-weight:600;color:#374151;">{c['titre']}</div>
                {"<div class='formation-meta'>" + c.get('emetteur','') + "</div>" if c.get('emetteur') else ""}
            </div>\n"""

    html += f"""        </div>
    </div>

    <!-- ══ CORPS PRINCIPAL DROIT (141mm) ══ -->
    <div class="main">
        <!-- 1. Section PROFIL (56mm, aligné avec la photo) -->
        <div class="profil-container">
            <div class="main-title">{labels['profil']}</div>
            <p class="profil-text">{profil_clean}</p>
        </div>

        <!-- 2. Cartouche CONTACT (26mm, aligné avec le bandeau nom) -->
        <div class="contact-card">
            <div class="contact-row">
                <div class="contact-col-full">
                    <span class="contact-icon">{icon_loc}</span>
                    <span>{contact.get('localisation','')}</span>
                </div>
            </div>
            <div class="contact-row">
                <div class="contact-col-half">
                    <span class="contact-icon">{icon_phone}</span>
                    <span>{contact.get('telephone','')}</span>
                </div>
                <div class="contact-col-half">
                    <span class="contact-icon">{icon_mail}</span>
                    <a href="mailto:{contact.get('email','')}">{contact.get('email','')}</a>
                </div>
            </div>
            <div class="contact-row">
                <div class="contact-col-half">
                    <span class="contact-icon">{icon_in}</span>
                    <a href="https://{contact.get('linkedin','')}" target="_blank">{contact.get('linkedin','')}</a>
                </div>
                <div class="contact-col-half">
                    <span class="contact-icon">{icon_globe}</span>
                    <a href="http://{contact.get('site_web','')}" target="_blank">{contact.get('site_web','')}</a>
                </div>
            </div>
        </div>

        <!-- 3. Section EXPÉRIENCES (alignée avec le bloc noir compétences) -->
        <div class="exp-section">
            <div class="main-title" style="margin-bottom: 7px;">{labels['experiences']}</div>
            <div class="exp-container">
"""
    for exp in experiences:
        bullets_html = "".join(f"<li>{b}</li>" for b in exp.get("bullets", []))
        html += f"""                <div class="exp-item">
                    <div class="exp-title">{exp.get('poste','')}</div>
                    <div class="exp-subrow">
                        <span class="exp-company">{exp.get('entreprise','')} — {exp.get('lieu','')}</span>
                        <span class="exp-date">{exp.get('periode','')}</span>
                    </div>
                    <ul class="exp-bullets">{bullets_html}</ul>
                </div>\n"""

    html += f"""            </div>
        </div>
    </div>

</div>
</body>
</html>
"""
    return html


def build_cv(data_file, output_html, output_pdf=None, lang="fr"):
    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    actual_lang = lang or data.get("lang", "fr")
    html_content = generate_cv_html(data, lang=actual_lang)

    os.makedirs(os.path.dirname(os.path.abspath(output_html)), exist_ok=True)
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[OK] HTML ({actual_lang}) : {os.path.abspath(output_html)}")

    if output_pdf:
        pdf_res = render_html_to_pdf(output_html, output_pdf)
        print(f"[OK] PDF  ({actual_lang}) : {pdf_res}")
        return output_html, pdf_res

    return output_html, None


def build_all():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    pub_dir = os.path.abspath(os.path.join(script_dir, "..", "public", "Cv"))
    os.makedirs(pub_dir, exist_ok=True)

    json_fr = os.path.join(script_dir, "cv_data.json")
    json_en = os.path.join(script_dir, "cv_data_en.json")

    # 1. Version Française
    html_fr_pub = os.path.join(pub_dir, "CV_Jesse_Ogoula.html")
    pdf_fr_pub  = os.path.join(pub_dir, "CV_Jesse_Ogoula.pdf")
    build_cv(json_fr, html_fr_pub, pdf_fr_pub, lang="fr")
    pdf_fr_legacy = os.path.join(pub_dir, "CVjesse - French.pdf")
    if os.path.exists(pdf_fr_pub):
        shutil.copy2(pdf_fr_pub, pdf_fr_legacy)

    # 2. Version Anglaise
    html_en_pub = os.path.join(pub_dir, "CV_Jesse_Ogoula_EN.html")
    pdf_en_pub  = os.path.join(pub_dir, "CV_Jesse_Ogoula_EN.pdf")
    build_cv(json_en, html_en_pub, pdf_en_pub, lang="en")
    pdf_en_legacy = os.path.join(pub_dir, "CVjesse - English.pdf")
    if os.path.exists(pdf_en_pub):
        shutil.copy2(pdf_en_pub, pdf_en_legacy)

    print("\n[SUCCES] Toutes les versions (FR & EN) ont ete generees avec succes dans public/Cv/ !")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CV Generator — Jesse Ogoula")
    parser.add_argument("--json", required=False, help="Chemin vers cv_data.json")
    parser.add_argument("--html", required=False, help="Chemin de sortie HTML")
    parser.add_argument("--pdf", required=False, help="Chemin de sortie PDF (optionnel)")
    parser.add_argument("--lang", required=False, default="fr", help="Langue ('fr' ou 'en')")
    parser.add_argument("--all", action="store_true", help="Génère toutes les versions (FR + EN)")
    args = parser.parse_args()

    if args.all or (not args.json and not args.html):
        build_all()
    else:
        build_cv(args.json, args.html, args.pdf, lang=args.lang)
