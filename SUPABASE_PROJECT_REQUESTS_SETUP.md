# Supabase setup for project requests

This repair saves the Start Project form through the `submit_project_request` database function. It does **not** delete or merge any existing tables. Leave `customer_reviews`, `site_visitors`, and `website_visits` unchanged.

If you already ran `20260717_repair_reviews_and_project_requests.sql`, you must also run `20260717_fix_project_request_submission.sql`. It replaces the live request-ID generator that called unavailable `gen_random_bytes` and caused the RPC to fail before inserting a row.

## 1. Run the safe migration

1. Open the matching Supabase project and choose **SQL Editor**.
2. Open [supabase/migrations/20260717_fix_project_request_submission.sql](supabase/migrations/20260717_fix_project_request_submission.sql) in this repository.
3. Copy the entire file into a new SQL query and select **Run**.
4. Wait for the success message. Do not run `DROP TABLE`.

The previous migration creates or extends `public.project_requests`, preserves legacy columns and rows, enables RLS, and creates the controlled `submit_project_request` RPC. This latest migration replaces only the failing ID generator and RPC; it deletes no table or data. It ends with `notify pgrst, 'reload schema';` to reload the Supabase Data API schema.

## 2. Verify the database objects

1. In **Table Editor**, open `public.project_requests`.
2. Confirm it has `request_id`, `full_name`, `phone`, `project_type`, `package_id`, `selected_features`, estimates, `maintenance_months`, `status`, `source_page`, and `created_at`. Existing `customer_name` columns are legacy and are kept for compatibility.
3. In **Database → Functions**, find `submit_project_request`.
4. Confirm RLS is enabled and anonymous visitors have no direct table insert/select/update/delete policy. The RPC is the controlled anonymous write path.

The function generates IDs like `NA-20260717-ABC123` and sets `maintenance_months = 8`, `status = new`, and `source_page = start-project` internally.

## 3. Configure browser-safe variables

Use only these Vite variables locally and in Vercel:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not use a secret or service-role key in the browser. Add both variables to Vercel Production and Preview, then redeploy because Vite reads them at build time.

## 4. Test a request

1. Complete the seven Start Project steps and submit once.
2. In DevTools **Network**, inspect `/rest/v1/rpc/submit_project_request`.
3. A successful response must contain `id`, `request_id`, and `created_at`.
4. Refresh `public.project_requests`; the row must use the same request ID.
5. Only after that success use **Open WhatsApp**. The message includes the confirmed database request ID.

On failure, the form stays filled, displays a visible Retry button, and does not open WhatsApp or redirect.

## 5. Development-only RPC connection test

Run `npm run dev`, open the local site, then use DevTools **Console**:

```js
await window.nextAuraProjectRequestTest();
```

The test uses labelled dummy values and creates one test row through the same centralized client and RPC. It returns `id`, `requestId`, and `createdAt`. Delete that test row after confirmation. The utility is not exposed in production.

## Troubleshooting

| Symptom                              | What to do                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `PGRST202` / function not found      | Run the migration, wait briefly, then refresh after schema reload.                   |
| `42883` / `gen_random_bytes` missing | Run `20260717_fix_project_request_submission.sql`.                                   |
| Permission denied / RLS              | Re-run the migration; do not add an open table-insert policy.                        |
| `22P02` invalid input                | Ensure dates are `YYYY-MM-DD` or `null`, and `selected_features` is an array.        |
| Column/relation missing              | Run the base repair migration, then this fix migration, and reload the schema cache. |
| Invalid API key                      | Correct the publishable key and redeploy.                                            |

Never paste API keys into screenshots or messages.
