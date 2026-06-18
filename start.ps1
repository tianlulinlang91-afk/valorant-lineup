$BundledNode = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if (Test-Path $BundledNode) {
  & $BundledNode server.js
} else {
  node server.js
}
