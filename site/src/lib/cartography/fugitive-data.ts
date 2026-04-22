/**
 * Fugitive Destinations data — Plate II.
 *
 * Three anchors of origin (US, UK, EU). For each, two tiers of destination
 * plus a globally-shared "quiet havens" set that can be toggled.
 *
 *   · partners       → top destinations (most-cited / highest capture counts)
 *   · reluctant      → secondary destinations (recurring but less frequent)
 *   · QUIET_HAVENS   → reputational refuges (no/poor extradition cooperation)
 *
 * Country codes: ISO 3166-1 numeric, matching world-atlas topojson.
 *
 * Sources: US Marshals Service annual reports (foreign-fugitive captures);
 * FBI Most Wanted capture press releases 2014–2024; UK NCA Most Wanted
 * captures; Europol "Europe's Most Wanted"; reporting in The Guardian
 * (Costa del Crime), Reuters, NYT, BBC, ProPublica, ICIJ. Tiers reflect
 * frequency of capture or documented sightings in the public record, not
 * total fugitive populations (which are by definition unknown).
 *
 * Illustration, not enforcement intelligence.
 */

import { COUNTRY_NAMES as TREATY_COUNTRY_NAMES } from './treaty-data';
import type { CartographyAnchor } from '../../templates/Cartography.astro';

/* -------------------------------------------------------------------- */
/* US — fugitives originating from US jurisdictions                     */
/* -------------------------------------------------------------------- */

/** Top destinations — Mexico is the dominant entry by a wide margin. */
const US_TOP = new Set<string>([
  '484', // Mexico
  '124', // Canada
  '608', // Philippines
  '764', // Thailand
  '188', // Costa Rica
  '214', // Dominican Republic
  '340', // Honduras
  '084', // Belize
  '320', // Guatemala
  '170', // Colombia
  '218', // Ecuador
]);

/** Secondary destinations — recurring patterns, lower capture counts. */
const US_SECONDARY = new Set<string>([
  '076', // Brazil — constitutional bar on extraditing nationals
  '032', // Argentina
  '600', // Paraguay
  '068', // Bolivia
  '604', // Peru
  '222', // El Salvador
  '558', // Nicaragua
  '360', // Indonesia
  '704', // Vietnam
  '116', // Cambodia
]);

/* -------------------------------------------------------------------- */
/* UK — the Costa del Crime corridor + the Commonwealth long tail       */
/* -------------------------------------------------------------------- */

/**
 * Top destinations — historically dominated by the Costa del Sol, with
 * the wider Mediterranean and Northern-Cyprus enclave still doing the
 * bulk of UK-fugitive concealment.
 */
const UK_TOP = new Set<string>([
  '724', // Spain — the Costa del Crime
  '196', // Cyprus — esp. the unrecognised TRNC, no UK extradition
  '620', // Portugal
  '372', // Ireland
  '380', // Italy
  '470', // Malta
  '300', // Greece
  '784', // UAE — formal treaty 2008, slow in practice
]);

const UK_SECONDARY = new Set<string>([
  '764', // Thailand
  '586', // Pakistan
  '356', // India
  '076', // Brazil
  '710', // South Africa
  '818', // Egypt
  '504', // Morocco
  '608', // Philippines
  '388', // Jamaica
  '792', // Türkiye
]);

/* -------------------------------------------------------------------- */
/* EU — most EU fugitives are caught fast inside the EAW, so this map   */
/* is about where the ones who escape it actually surface.              */
/* -------------------------------------------------------------------- */

const EU_TOP = new Set<string>([
  '076', // Brazil
  '600', // Paraguay
  '032', // Argentina
  '784', // UAE — particularly Dubai
  '422', // Lebanon — Carlos Ghosn precedent, asylum patterns
  '376', // Israel — right of return for some
  '504', // Morocco
  '818', // Egypt
  '792', // Türkiye
  '643', // Russia — for selected high-profile cases
]);

const EU_SECONDARY = new Set<string>([
  '156', // China
  '364', // Iran
  '887', // Yemen
  '116', // Cambodia
  '704', // Vietnam
  '158', // Taiwan
  '050', // Bangladesh
  '144', // Sri Lanka
  '462', // Maldives
  '231', // Ethiopia
]);

/* -------------------------------------------------------------------- */
/* Quiet havens — reputationally common, formally hard to reach         */
/* -------------------------------------------------------------------- */

/**
 * Countries that recur in the literature as fugitive refuges — typically
 * because of an outright extradition vacuum, a constitutional bar on
 * surrendering nationals, political non-cooperation with Western states,
 * or some combination of all three. The toggle reveals these on top of
 * the tiered destination map.
 */
export const QUIET_HAVENS = new Set<string>([
  '643', // Russia
  '156', // China
  '364', // Iran
  '408', // North Korea
  '192', // Cuba
  '862', // Venezuela
  '112', // Belarus
  '887', // Yemen
  '706', // Somalia
  '729', // Sudan
  '004', // Afghanistan
  '760', // Syria
  '422', // Lebanon
  '600', // Paraguay
]);

/* -------------------------------------------------------------------- */
/* Country-name overrides — extend the treaty-data list                 */
/* -------------------------------------------------------------------- */

export const COUNTRY_NAMES: Record<string, string> = {
  ...TREATY_COUNTRY_NAMES,
  '422': 'Lebanon',
  '600': 'Paraguay',
  '862': 'Venezuela',
  '792': 'Türkiye',
  '388': 'Jamaica',
  '376': 'Israel',
  '504': 'Morocco',
  '218': 'Ecuador',
  '170': 'Colombia',
  '188': 'Costa Rica',
  '214': 'Dominican Republic',
  '340': 'Honduras',
  '084': 'Belize',
  '320': 'Guatemala',
  '724': 'Spain',
  '196': 'Cyprus',
  '620': 'Portugal',
  '372': 'Ireland',
  '380': 'Italy',
  '470': 'Malta',
  '300': 'Greece',
  '586': 'Pakistan',
};

/* -------------------------------------------------------------------- */
/* The three anchors                                                    */
/* -------------------------------------------------------------------- */

/** EU is empty as an anchor id in this dataset — same convention as the Atlas. */
export const ANCHORS: CartographyAnchor[] = [
  {
    id: '840',
    label: 'United States',
    short: 'US',
    partners: US_TOP,
    reluctant: US_SECONDARY,
    note: 'The US Marshals Service recovers more fugitives from Mexico each year than from any other foreign country — by a wide margin. Most of the rest cluster across the Caribbean, Central America, and South-East Asia.',
  },
  {
    id: '826',
    label: 'United Kingdom',
    short: 'UK',
    partners: UK_TOP,
    reluctant: UK_SECONDARY,
    note: 'The Costa del Sol earned the nickname Costa del Crime in the 1980s and never quite lost it. UK fugitives still concentrate along the Mediterranean — Spain, Cyprus, Portugal — with the Commonwealth providing a long secondary tail.',
  },
  {
    id: 'eu',
    label: 'European Union',
    short: 'EU',
    partners: EU_TOP,
    reluctant: EU_SECONDARY,
    bloc: new Set<string>(),
    note: 'The European Arrest Warrant catches most EU fugitives within the EU itself. The ones who clear the perimeter surface predictably — Brazil and Paraguay for the constitutional bar on extraditing nationals, Dubai and Beirut for the financial set, the small list of pariahs for everyone else.',
  },
];
