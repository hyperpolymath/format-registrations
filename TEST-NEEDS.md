# CRG Grade C Test Coverage

**Repository:** format-registrations  
**Grade:** C  
**Last Updated:** 2026-04-04

## Overview

This repository contains formal format registrations for A2ML and K9 across multiple standards bodies and registries:
- IANA media type registrations (RFC 6838)
- File magic database entries (libmagic)
- MIME type definitions (shared-mime-info)
- Wikidata entity records

As a registration/data repository with no executable code, tests focus on:
- File presence and structure completeness
- Format validity (text, JSON, XML)
- RFC 6838 compliance for IANA registrations
- Consistency across format pairs (A2ML/K9)

## Test Categories

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| Unit Tests | 4 | ✓ PASS | File existence for all 4 registration types |
| Smoke Tests | 4 | ✓ PASS | Format validation, IANA structure, JSON/XML parsing |
| Contract Tests | 2 | ✓ PASS | Required IANA sections, RFC 6838 compliance |
| Aspect Tests | 3 | ✓ PASS | File pair consistency, SPDX headers, XML balance |
| Property-Based Tests | 3 | ✓ PASS | JSON parseability, non-empty files, directory completeness |
| E2E/Reflexive Tests | 3 | ✓ PASS | IANA parsing, MIME XML structure, Wikidata JSON validation |
| Benchmarks | 2 | ✓ PASS | File read performance, registration size baseline |

**Total Test Count:** 21  
**All Tests Passing:** Yes

## Running Tests

```bash
deno test --allow-read tests/validate.test.ts
```

## Test Details

### Unit Tests (4)
- Validates IANA media type files (a2ml, k9)
- Confirms file magic entries exist
- Checks MIME type XML files
- Verifies Wikidata JSON entities exist

### Smoke Tests (4)
- IANA registration contains type/subtype names
- File magic entries reference correct format names
- MIME type XML is well-formed
- Wikidata JSON is syntactically valid

### Contract Tests (2)
- IANA registrations have all RFC 6838 required sections:
  - Type name, Subtype name
  - Encoding considerations, Security considerations
  - Published specification, Applications
- Both A2ML and K9 registrations follow same structure

### Aspect Tests (3)
- File pairs (A2ML/K9) exist in all directories
- SPDX license headers present in text files
- XML files have properly balanced tags

### Property-Based Tests (3)
- All JSON files are valid and parseable
- All text/registration files are non-empty
- All expected directories exist and contain files

### E2E/Reflexive Tests (3)
- IANA registration can be parsed for type/subtype
- MIME type XML can be parsed for structure
- Wikidata JSON is valid structured data

### Benchmarks (2)
- File read operations complete in < 500ms total
- IANA registrations meet RFC 6838 minimum size (≥ 2000 chars)

## Registration Status

### IANA Media Types
- **A2ML** (application/vnd.a2ml)
  - Status: Revision 2 (2026-04-03)
  - Submission: Pending via IANA web form
  - File: `iana/a2ml-media-type.txt`

- **K9** (application/vnd.k9)
  - Status: Prepared per RFC 6838
  - Submission: Pending
  - File: `iana/k9-media-type.txt`

### File Magic Entries
- libmagic signatures for format detection
- Files: `file-magic/*.magic`

### MIME Type Definitions
- shared-mime-info XML for desktop integration
- Files: `shared-mime-info/*.xml`

### Wikidata Entities
- Wikidata JSON for A2ML and K9 entities
- Files: `wikidata/*.json`

## Dependencies

- Deno 1.40+
- deno_std (assert module)

## Future Enhancements

- [ ] Validate IANA checklist items
- [ ] Verify RFC references are accessible
- [ ] Check Wikidata entity completeness
- [ ] Validate file magic signatures against actual files
- [ ] Test MIME type XML against official schema
