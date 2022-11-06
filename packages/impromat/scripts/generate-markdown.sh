#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

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

generateMarkdownTypescript "legal.de.md" "legalMarkdownDe"
generateMarkdownTypescript "legal.en.md" "legalMarkdownEn"
generateMarkdownTypescript "privacy-policy.de.md" "privacyPolicyMarkdownDe"
generateMarkdownTypescript "privacy-policy.en.md" "privacyPolicyMarkdownEn"