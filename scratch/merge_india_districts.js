const fs = require('fs');
const path = require('path');

const newDistricts = require('./new_states_data.json');
const currentFile = fs.readFileSync(path.join(__dirname, '../src/lib/indiaDistricts.ts'), 'utf8');

// Build state union type
const ALL_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'West Bengal',
];

const stateUnion = ALL_STATES.map((s) => `    | '${s}'`).join('\n');

const newInterface = `export type IndiaStateName =\n${stateUnion};\n\nexport interface IndiaDistrict {
  slug: string;
  name: string;
  hindiName: string;
  state: IndiaStateName;
  prominentFor: string;
  popularServices: string[];
  topIndustries: string[];
  localHighlights: string;
}`;

// Format new districts code
const formattedNewEntries = newDistricts.map((d) => {
  return `  {
    slug: '${d.slug}',
    name: '${d.name.replace(/'/g, "\\'")}',
    hindiName: '${d.hindiName.replace(/'/g, "\\'")}',
    state: '${d.state}',
    prominentFor: '${d.prominentFor.replace(/'/g, "\\'")}',
    popularServices: ${JSON.stringify(d.popularServices)},
    topIndustries: ${JSON.stringify(d.topIndustries)},
    localHighlights: '${d.localHighlights.replace(/'/g, "\\'")}',
  },`;
}).join('\n');

// Replace interface at start
let updated = currentFile.replace(/export interface IndiaDistrict\s*\{[\s\S]*?localHighlights:\s*string;\s*\}/, newInterface);

// Insert new districts right before `];`
const insertionMarker = '\n];\n\n// Helper functions for All-India districts';
const replacement = `\n${formattedNewEntries}\n];\n\n// Helper functions for All-India districts`;

updated = updated.replace(insertionMarker, replacement);

// Update ALL_COVERED_STATES
const allCoveredStatesCode = `export const ALL_COVERED_STATES = [
  'Uttar Pradesh',
  'Bihar',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'West Bengal',
] as const;`;

updated = updated.replace(/export const ALL_COVERED_STATES = \[[\s\S]*?\] as const;/, allCoveredStatesCode);

fs.writeFileSync(path.join(__dirname, '../src/lib/indiaDistricts.ts'), updated, 'utf8');
console.log('Successfully updated src/lib/indiaDistricts.ts');
