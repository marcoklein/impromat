#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)

function generateMarkdownTypescript {
  inPath="$1"
  variableName=$2
  outPath="$1.gen.ts"
  basePath="$WORKDIR/../src/markdown"

  content=$(cat "$basePath/$inPath")
  outContent="export const $variableName=\`$content\`"
  echo "$outContent" > "$basePath/$outPath"
}

echo "Generating markdown files"


generateMarkdownTypescript "legal.en.md" "legalMarkdownEn"
generateMarkdownTypescript "legal.de.md" "legalMarkdownDe"
generateMarkdownTypescript "privacy-policy.en.md" "privacyPolicyMarkdownEn"
generateMarkdownTypescript "privacy-policy.de.md" "privacyPolicyMarkdownDe"
generateMarkdownTypescript "about.en.md" "aboutMarkdownEn"
generateMarkdownTypescript "about.de.md" "aboutMarkdownDe"