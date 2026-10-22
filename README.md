# JSS University, Noida Companies Research & Placement Analytics Portal
*(JSS Placement Intelligence Hub)*

## Overview
This portal provides students and placement coordinators at **JSS University, Noida** (**JSS**) with a strategic edge during campus placements. It delivers deep corporate research, 22-section placement intelligence dossiers, and 10-level Bloom's taxonomy skill roadmaps benchmarked directly to enterprise hiring criteria.

---

### Phase 2 — Supabase
Paste `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into `.env`, then `npm install && npm run dev`.

The portal connects directly to your Supabase PostgreSQL database in read-only mode using `@supabase/supabase-js` without joining 90+ normalized tables:
- **Companies Listing**: `SELECT company_id, short_json FROM company_json`
- **Company Dossier (22 Sections)**: `SELECT company_id, short_json, full_json FROM company_json WHERE company_id = :id`
- **Skill Competency & Roadmaps**: Joined on 4 dedicated skill tables:
  - `company_skill_levels`
  - `skill_set_master`
  - `proficiency_levels`
  - `skill_set_topics`

If Supabase credentials are not provided or connectivity fails, the portal falls back gracefully to the offline seed records (`seedCompanies.ts` and `skillTopics.ts`).

---

### Architecture & Key Guarantees
1. **Public Platform**:
   - The portal is 100% public.
   - **No login route (`/login`)**, no AuthContext, no ProtectedRoutes, and no authentication walls.
2. **College Branding**:
   - Configured for **COLLEGE_NAME**: `JSS University, Noida` (**COLLEGE_SHORT**: `JSS`).
   - Pure typography and styled text wordmarks. No college logo image asset is used.
3. **Strict Placement Constraints**:
   - Never displays CTC, Stipend, or Selection Ratio anywhere across the portal.
   - Professional Enterprise SaaS layout (#F8FAFC sidebar, #FFFFFF content, subtle borders).
4. **Resilient Data Normalization**:
   - `src/lib/companyData.ts` pure normalizers pipe database rows into clean, typed React state without altering UI contracts.

---

### Route Map
- `/` — Enterprise Directory & Filter Grid
- `/company` — Automatically redirects to `/company/intelligence`
- `/company/intelligence` — 22-Section In-Depth Intelligence Dossier with sticky scroll-spy navigation
- `/company/skills` — 10-Level Competency Ladders with Bloom's Taxonomy ratings & Criticality analysis
- `*` — Not Found error view (only for non-existent URLs)
