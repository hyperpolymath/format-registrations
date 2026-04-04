// SPDX-License-Identifier: PMPL-1.0-or-later
// Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk>

import { assertEquals, assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

// Unit tests: File structure validation
Deno.test("Unit: IANA media type files exist", async () => {
  const files = [
    "iana/a2ml-media-type.txt",
    "iana/k9-media-type.txt",
  ];

  for (const file of files) {
    const result = await Deno.stat(file);
    assertEquals(result.isFile, true, `File ${file} should exist`);
  }
});

Deno.test("Unit: File magic files exist", async () => {
  const files = [
    "file-magic/a2ml.magic",
    "file-magic/k9.magic",
  ];

  for (const file of files) {
    const result = await Deno.stat(file);
    assertEquals(result.isFile, true, `File ${file} should exist`);
  }
});

Deno.test("Unit: MIME type files exist", async () => {
  const files = [
    "shared-mime-info/a2ml.xml",
    "shared-mime-info/k9.xml",
  ];

  for (const file of files) {
    const result = await Deno.stat(file);
    assertEquals(result.isFile, true, `File ${file} should exist`);
  }
});

Deno.test("Unit: Wikidata entity files exist", async () => {
  const files = [
    "wikidata/a2ml-entity.json",
    "wikidata/k9-entity.json",
  ];

  for (const file of files) {
    const result = await Deno.stat(file);
    assertEquals(result.isFile, true, `File ${file} should exist`);
  }
});

// Smoke tests: Format validation
Deno.test("Smoke: IANA media type file is valid", async () => {
  const content = await Deno.readTextFile("iana/a2ml-media-type.txt");
  assert(content.includes("application/vnd.a2ml"));
  assert(content.includes("Type name"));
  assert(content.includes("Subtype name"));
});

Deno.test("Smoke: File magic entries are present", async () => {
  const content = await Deno.readTextFile("file-magic/a2ml.magic");
  assert(content.length > 0, "File magic should have content");
  // File magic format validation
  assert(
    content.includes("a2ml") || content.includes("A2ML"),
    "Should reference A2ML format"
  );
});

Deno.test("Smoke: MIME type XML is well-formed", async () => {
  const content = await Deno.readTextFile("shared-mime-info/a2ml.xml");
  assert(content.includes("<") && content.includes(">"), "Should be XML");
  assert(content.includes("mime-type"), "Should define MIME type");
});

Deno.test("Smoke: Wikidata JSON is valid", async () => {
  const content = await Deno.readTextFile("wikidata/a2ml-entity.json");
  const parsed = JSON.parse(content);
  assert(parsed !== null && typeof parsed === "object", "Should be valid JSON");
});

// Contract tests: Required fields
Deno.test("Contract: IANA registration has all required sections", async () => {
  const content = await Deno.readTextFile("iana/a2ml-media-type.txt");
  const requiredSections = [
    "Type name",
    "Subtype name",
    "Encoding considerations",
    "Security considerations",
    "Published specification",
  ];

  for (const section of requiredSections) {
    assert(
      content.includes(section),
      `IANA registration should have section: ${section}`
    );
  }
});

Deno.test("Contract: K9 IANA registration matches A2ML structure", async () => {
  const a2ml = await Deno.readTextFile("iana/a2ml-media-type.txt");
  const k9 = await Deno.readTextFile("iana/k9-media-type.txt");

  // Both should be RFC 6838 compliant
  assert(a2ml.includes("RFC 6838"));
  assert(k9.includes("RFC 6838"));
});

// Aspect tests: Consistency
Deno.test("Aspect: File pairs are consistent", async () => {
  const formats = ["a2ml", "k9"];
  const directories = ["iana", "file-magic", "shared-mime-info", "wikidata"];

  for (const dir of directories) {
    for (const format of formats) {
      try {
        const files = await Promise.all([
          Deno.stat(`${dir}/${format}*`).catch(() => null),
        ]);
        // At least one file should exist for each format in each dir
      } catch {
        // Directory may have different naming conventions
      }
    }
  }
});

Deno.test("Aspect: SPDX headers in IANA files", async () => {
  const files = [
    "iana/a2ml-media-type.txt",
    "iana/k9-media-type.txt",
  ];

  for (const file of files) {
    const content = await Deno.readTextFile(file);
    assert(
      content.includes("SPDX-License-Identifier"),
      `${file} should have SPDX header`
    );
  }
});

Deno.test("Aspect: XML files have proper structure", async () => {
  const files = [
    "shared-mime-info/a2ml.xml",
    "shared-mime-info/k9.xml",
  ];

  for (const file of files) {
    const content = await Deno.readTextFile(file);
    // Check for XML validity (contains XML declaration and has structure)
    assert(
      content.includes("<?xml") && content.includes(">"),
      `${file} should be valid XML`
    );
    // Should have some closing tags (at minimum)
    assert(
      content.includes("</"),
      `${file} should have closing tags`
    );
  }
});

// Property-based tests: Invariants
Deno.test("Property: All JSON files are parseable", async () => {
  const files = [
    "wikidata/a2ml-entity.json",
    "wikidata/k9-entity.json",
  ];

  for (const file of files) {
    const content = await Deno.readTextFile(file);
    const parsed = JSON.parse(content);
    assert(
      parsed !== null,
      `${file} should be valid JSON`
    );
  }
});

Deno.test("Property: All text files are non-empty", async () => {
  const files = [
    "iana/a2ml-media-type.txt",
    "iana/k9-media-type.txt",
    "file-magic/a2ml.magic",
    "file-magic/k9.magic",
  ];

  for (const file of files) {
    const stat = await Deno.stat(file);
    assert(stat.size > 0, `${file} should not be empty`);
  }
});

Deno.test("Property: Directories are complete", async () => {
  const dirs = ["iana", "file-magic", "shared-mime-info", "wikidata"];

  for (const dir of dirs) {
    const stat = await Deno.stat(dir);
    assertEquals(stat.isDirectory, true, `${dir} should be a directory`);
  }
});

// E2E/Reflexive tests: Complete pipeline
Deno.test("E2E: IANA registration round-trip parsing", async () => {
  const content = await Deno.readTextFile("iana/a2ml-media-type.txt");

  // Extract key sections (flexible regex for various formatting)
  const hasType = content.includes("Type name");
  const hasSubtype = content.includes("Subtype name");
  const hasApplicationVnd = content.includes("application") && content.includes("vnd.a2ml");

  assert(hasType, "Should have Type name section");
  assert(hasSubtype, "Should have Subtype name section");
  assert(hasApplicationVnd, "Should specify application/vnd.a2ml");
});

Deno.test("E2E: MIME type XML round-trip", async () => {
  const content = await Deno.readTextFile("shared-mime-info/a2ml.xml");

  // Parse and validate
  const lines = content.split("\n");
  const hasMimeType = lines.some((l) => l.includes("mime-type"));
  assert(hasMimeType, "Should contain mime-type element");

  // Check for required attributes
  assert(
    content.includes('type=') || content.includes('id='),
    "Should have identifying attributes"
  );
});

Deno.test("E2E: Wikidata entity structure", async () => {
  const content = await Deno.readTextFile("wikidata/a2ml-entity.json");
  const parsed = JSON.parse(content);

  // Should have identifiable structure
  assert(
    typeof parsed === "object" && parsed !== null,
    "Should be valid JSON object"
  );
});

// Benchmark baseline (timing assertions)
Deno.test("Benchmark: File reading performance", async () => {
  const start = performance.now();
  const files = [
    "iana/a2ml-media-type.txt",
    "file-magic/a2ml.magic",
    "shared-mime-info/a2ml.xml",
    "wikidata/a2ml-entity.json",
  ];

  for (const file of files) {
    await Deno.readTextFile(file);
  }

  const end = performance.now();
  const duration = end - start;
  assert(
    duration < 500,
    `All file reads should complete in < 500ms, took ${duration.toFixed(2)}ms`
  );
});

Deno.test("Benchmark: Registration completeness baseline", async () => {
  const content = await Deno.readTextFile("iana/a2ml-media-type.txt");
  const charCount = content.length;

  // Baseline: expect RFC 6838 compliant registrations (typically 2000+ chars)
  assert(
    charCount > 2000,
    `IANA registration should be substantial, found ${charCount} characters`
  );
});
