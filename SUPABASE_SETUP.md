# Supabase setup for reviews and unique visitors

This website uses the Supabase **Project URL** and **anon public key** in the browser. These values are intended to be public. Do not add a service-role key to the website or to Vercel for these features.

The Start Project form also uses the browser-safe `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables through a restricted database RPC. Its separate migration and setup steps are in [SUPABASE_PROJECT_REQUESTS_SETUP.md](SUPABASE_PROJECT_REQUESTS_SETUP.md).

## 1. Run the database migration

1. Sign in to [Supabase](https://supabase.com/dashboard) and open the project used by NextAura AI.
2. In the left sidebar, open **SQL Editor**.
3. In this repository, open [supabase/migrations/20260717_create_reviews_and_visitors.sql](supabase/migrations/20260717_create_reviews_and_visitors.sql).
4. Copy the complete file into a new SQL Editor query.
5. Click **Run** once and wait for success.

The migration creates these tables:

- `customer_reviews` for public customer feedback.
- `site_visitors` for one anonymous browser ID per visitor.

It also creates these RPC functions:

- `submit_customer_review`
- `get_customer_review_summary`
- `register_site_visitor`

To verify, open **Table Editor** and confirm both tables exist. In **Database → Functions**, confirm all three functions exist. In **Authentication → Policies**, or by opening each table's policies, confirm that `customer_reviews` has the visible-reviews select policy and that `site_visitors` has no direct anonymous table permissions.

## 2. Get the browser-safe connection values

1. Open **Project Settings → API** in Supabase.
2. Copy the **Project URL**.
3. Copy the **anon public** key. Do not copy the `service_role` secret.
4. Create a local `.env` file in the project root. It is ignored by Git.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the same variable names exactly. Restart the local development server after saving the file.

## 3. Add the values to Vercel

1. Open the NextAura AI project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Select **Production** and **Preview**. Add **Development** too if you use Vercel's development environment.
5. Save the variables and create a new deployment. Vite exposes `VITE_` variables at build time, so redeployment is required.

## 4. Test reviews

1. Open the homepage and scroll to **Customer Reviews**.
2. Submit a real test review with a rating and at least five comment characters.
3. Confirm the success message and that the new card appears first.
4. Refresh the page. The review must still be visible.
5. Open the site in another browser or private window. The visible review must appear there too.
6. In Supabase **Table Editor → customer_reviews**, confirm the inserted row exists.
7. The section summary should show the correct total and average rating.

The Retry button repeats the review fetch. An unavailable database shows an error state while the rest of the homepage remains usable.

## 5. Test the visitor counter

1. Locate the eye icon in the homepage hero.
2. Confirm it displays an actual number with no plus sign.
3. In browser DevTools → Application → Local Storage, find `nextaura-anonymous-visitor-id`.
4. Refresh the same browser several times. The `site_visitors` row is updated, but the unique row count must not increase.
5. To simulate a new browser visitor, delete `nextaura-anonymous-visitor-id`, reload, and check that one new `site_visitors` row is created.
6. Open an incognito/private window for the same new-browser test.

The display cache is `nextaura-last-confirmed-visitor-count`. It is only a last-known display value; Supabase remains the source of truth.

## 6. Moderate a review

To hide an inappropriate review without deleting it, run this in the SQL Editor, replacing the ID:

```sql
update public.customer_reviews
set is_visible = false
where id = '<review-uuid>';
```

Hidden reviews do not appear in public queries or in the average/count summary.

## Common errors

| Symptom                             | Likely fix                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `Invalid API key`                   | Re-copy the anon public key and ensure it is assigned to the correct Vercel environment. |
| `relation ... does not exist`       | Run the complete migration file in the correct Supabase project.                         |
| `function ... does not exist`       | Run the migration again, then wait a few seconds for the schema reload.                  |
| RLS or permission error             | Confirm the complete migration ran; do not add public table insert/update/delete grants. |
| Reviews/counter unavailable locally | Check both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart `npm run dev`. |
| Works locally but not Vercel        | Add both variables to Preview and Production, then redeploy.                             |

Supabase CLI is optional. The SQL Editor method above is sufficient for this project.
