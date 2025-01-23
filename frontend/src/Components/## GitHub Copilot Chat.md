## GitHub Copilot Chat

- Extension Version: 0.23.2 (prod)
- VS Code: vscode/1.96.4
- OS: Windows

## Network

User Settings:

```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:

- DNS ipv4 Lookup: 20.205.243.168 (103 ms)
- DNS ipv6 Lookup: Error (139 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (10 ms)
- Electron fetch (configured): HTTP 200 (1228 ms)
- Node.js https: HTTP 200 (675 ms)
- Node.js fetch: HTTP 200 (582 ms)
- Helix fetch: HTTP 200 (315 ms)

Connecting to https://api.githubcopilot.com/_ping:

- DNS ipv4 Lookup: 140.82.113.22 (102 ms)
- DNS ipv6 Lookup: Error (164 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (5 ms)
- Electron fetch (configured): HTTP 200 (936 ms)
- Node.js https: HTTP 200 (1982 ms)
- Node.js fetch: HTTP 200 (1116 ms)
- Helix fetch: HTTP 200 (1287 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).
