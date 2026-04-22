// @ts-nocheck
// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("install-safe-path symlink regression guard", () => {
  it("Dockerfile.base patches OpenClaw install-safe-path to accept symlinked base dirs", () => {
    const dockerfileBase = path.join(import.meta.dirname, "..", "Dockerfile.base");
    const src = fs.readFileSync(dockerfileBase, "utf-8");

    expect(src).toContain("SYMLINK_CHECK='!baseLstat.isDirectory() || baseLstat.isSymbolicLink()'");
    expect(src).toContain("REAL_DIR_CHECK='!baseLstat.isDirectory()'");
    expect(src).toContain("grep -R -F --include='*.js'");
    expect(src).toContain("files_with_symlink_check_file=\"$(mktemp)\"");
    expect(src).toContain("Unable to verify OpenClaw install-safe-path symlink check in dist");
    expect(src).toContain("OpenClaw install-safe-path symlink check patch failed");
  });
});
