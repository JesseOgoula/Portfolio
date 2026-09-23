import { useLanguage } from '@/contexts/LanguageContext';

interface LocalizedCollab {
  client: string;
  year: string;
  role: { fr: string; en: string };
  deliverables: { fr: string; en: string };
  status: { fr: string; en: string };
}

const collaborations: LocalizedCollab[] = [
  {
    client: 'ORGANISATION INTERNATIONALE DE LA FRANCOPHONIE (OIF)',
    year: '2024',
    role: { fr: 'EXPERT NUMÉRIQUE & FORMATEUR', en: 'DIGITAL EXPERT & MENTOR' },
    deliverables: { fr: 'PROGRAMME D-CLIC & PÉDAGOGIE ACTIVE NUMÉRIQUE', en: 'D-CLIC PROGRAMME & ACTIVE PEDAGOGY' },
    status: { fr: 'RÉALISÉ', en: 'COMPLETED' },
  },
  {
    client: 'AFRICAKARD (E-COMMERCE)',
    year: '2023',
    role: { fr: 'PRODUCT MANAGER', en: 'PRODUCT MANAGER' },
    deliverables: { fr: 'LANCEMENT D’OFFRES (+15% CA) & COORDINATION VISUELLE', en: 'OFFER ROLLOUT (+15% REV) & CREATIVE DIRECTION' },
    status: { fr: 'DÉPLOYÉ', en: 'LIVE PRODUCT' },
  },
  {
    client: 'ÉCOLE 241 / OGOOUÉ LABS',
    year: '2024',
    role: { fr: 'COACH FORMATEUR DIGITAL', en: 'DIGITAL TRAINER & COACH' },
    deliverables: { fr: 'ENCADREMENT 2 PROMOTIONS & SUPPORTS PÉDAGOGIQUES', en: 'MENTORING 2 COHORTS & DIGITAL CURRICULUM' },
    status: { fr: 'ACTIF', en: 'ACTIVE' },
  },
  {
    client: 'IBOGA LAB (SIKAAPP)',
    year: '2024 — 2026',
    role: { fr: 'PRODUCT STRATEGIST & LEAD UX', en: 'PRODUCT STRATEGIST & LEAD UX' },
    deliverables: { fr: 'APPLICATION MOBILE ML & DESIGN SYSTEM', en: 'ML BUDGET ENGINE & MOBILE DESIGN SYSTEM' },
    status: { fr: 'BETA PRIVÉE', en: 'ACTIVE BETA' },
  },
  {
    client: 'SIMPLON AFRICA',
    year: '2024',
    role: { fr: 'CONCEPTEUR PÉDAGOGIE ACTIVE', en: 'ACTIVE PEDAGOGY SPECIALIST' },
    deliverables: { fr: 'CERTIFICATION EN PÉDAGOGIE NUMÉRIQUE ACTIVE', en: 'ACTIVE PEDAGOGY METHODOLOGIES' },
    status: { fr: 'CERTIFIÉ', en: 'CERTIFIED' },
  },
  {
    client: 'FÉDÉRATION GABONAISE DE TENNIS DE TABLE (FGTT)',
    year: '2023',
    role: { fr: 'DIRECTEUR ARTISTIQUE & LEAD DEV', en: 'DIGITAL ART DIRECTOR & LEAD DEV' },
    deliverables: { fr: 'PORTAIL FÉDÉRAL OFFICIEL & CALENDRIER TOURNOIS', en: 'OFFICIAL TOURNAMENT & ATHLETE PLATFORM' },
    status: { fr: 'OFFICIEL', en: 'OFFICIAL' },
  },
  {
    client: 'CONSULTANT FREELANCE (20+ CLIENTS)',
    year: '2023 — 2026',
    role: { fr: 'STRATÉGIE PRODUIT & MANAGEMENT', en: 'PRODUCT STRATEGY & TEAMS' },
    deliverables: { fr: '+35% TRAFIC MOYEN & MANAGEMENT DESIGNERS/DÉVELOPPEURS', en: '+35% AVG TRAFFIC & CROSS-FUNCTIONAL TEAMS' },
    status: { fr: 'EN COURS', en: 'ONGOING' },
  },
];

const CollaborationsAndGrid = () => {
  const { language } = useLanguage();

  return (
    <section
      id="archive"
      className="relative bg-[#050505] text-[#F4F4F4] py-24 sm:py-32 lg:py-40 overflow-hidden hairline-b select-none"
    >
      {/* PART 1: EDITORIAL COLLABORATIONS TABLE */}
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 hairline-b gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
              <span>
                {language === 'fr'
                  ? '// 05 — RÉFÉRENCES INSTITUTIONNELLES & MISSIONS MAJEURES'
                  : '// 05 — PROVEN IMPACT & CLIENT ROSTER'}
              </span>
            </div>
            <h2 className="font-sans font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#F4F4F4]">
              {language === 'fr'
                ? 'RÉPERTOIRE DES COLLABORATIONS RÉCENTES'
                : 'A SELECTION OF RECENT COLLABORATIONS'}
            </h2>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-[#3A3A3A] uppercase">
            [ 2022 — 2026 INDEX ]
          </div>
        </div>

        {/* Minimalist Editorial Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="hairline-b font-mono text-[9px] tracking-[0.2em] text-[#3A3A3A] uppercase">
                <th className="py-3 font-normal">{language === 'fr' ? 'PARTENAIRE // CLIENT' : 'CLIENT // INSTITUTION'}</th>
                <th className="py-3 font-normal">{language === 'fr' ? 'ANNÉE' : 'YEAR'}</th>
                <th className="py-3 font-normal">{language === 'fr' ? 'MISSION / EXPERTISE' : 'ROLE'}</th>
                <th className="py-3 font-normal">{language === 'fr' ? 'LIVRABLES STRATÉGIQUES' : 'DELIVERABLES'}</th>
                <th className="py-3 text-right font-normal">{language === 'fr' ? 'STATUT' : 'STATUS'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515] font-mono text-[11px]">
              {collaborations.map((collab, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#0B0B0B] transition-colors duration-150 group"
                >
                  <td className="py-4 font-sans font-bold text-sm text-[#F4F4F4] group-hover:text-white transition-colors">
                    {collab.client}
                  </td>
                  <td className="py-4 text-[#B5B5B5]">{collab.year}</td>
                  <td className="py-4 text-[#B5B5B5] uppercase">{collab.role[language]}</td>
                  <td className="py-4 text-[#B5B5B5] uppercase">{collab.deliverables[language]}</td>
                  <td className="py-4 text-right">
                    <span className="inline-block px-2 py-0.5 bg-[#111] border border-[#222] text-[9px] tracking-widest text-[#F4F4F4] uppercase">
                      {collab.status[language]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CollaborationsAndGrid;
