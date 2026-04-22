/**
 * Extradition treaty data — ported from the Extradition Atlas POC.
 * Country codes are ISO 3166-1 numeric (matching world-atlas topojson).
 *
 * Sources: US State Department list (18 U.S.C. § 3181), Wikipedia's
 * extradition treaty compilations, Eurojust / NCA guidance on the EAW
 * and TCA. Treaty status for some smaller states is inferred from
 * legacy instruments and may have been superseded by domestic law.
 * Illustration, not legal advice.
 */

export type StatusClass =
  | 'anchor'
  | 'treaty'
  | 'reluctant'
  | 'suspended'
  | 'no-treaty'
  | 'haven'
  | 'eu-bloc';

export interface StatTile {
  label: string;
  value: string;
  unit?: string;
  note: string;
}

export interface Anchor {
  id: string;
  label: string;
  short: string;
  partners: Set<string>;
  reluctant?: Set<string>;
  suspended?: Set<string>;
  bloc?: Set<string>;
  note: string;
  statTiles?: StatTile[];
}

/** EU member states — all covered by the European Arrest Warrant. */
export const EU_MEMBERS = new Set<string>([
  '040', '056', '100', '191', '196', '203', '208', '233', '246', '250',
  '276', '300', '348', '372', '380', '428', '440', '442', '470', '528',
  '616', '620', '642', '703', '705', '724', '752',
]);

/** US extradition treaty partners (ISO numeric). 116 on record; most recent: Croatia 2022. */
const US_TREATY_PARTNERS = new Set<string>([
  '008', '028', '032', '036', '040', '044', '052', '056', '084', '068',
  '070', '076', '100', '124', '152', '170', '178', '188', '191', '192',
  '196', '203', '208', '212', '214', '218', '818', '222', '233', '748',
  '242', '246', '250', '270', '276', '288', '300', '308', '320', '328',
  '332', '340', '344', '348', '352', '356', '368', '372', '376', '380',
  '388', '392', '400', '404', '296', '383', '428', '426', '430', '438',
  '440', '442', '454', '458', '470', '584', '480', '484', '583', '492',
  '499', '104', '520', '528', '554', '558', '566', '807', '578', '586',
  '585', '591', '598', '600', '604', '608', '616', '620', '642', '659',
  '662', '670', '674', '688', '690', '694', '702', '703', '705', '710',
  '410', '724', '144', '740', '752', '756', '834', '764', '776', '780',
  '792', '798', '826', '858', '862', '894', '716',
]);

const US_RELUCTANT = new Set<string>([
  '192', '068', '218', '818', '352', '558', '586', '756', '862', '716',
]);

const US_SUSPENDED = new Set<string>(['344']); // Hong Kong, suspended 2020

/** UK treaty partners — EU via TCA plus bilateral Category 2 list. */
const UK_TREATY_PARTNERS = new Set<string>([
  ...EU_MEMBERS,
  '840', '036', '124', '554', '710', '356', '376', '392', '410', '484',
  '032', '076', '152', '604', '858', '170', '188', '320', '578', '352',
  '756', '438', '492', '674', '336', '807', '008', '688', '070', '499',
  '792', '818', '400', '368', '404', '834', '800', '454', '894', '716',
  '566', '288', '694', '270', '430', '458', '702', '764', '608', '144',
  '586', '050', '524', '480', '690', '242', '776', '520', '296', '798',
  '090', '548', '780', '388', '044', '052', '084', '212', '308', '328',
  '659', '662', '670', '028',
]);

const UK_RELUCTANT = new Set<string>(['643', '156', '364', '784']);

/** Australia — Extradition Act 1988 regulations. */
const AU_TREATY_PARTNERS = new Set<string>([
  ...EU_MEMBERS,
  '826', '840', '124', '554', '392', '410', '458', '702', '360', '704',
  '608', '764', '156', '344', '356', '376', '710', '484', '076', '032',
  '152', '858', '792', '818', '578', '352', '756', '008', '688', '807',
  '586', '144', '242', '598', '090', '548', '776',
]);

/** AU signed a China treaty but never ratified — treat as reluctant. */
const AU_RELUCTANT = new Set<string>(['156']);

/** Canada — Extradition Act Schedule partners. */
const CA_TREATY_PARTNERS = new Set<string>([
  ...EU_MEMBERS,
  '840', '826', '036', '554', '392', '410', '376', '484', '032', '076',
  '152', '170', '858', '356', '458', '608', '764', '710', '578', '352',
  '756', '792', '818', '404', '388', '044', '052', '780', '328', '144',
  '242', '598', '480', '690', '800', '834', '894', '716', '566', '288',
]);

/** Russia — CIS Minsk Convention + select bilateral. Does not extradite its own nationals. */
const RU_TREATY_PARTNERS = new Set<string>([
  '051', '031', '112', '398', '417', '498', '762', '795', '804', '860',
  '268', '156', '408', '496', '364', '704', '116', '418', '356', '192',
  '214', '032', '076', '818', '368', '887', '504', '324', '566', '716',
  '360', '484', '604', '170', '410', '100', '616', '348', '203', '703',
  '300', '196', '724', '380', '008', '688', '070', '807', '499', '191',
  '705', '642', '233', '428', '440', '246',
]);

/** China — ~60 bilateral treaties, rapidly expanding since 2010s. */
const CN_TREATY_PARTNERS = new Set<string>([
  '764', '112', '643', '398', '417', '762', '860', '795', '496', '408',
  '704', '418', '116', '104', '050', '064', '524', '586', '144', '364',
  '792', '051', '031', '498', '804', '268', '100', '642', '616', '348',
  '300', '196', '620', '724', '380', '250', '056', '528', '008', '688',
  '070', '807', '032', '076', '152', '170', '604', '484', '818', '710',
  '404', '566', '800', '231', '012', '716', '894', '454', '508', '024',
  '784', '036',
]);

/** AU-China treaty signed 2007 but never ratified — reluctant. */
const CN_RELUCTANT = new Set<string>(['036']);

/** UAE — Riyadh Arab Convention + GCC + expanding bilateral network. */
const AE_TREATY_PARTNERS = new Set<string>([
  '048', '414', '512', '634', '682', '887', '818', '400', '422', '760',
  '504', '788', '012', '368', '729', '706', '262', '174', '364', '792',
  '356', '586', '050', '144', '104', '764', '458', '702', '608', '360',
  '156', '410', '392', '076', '032', '643', '826', '250', '276', '380',
  '724', '620', '528', '056', '616', '300', '196', '100', '642', '710',
  '566', '036',
]);

/**
 * Notorious non-extradition havens — commonly cited fugitive destinations
 * from Western states. "Haven" status is contextual: a haven that has a
 * treaty with the current anchor is just a treaty partner with caveats.
 */
export const FUGITIVE_HAVENS = new Set<string>([
  '643', '156', '364', '408', '704', '398', '496', '158', '784', '682',
  '634', '414', '048', '512', '887', '499', '020', '028', '732', '504',
  '148', '140', '180', '231', '262', '706', '096', '116', '418', '050',
  '524', '064', '462', '004',
]);

/** Country-name overrides where the topojson name doesn't match common usage. */
export const COUNTRY_NAMES: Record<string, string> = {
  '840': 'United States',
  '826': 'United Kingdom',
  '643': 'Russia',
  '156': 'China',
  '410': 'South Korea',
  '408': 'North Korea',
  '704': 'Vietnam',
  '360': 'Indonesia',
  '784': 'United Arab Emirates',
  '752': 'Sweden',
  '756': 'Switzerland',
  '036': 'Australia',
  '124': 'Canada',
  '250': 'France',
  '276': 'Germany',
  '528': 'Netherlands',
  '392': 'Japan',
  '356': 'India',
  '076': 'Brazil',
  '032': 'Argentina',
  '484': 'Mexico',
  '710': 'South Africa',
  '818': 'Egypt',
  '566': 'Nigeria',
};

/** Eight anchors offered to the reader. The Atlas's core UX. */
export const ANCHORS: Anchor[] = [
  {
    id: '840',
    label: 'United States',
    short: 'US',
    partners: US_TREATY_PARTNERS,
    reluctant: US_RELUCTANT,
    suspended: US_SUSPENDED,
    note: '116 bilateral treaties. Most recent: Croatia (2022). No treaty with China, Russia, Iran, the Gulf states, or most of Africa.',
  },
  {
    id: '826',
    label: 'United Kingdom',
    short: 'UK',
    partners: UK_TREATY_PARTNERS,
    reluctant: UK_RELUCTANT,
    note: 'Category 1 (EU via the Trade & Cooperation Agreement, streamlined surrender) plus ~100 Category 2 bilateral partners. The EAW was replaced by TCA surrender warrants in 2021 after Brexit.',
  },
  {
    id: 'eu',
    label: 'European Union',
    short: 'EU',
    partners: new Set<string>([
      ...EU_MEMBERS,
      '840', '826', '036', '124', '554', '392', '410', '356', '710', '032',
      '076', '152', '484', '578', '352', '756', '792', '818', '376', '492',
      '438', '674', '188', '170', '260',
    ]),
    bloc: EU_MEMBERS,
    note: '27 member states share the European Arrest Warrant — surrender without political involvement, strict time limits, no bar on extraditing nationals. External treaties vary by state; the map shows commonly-held partners.',
  },
  {
    id: '036',
    label: 'Australia',
    short: 'AU',
    partners: AU_TREATY_PARTNERS,
    reluctant: AU_RELUCTANT,
    note: 'Extradition Act 1988 with ~40 treaty-designated partners. The 2007 China treaty was signed but the enabling regulations were withdrawn in 2017 — effectively non-operational.',
  },
  {
    id: '124',
    label: 'Canada',
    short: 'CA',
    partners: CA_TREATY_PARTNERS,
    note: 'Extradition Act partners listed by Order in Council. Close cooperation with the US (the shared border makes this the most active corridor), UK, EU, and Commonwealth.',
  },
  {
    id: '643',
    label: 'Russia',
    short: 'RU',
    partners: RU_TREATY_PARTNERS,
    note: 'CIS Minsk Convention (1993) binds post-Soviet states. Selective bilateral treaties beyond. Does not extradite its own nationals (constitutional bar) and has no treaty with the US, UK, or Canada.',
  },
  {
    id: '156',
    label: 'China',
    short: 'CN',
    partners: CN_TREATY_PARTNERS,
    reluctant: CN_RELUCTANT,
    note: '~60 bilateral treaties, rapidly expanding since the 2010s. No treaty with the US, UK, or Canada. Western courts often refuse China\'s requests over due-process and torture concerns.',
  },
  {
    id: '784',
    label: 'UAE',
    short: 'AE',
    partners: AE_TREATY_PARTNERS,
    note: 'The Riyadh Arab Convention binds GCC + the wider Arab League. Aggressive bilateral expansion with India, the UK (2008), France, and Pakistan. Still a common destination due to selective enforcement and investor-visa programs.',
  },
];
