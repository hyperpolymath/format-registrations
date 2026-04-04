<!-- SPDX-License-Identifier: PMPL-1.0-or-later -->
<!-- Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk> -->
# TOPOLOGY.md — format-registrations

## Purpose

Registry of file format registrations for hyperpolymath formats (A2ML, K9, and others). Contains IANA media type registration submissions, file-magic entries, shared-mime-info definitions, and Wikidata format entries. Maintains authoritative format metadata for ecosystem-wide tooling.

## Module Map

```
format-registrations/
├── iana/              # IANA media type registration files
├── file-magic/        # libmagic / file(1) magic entries
├── shared-mime-info/  # freedesktop.org shared-mime-info XML
├── wikidata/          # Wikidata format record data
├── tests/             # Validation tests for registrations
└── deno.json          # Deno task runner config
```

## Data Flow

```
[Format definitions] ──► [IANA submissions] ──► [Official registration]
                    └──► [file-magic]        ──► [libmagic database]
                    └──► [shared-mime-info]  ──► [Desktop file associations]
                    └──► [Wikidata]          ──► [Linked data record]
```
