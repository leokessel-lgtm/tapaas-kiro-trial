# Known Pages Glen Review Map

## TLDR

Selected precise page/frame/instance candidates for exploratory engineering review. It does not claim they are confirmed TaPaaS schema pages.

Shell/global content may still be visible in Figma evidence, but this pack separates it from likely transaction fields.

## Selected Pages

| Order | Node ID | Figma name | Type | Safe label |
|---:|---|---|---|---|
| 1 | `490:60286` | 0.1D_NOD | FRAME | Privacy / terms acknowledgement page |
| 2 | `490:60291` | 1.1A_NOD | FRAME | Vehicle details page |
| 3 | `531:23422` | NOD review - Individual | INSTANCE | Review page candidate |

## 1. Privacy / terms acknowledgement page

- Node: `490:60286` / 0.1D_NOD
- Type: FRAME
- Confidence: high
- Why selected: Best available child FRAME inside the Privacy section. Avoids broad SECTION-level extraction.
- Headings: Submit a notice of disposal for a vehicle; Privacy; Privacy collection notice; Service NSW delivers this service on behalf of Transport of NSW and some personal information will be shared with them. To learn how your personal information is handled, visit the Notice of Disposal privacy statement and Terms and Conditions and call 13 77 88.; Terms and conditions; I accept the terms and conditions for Notice of Disposal; Notifications; We will send you an email with the details of your notice of disposal after you complete and submit this form online.
- Likely fields: Submit a notice of disposal for a vehicle; Privacy; Step name; Service NSW delivers this service on behalf of Transport of NSW and some personal information will be shared with them. To learn how your personal information is handled, visit the Notice of Disposal privacy statement and Terms and Conditions and call 13 77 88.; Terms and conditions; These are the Terms and Conditions .; I accept the terms and conditions for Notice of Disposal; We will send you an email with the details of your notice of disposal after you complete and submit this form online.; Continue; Exit
- Likely CTAs: Continue; Exit
- Likely shell/global elements: Header; .Nav links; System icons / Globe; System icons/ChevronDown; System icons/Avatar; System icons/SignOut; NSW Gov + Service NSW (Coupled); NSW Government logo; Service NSW logo; .Main Navigation Links; Search bar; 2. Form header; 02. Components/Navigation/Header/Desktop/Default Copy; Change language; Account; Log out; Home; Find services; Business; Find locations; Search; ACKNOWLEDGEMENT OF COUNTRY; We acknowledge the Traditional Custodians of NSW, and their continued connection to land, water and culture. We pay our respects to Elders past and present.; FIND SERVICES; Births, relationships and deaths; Boating, fishing and outdoors; Business, industries and employment; Concessions, rebates and assistance; Driving and transport; Education; Emergencies and natural disasters; Environment, parks and wildlife; Health and care; Housing and property; Legal and Police services; SERVICE NSW; About us; Jobs at Service NSW; News; Service status; Performance dashboard; Download the Service NSW app; Help in your language
- Validation evidence: None detected

## 2. Vehicle details page

- Node: `490:60291` / 1.1A_NOD
- Type: FRAME
- Confidence: medium
- Why selected: Best available child FRAME inside the Vehicle details section. Needs confirmation but is more precise than SECTION-level extraction.
- Headings: Submit a notice of disposal for a vehicle; Vehicle selection; Select the vehicle you sold to continue; Search for another vehicle; Enter a plate number, for example ABC123, or 8 digit billing number on your renewal notice or Certificate of Registration.; Privacy
- Likely fields: Submit a notice of disposal for a vehicle; Vehicle selection; Step name; Select the vehicle you sold to continue; ADC74M; Billing number:; Registration expiry:; Select vehicle; RRF293; Search for another vehicle; Enter a NSW plate number; NSW plate number or billing number
- Likely CTAs: Back; Exit
- Likely shell/global elements: Header; .Nav links; System icons / Globe; System icons/ChevronDown; System icons/Avatar; System icons/SignOut; NSW Gov + Service NSW (Coupled); NSW Government logo; Service NSW logo; .Main Navigation Links; Search bar; 2. Form header; Footer; Change language; Account; Log out; Home; Find services; Business; Find locations; Search; ACKNOWLEDGEMENT OF COUNTRY; We acknowledge the Traditional Custodians of NSW, and their continued connection to land, water and culture. We pay our respects to Elders past and present.; FIND SERVICES; Births, relationships and deaths; Boating, fishing and outdoors; Business, industries and employment; Concessions, rebates and assistance; Driving and transport; Education; Emergencies and natural disasters; Environment, parks and wildlife; Health and care; Housing and property; Legal and Police services; SERVICE NSW; About us; Jobs at Service NSW; News; Service status; Performance dashboard; Download the Service NSW app; Help in your language
- Validation evidence: None detected

## 3. Review page candidate

- Node: `531:23422` / NOD review - Individual
- Type: INSTANCE
- Confidence: medium
- Why selected: Best available review-page candidate from local evidence. It is an INSTANCE, not a clean child FRAME, so it requires Glen/Michael confirmation.
- Caveat: INSTANCE candidate; requires Glen/Michael confirmation because it is not a clean child FRAME.
- Headings: Submit a notice of disposal for a vehicle; Review; Make sure all your details are correct; Your details; First section; Following section; Vehicle details; Sale and buyer details
- Likely fields: Submit a notice of disposal for a vehicle; Step name; Family name; Label; Vehicle details; Plate number; Vehicle information; VIN/Chassis; Registration expiry; Date of sale; Sale price or market value; NSW Driver Licence
- Likely CTAs: Back; Submit; Exit
- Likely shell/global elements: 02. Components/Navigation/Header/Desktop/Default; .Nav links; System icons / Globe; System icons/ChevronDown; System icons/Avatar; System icons/SignOut; NSW Gov + Service NSW (Coupled); NSW Government logo; Service NSW logo; .Main Navigation Links; Search bar; 2. Form header; .Accordion Header; 02. Components/Navigation/Header/Desktop/Default Copy; Change language; Account; Log out; Home; Find services; Business; Find locations; Search; ACKNOWLEDGEMENT OF COUNTRY; We acknowledge the Traditional Custodians of NSW, and their continued connection to land, water and culture. We pay our respects to Elders past and present.; FIND SERVICES; Births, relationships and deaths; Boating, fishing and outdoors; Business, industries and employment; Concessions, rebates and assistance; Driving and transport; Education; Emergencies and natural disasters; Environment, parks and wildlife; Health and care; Housing and property; Legal and Police services; SERVICE NSW; About us; Jobs at Service NSW; News; Service status; Performance dashboard; Download the Service NSW app; Help in your language
- Validation evidence: None detected

## Asks For Glen

- Confirm which TaPaaS schema concepts match each selected page frame.
- Confirm which detected fields, CTAs and validation evidence should be represented in schema.
- Confirm which shell/global elements should be excluded, inherited or represented.
- Provide a minimal schema sample or block catalogue excerpt for the selected page types.
- Identify any candidate mappings that are misleading or should be removed.

## Do Not Overclaim

- Do not call these confirmed TaPaaS schema pages.
- Do not treat the Review INSTANCE candidate as confirmed page-frame evidence.
- Do not claim production readiness.
- Do not claim backend integration.
- Do not claim TaPaaS schema compatibility.
- Do not claim accessibility, privacy/legal, GEL or TaPaaS approval.

