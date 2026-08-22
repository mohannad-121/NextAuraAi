# CRM lead integration

Every successful Start Project submission is saved in the website database and then sent to the NextAura CRM as a `new_lead` with `contact_source = Website`.

## Production environment variables

Configure these **server-only** variables in the NextAura AI website deployment (Production and Preview):

```text
CRM_SUPABASE_URL=https://YOUR_CRM_PROJECT.supabase.co
CRM_SUPABASE_SERVICE_ROLE_KEY=YOUR_CRM_SERVICE_ROLE_KEY
```

Use the URL and service-role key from the Supabase project used by the CRM repository. Do not prefix either variable with `VITE_`; Vite exposes prefixed values to the browser.

The website server validates and rate-limits the request. It never returns the CRM secret to the browser. Re-submitting the same website request ID is idempotent and does not create a duplicate CRM lead.
