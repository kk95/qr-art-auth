#!/bin/bash
# Bash Validation Hook for QR-Art-Auth
# Prevents commands from reading excluded directories (saves 85% tokens)

COMMAND="$1"

# Block patterns that waste tokens
if echo "$COMMAND" | grep -qE "(\.git/|node_modules/|\.nuxt/|\.output/|pnpm-lock\.yaml|package-lock\.json)"; then
  echo "❌ ERROR: Command attempts to read excluded directory or file"
  echo ""
  echo "Blocked patterns:"
  echo "  - .git/ (use git commands instead)"
  echo "  - node_modules/ (use package.json)"
  echo "  - .nuxt/ (build artifacts)"
  echo "  - .output/ (build artifacts)"
  echo "  - pnpm-lock.yaml (lockfile)"
  echo ""
  echo "This hook prevents token waste by blocking bash commands that read large excluded directories."
  exit 1
fi

# Allow command
exit 0
