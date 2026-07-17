# Supabase setup for NextAura AI (React + Vite)

NextAura AI is a **React + Vite** project, not Next.js. Browser code reads only these public build-time variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Do not use `NEXT_PUBLIC_*` variables here. Do not put a secret key, service-role key, JWT secret, or Postgres password in a Vite variable or browser code.

## 1. Get the browser-safe values

1. Open your Supabase project.
2. Open **Connect** and select **React/Vite**.
3. Copy the **Project URL** and **Publishable Key** only.
4. In the folder containing `package.json`, create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

5. Restart `npm run dev`.

The project already includes `@supabase/supabase-js`; if installing from scratch, use:

```bash
npm install @supabase/supabase-js
```

## 2. Run the database migration

1. In Supabase, open **SQL Editor**.
2. Open [supabase/migrations/20260717_repair_reviews_and_project_requests.sql](supabase/migrations/20260717_repair_reviews_and_project_requests.sql) from this repository.
3. Copy the complete file, paste it into a new query, and click **Run**.
4. Do not delete any existing tables or rows.

Then verify in **Table Editor** that `customer_reviews` and `project_requests` exist. In **Database → Functions**, verify:

- `submit_customer_review`
- `get_customer_review_summary`
- `submit_project_request`

Open each table's **Policies** page to confirm RLS is enabled. Anonymous visitors can read only visible reviews and execute the restricted write functions; they cannot directly update or delete either table.

## 3. Configure Vercel

1. Open the NextAura AI Vercel project → **Settings → Environment Variables**.
2. Add exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Select **Production**, **Preview**, and **Development**.
4. Save and redeploy. Vite injects `VITE_` values during the build, so changing variables alone is not enough.

The project hostname in `VITE_SUPABASE_URL` must match the Supabase dashboard project you are viewing. `NEXT_PUBLIC_*` variables are ignored by this Vite client unless code explicitly reads them—and NextAura no longer does.

## 4. Test reviews

1. Open the homepage and go to **Customer Reviews**.
2. Submit a rating and a comment of at least five characters.
3. In DevTools → **Network**, confirm calls to `customer_reviews` and `submit_customer_review` succeed.
4. Refresh the page and confirm the review remains and the average/count updates.
5. In Supabase Table Editor, confirm the row exists in `customer_reviews`.

## 5. Test project requests

1. Complete **Start Project** and submit the final step.
2. In DevTools → **Network**, confirm `submit_project_request` succeeds and returns `id`, `request_id`, and `created_at`.
3. Confirm the new `project_requests` row contains the generated request ID, selected features, estimates, `maintenance_months = 8`, and `status = new`.
4. WhatsApp becomes available only after the database response succeeds.

## Troubleshooting

| Symptom                         | Fix                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `function ... does not exist`   | Run the complete migration, wait a few seconds for the schema cache reload, then refresh.                                             |
| `permission denied` / RLS error | Re-run the complete migration; do not add broad table write policies.                                                                 |
| `Invalid API key`               | Replace the Vercel/local Publishable Key and redeploy/restart.                                                                        |
| Missing environment variable    | Set both Vite variables exactly as shown.                                                                                             |
| Wrong project receives rows     | Compare the Vercel Project URL hostname with the Supabase dashboard project URL.                                                      |
| Failed browser request          | In DevTools → Network, inspect the failed RPC response; development logs show code, message, details, and hint without exposing keys. |
