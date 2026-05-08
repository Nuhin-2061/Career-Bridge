# Security Policy

## Supported Versions

This project does not maintain multiple supported release lines. Use the latest version from the default branch.

## Reporting a Vulnerability

Please do not open a public issue. Contact the project owner privately with:

- Steps to reproduce
- Affected components
- Impact assessment

We aim to acknowledge reports within 7 days.

## Secrets Management

- Do not commit `.env*` files or build output.
- Rotate any leaked secret immediately.
- Store runtime secrets in environment variables only.
