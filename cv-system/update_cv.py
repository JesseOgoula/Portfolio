"""
Script de mise à jour rapide du CV (Français et Anglais).
Permet de modifier les données JSON puis régénérer automatiquement le CV en une commande.
"""
import os
import sys
import json
import argparse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FR = os.path.join(SCRIPT_DIR, "cv_data.json")
DATA_EN = os.path.join(SCRIPT_DIR, "cv_data_en.json")


def load_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data, file_path):
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] Sauvegarde : {file_path}")


def rebuild_all():
    from render_cv import build_all
    build_all()


def update_target(target_path, args):
    modified = False
    data = load_data(target_path)

    if args.titre:
        data["titre"] = args.titre
        modified = True
        print(f"  -> Titre mis a jour")

    if args.profil:
        data["profil"] = args.profil
        modified = True
        print(f"  -> Profil mis a jour")

    if args.dispo:
        data["disponibilite"] = args.dispo
        modified = True
        print(f"  -> Disponibilite mise a jour")

    if args.email:
        data["contact"]["email"] = args.email
        modified = True
        print(f"  -> Email mis a jour : {args.email}")

    if args.tel:
        data["contact"]["telephone"] = args.tel
        modified = True
        print(f"  -> Telephone mis a jour : {args.tel}")

    if args.add_bullet:
        entreprise, texte = args.add_bullet
        found = False
        for exp in data.get("experiences", []):
            if entreprise.lower() in exp.get("entreprise", "").lower():
                exp.setdefault("bullets", []).append(texte)
                found = True
                print(f"  -> Puce ajoutee a '{exp['entreprise']}'")
                break
        if not found:
            print(f"  [!] Entreprise '{entreprise}' non trouvee dans ce fichier.")
        else:
            modified = True

    if modified:
        save_data(data, target_path)

    return modified


def main():
    parser = argparse.ArgumentParser(description="Mise a jour rapide du CV (FR/EN)")
    parser.add_argument("--titre", help="Modifier le titre professionnel")
    parser.add_argument("--profil", help="Modifier le texte du profil")
    parser.add_argument("--dispo", help="Modifier la disponibilite")
    parser.add_argument("--email", help="Modifier l'email")
    parser.add_argument("--tel", help="Modifier le telephone")
    parser.add_argument("--add-bullet", nargs=2, metavar=("ENTREPRISE", "TEXTE"),
                        help="Ajouter une puce (nom entreprise, texte)")
    parser.add_argument("--lang", choices=["fr", "en", "both"], default="fr",
                        help="Cible de langue ('fr', 'en', ou 'both')")
    parser.add_argument("--build", action="store_true",
                        help="Regenerer les CV (FR + EN) sans modifier les donnees")
    parser.add_argument("--no-build", action="store_true",
                        help="Sauvegarder sans recompiler le PDF")

    args = parser.parse_args()

    targets = []
    if args.lang == "fr":
        targets = [DATA_FR]
    elif args.lang == "en":
        targets = [DATA_EN]
    else:
        targets = [DATA_FR, DATA_EN]

    any_modified = False
    for t in targets:
        if os.path.exists(t):
            mod = update_target(t, args)
            if mod:
                any_modified = True

    if not args.no_build and (any_modified or args.build):
        print("\nRecompilation complete de tous les CV...")
        rebuild_all()
    elif not any_modified and not args.build:
        parser.print_help()


if __name__ == "__main__":
    main()
