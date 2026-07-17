# Supabase setup for project requests

This repair saves the Start Project form through the `submit_project_request` database function. It does **not** delete or merge any existing tables. Leave `customer_reviews`, `site_visitors`, and `website_visits` unchanged.

## 1. Run the safe migration

1. Open [Supabase](https://supabase.com/dashboard) and select the same project used by NextAura AI.
2. Open **SQL Editor** in the left sidebar.
3. In this repository, open [supabase/migrations/20260717_repair_project_requests.sql](supabase/migrations/20260717_repair_project_requests.sql).
4. Copy the entire SQL file, paste it into a new SQL query, and click **Run**.
5. Wait for the successful completion message. Do not run a `DROP TABLE` command.

The migration safely creates or extends `public.project_requests`, keeps any legacy columns and rows, enables RLS, and creates the controlled `submit_project_request` RPC.

## 2. Verify the database objects

1. Open **Table Editor** and choose `public.project_requests`.
2. Confirm it has `request_id`, `full_name`, `phone`, `project_type`, `package_id`, `selected_features`, estimates, `maintenance_months`, `status`, `source_page`, and `created_at` columns.
3. Open **Database → Functions** and find `submit_project_request`.
4. Open the table's **Policies** or **Authentication → Policies**. RLS must be enabled; anonymous users should not have direct select, update, or delete table access.

The function is the only anonymous write path. It generates IDs such as `NA-20260717-ABC123`, sets `maintenance_months` to `8`, `status` to `new`, and `source_page` to `start-project` itself.

## 3. Configure browser-safe variables

In Supabase, open **Project Settings → API**:

1. Copy the **Project URL**.
2. Copy the **anon public** key. Do not use the `service_role` secret in the browser or in this form.
3. Create a local `.env` file in the repository root (it is ignored by Git):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart `npm run dev` after changing local variables. The development console logs only the configured project hostname and RPC outcome, never the key.

## 4. Configure Vercel

1. In Vercel, open the NextAura AI project → **Settings → Environment Variables**.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the values from the exact Supabase project open in your dashboard.
3. Add them to **Production** and **Preview** (and Development if you use it).
4. Redeploy after saving. Vite replaces `VITE_` variables at build time.

The hostname in `VITE_SUPABASE_URL` must match the Supabase project you expect to see in Table Editor. A project URL mismatch writes to another project; changed Vercel variables do nothing until a new deployment is built.

## 5. Test a request

1. Open **Start Project**, complete required fields, choose a package, features, and timeline, then reach **Review & Submit**.
2. Submit once. The button stays disabled while the RPC is pending.
3. In browser DevTools → **Network**, find the request to `/rest/v1/rpc/submit_project_request`.
4. Its successful response contains `id`, `request_id`, and `created_at`.
5. In Supabase Table Editor, refresh `public.project_requests`. A row must exist with the same `request_id`, selected features, JOD estimate, `maintenance_months = 8`, and `status = new`.
6. Only after that confirmation, use **Open WhatsApp**. Its prepared message includes the confirmed request ID, package, selected features, JOD estimate, timeline, and free maintenance.

If saving fails, the form remains open with all entered values and a Retry option (submit again). WhatsApp does not open and the site does not redirect on a failed save.

## Troubleshooting

| Symptom                          | What to check                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `function ... does not exist`    | Run the complete migration, wait a few seconds for schema reload, then refresh the page.                         |
| `permission denied` or RLS error | Re-run the complete migration. Do not add an open insert policy; the RPC already has the required execute grant. |
| `Invalid API key`                | Copy the anon/public key again and redeploy Vercel.                                                              |
| Wrong project receives rows      | Compare the Vercel `VITE_SUPABASE_URL` hostname with the Supabase dashboard project URL.                         |
| `Failed to fetch`                | Check browser Network for the RPC request, deployment status, internet access, and the two VITE variables.       |
| Missing variables                | Set both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart locally or redeploy Vercel.              |

For any failed test, open DevTools → **Network**, click the `submit_project_request` RPC request, and inspect its status and response. Do not paste API keys into screenshots or messages.
