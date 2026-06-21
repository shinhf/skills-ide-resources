# OIDC and Secrets Management

## Why OIDC

Storing long-lived cloud keys (`AWS_SECRET_ACCESS_KEY`, service-account JSON) as GitHub secrets means a leak grants standing access. OIDC lets the workflow present a short-lived, identity-bound token that the cloud provider exchanges for temporary credentials scoped to a role. No long-lived secret lives in the repo.

Every OIDC job needs:

```yaml
permissions:
  id-token: write     # mint the OIDC token
  contents: read
```

### AWS

```yaml
- uses: aws-actions/configure-aws-credentials@<sha>   # v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/github-actions
    aws-region: us-east-1
```

Cloud side: create an IAM OIDC identity provider for `token.actions.githubusercontent.com` and a role whose trust policy restricts `sub` to your repo/branch/environment.

### Azure

```yaml
- uses: azure/login@<sha>            # v2
  with:
    client-id: ${{ vars.AZURE_CLIENT_ID }}
    tenant-id: ${{ vars.AZURE_TENANT_ID }}
    subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}
```

Cloud side: register an app with a federated credential matching the workflow's `subject`. The client/tenant/subscription IDs are identifiers, not secrets — store them as repository/organization **variables** (`vars.*`), keeping with OIDC's "nothing secret stored" goal. (`secrets.*` also works but blurs that distinction.)

### GCP

```yaml
- uses: google-github-actions/auth@<sha>   # v2
  with:
    workload_identity_provider: projects/123/locations/global/workloadIdentityPools/gh/providers/gh
    service_account: deployer@project.iam.gserviceaccount.com
```

Cloud side: configure a Workload Identity Pool + provider bound to your repo.

## When you still need secrets

Some things have no OIDC equivalent (third-party API tokens, signing keys). For those:

### Levels — pick the narrowest

| Level | Use for |
|-------|---------|
| Environment | Deploy credentials — combines with approvals and branch restrictions. |
| Repository | Repo-specific tokens used across that repo's workflows. |
| Organization | Genuinely shared secrets; restrict to selected repos. |

### Rules

- Reference with `${{ secrets.NAME }}`; never hardcode.
- Forked PRs do **not** receive secrets in the standard `pull_request` flow — do not engineer around this.
- In reusable workflows, secrets reach only directly called workflows. Prefer explicit passing over `secrets: inherit` so boundaries stay visible:

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
    secrets:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

- Mask any sensitive value that might surface in logs: `echo "::add-mask::$VALUE"`.
- Never write secrets into cached paths or artifacts.
- Rotate static secrets on a schedule; prefer environments with required reviewers for the highest-impact ones.
