<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep private workspace pages beneath the existing `_authenticated` route layout; its client-side gate prevents exposing personal application data.
- Use browser Supabase queries through `src/lib/data.ts` for owner-scoped CRUD and storage, so RLS protects every saved record.
- Keep page-specific SEO metadata in leaf routes via `pageMeta`; each workspace page remains individually identifiable.
- Keep sample data opt-in from Settings and tagged `(Sample)`; user records must never be created or removed automatically.
