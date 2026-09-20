#!/usr/bin/env bash
set -e

TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$TOKEN" ]; then
  echo "❌ GITHUB_TOKEN is not set."
  echo "To enable direct pushing from here, please provide a GitHub Personal Access Token (classic with 'repo' scope or fine-grained with 'Contents: Read and Write' on iftequaruddin220-hue/iftequar) in your environment variables."
  exit 1
fi

REPO_URL="https://x-access-token:${TOKEN}@github.com/iftequaruddin220-hue/iftequar.git"

git config user.name "iftequaruddin220-hue"
git config user.email "iftequaruddin220@gmail.com"

# Ensure we have git remote
git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"

# Fetch latest remote changes
git fetch origin main || true

# Add all changes
git add -A

# Commit if changes exist
if ! git diff-index --quiet HEAD --; then
  COMMIT_MSG="${1:-Update portfolio: synchronized email and clean layout}"
  git commit -m "$COMMIT_MSG"
  echo "✅ Committed changes: $COMMIT_MSG"
else
  echo "ℹ️ No unstaged changes to commit."
fi

# Push to main
echo "🚀 Pushing to GitHub (iftequaruddin220-hue/iftequar:main)..."
git push origin main

# Restore anonymous URL to keep remote clean
git remote set-url origin "https://github.com/iftequaruddin220-hue/iftequar.git"

echo "🎉 Successfully pushed to GitHub! Vercel deployment triggered."
