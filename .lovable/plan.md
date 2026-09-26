# Complete the Master's Application OS workspace

## Goal
Add the seven requested authenticated pages, using the existing visual system, shared controls, saved data, and per-user access rules.

## Pages and behavior
- **Programs**: searchable, filterable, sortable card/table views with add and edit support.
- **Program detail**: application summary, deadline and readiness, external links, edit/delete actions, and tabs for overview, requirements, linked documents, recommendations, and notes.
- **Documents**: searchable grouped library with type/status filters, upload, signed preview/download links, edit, and confirmed deletion from both storage and records.
- **Language Tests**: planned and completed test cards, score breakdowns, validity state, certificate linking, and add/edit/delete actions.
- **Recommendations**: recommender directory and cross-program request tracker with add/edit/delete actions and visible pending deadlines.
- **Calendar**: month navigation and a calendar grid combining saved events with application and scholarship deadlines; event selection opens the related application when available.
- **Settings**: account summary, sample-data controls, and a clearly confirmed option to remove all sample records and uploaded sample references.

## Shared implementation
- Extend the existing data helpers only where the pages need joined records, file cleanup, or bulk sample operations.
- Add focused reusable cards/forms for documents, tests, recommenders, and recommendation requests rather than duplicating controls between pages.
- Keep every new page under the existing authenticated layout and add unique page metadata.
- Include realistic, clearly labeled sample records through a user-triggered Settings action so personal accounts are never modified automatically.

## Validation
- Check the generated navigation and current build diagnostics after routes are added.
- Exercise the main signed-in flows in the preview: filtering programs, opening details, editing requirements, viewing the calendar, and loading/removing samples.
- Inspect desktop and tablet layouts for readable tables, cards, dialogs, and calendar cells.
