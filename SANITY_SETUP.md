# Sanity CMS Setup & Connection Guide

Complete step-by-step guide to connect your portfolio to Sanity CMS.

---

## 🔧 Prerequisites

Before starting, ensure you have:
- A [Sanity account](https://www.sanity.io) (free tier works perfectly)
- Node.js 18+ installed
- Sanity CLI installed: `npm install -g @sanity/cli`

---

## ✅ Step 1: Create a Sanity Project

### Option A: Using Sanity Web Console (Recommended)

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create project"**
3. Fill in project details:
   - **Project name**: `portfolio` (or your preference)
   - **URL slug**: Choose your slug (e.g., `portfolio-2026`)
   - **Select dataset**: Choose `Production`
4. Click **Create**
5. **Wait for project creation** (1-2 minutes)

### Option B: Using Sanity CLI

```bash
# From your project root
sanity init

# Follow prompts:
# - Create new project
# - Project name: portfolio
# - Dataset name: production
# - Choose configuration: Y
```

---

## 📋 Step 2: Get Your Credentials

After creating your project, retrieve these values from **Project settings**:

### 🔑 Finding Your Credentials

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click on your **portfolio** project
3. Go to **Settings → Project Details**
4. Copy these values:
   - **Project ID**: (looks like `abc123xyz`)
   - **Dataset**: (should be `production`)

### 🔐 Get Your API Token (Optional, for server-side operations)

1. In Project Settings, go to **API → Tokens**
2. Click **"Add API Token"**
3. Name it: `portfolio-token`
4. Select permissions: **Editor** (allows reading and writing)
5. Click **Create**
6. Copy the token immediately (won't show again!)

---

## 🔌 Step 3: Configure Environment Variables

### Create `.env.local` from template:

```bash
cp .env.local.example .env.local
```

### Edit `.env.local` with your credentials:

```bash
# Replace YOUR_PROJECT_ID with your actual project ID
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID

# Keep as is (production dataset)
NEXT_PUBLIC_SANITY_DATASET=production

# Keep as is (API version)
NEXT_PUBLIC_SANITY_API_VERSION=2024-04-01

# Optional: Add your API token for server-side operations
SANITY_API_TOKEN=YOUR_API_TOKEN
```

### Example (with real values):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=a1b2c3d4e5f6g7h8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-04-01
SANITY_API_TOKEN=sk-aBcDeFgHiJkLmNoPqRsT1234567890abcdefgh
```

---

## 📦 Step 4: Verify Package Dependencies

Ensure all Sanity packages are installed:

```bash
# Check if installed
npm list next-sanity sanity

# If missing, install:
npm install next-sanity sanity @sanity/client @sanity/image-url
```

**Expected output**:
```
├── next-sanity@12.2.2
├── sanity@5.20.0
├── @sanity/client@7.20.0
└── @sanity/image-url@2.1.1
```

---

## 🚀 Step 5: Deploy Schemas to Sanity Studio

Your schemas are defined but need to be deployed to your Sanity project.

### Using Sanity CLI:

```bash
# From project root
npm run sanity -- schema push

# Or manually:
npx sanity schema push
```

### Or Deploy via Web Console:

1. Visit your **Studio at**: `http://localhost:3000/studio` (after starting dev server)
2. Sanity will auto-deploy schemas when Studio loads
3. You'll see the three schema types appear in the left sidebar:
   - **Project**
   - **Experience**
   - **Skill**

---

## 🎨 Step 6: Start Your App & Access Studio

### Terminal 1 - Start Development Server:

```bash
npm run dev
```

### Terminal 2 - Access Sanity Studio:

Navigate to: **http://localhost:3000/studio**

You should see the Sanity Studio interface with three collections:
- 🎯 **Projects**
- 💼 **Experience** 
- 🛠️ **Skills**

---

## ✍️ Step 7: Create Sample Content

### Create a Project:

1. In Studio, click **Projects → Create**
2. Fill in:
   - **Title**: "My First Project"
   - **Slug**: (auto-generated)
   - **Description**: "A test project"
   - **Technologies**: React, Next.js, TypeScript
   - **Featured**: Toggle on
   - **Publish Date**: Today's date
3. Click **Publish**

### Create Experience:

1. Click **Experience → Create**
2. Fill in:
   - **Company**: "My Company"
   - **Position**: "Senior Developer"
   - **Start Date**: Your start date
   - **Currently Working**: Toggle on
3. Click **Publish**

### Create Skills:

1. Click **Skills → Create**
2. Fill in:
   - **Skill Name**: "React"
   - **Category**: "Frontend"
   - **Proficiency**: "Expert"
   - **Years**: 5
3. Click **Publish**

---

## 🔍 Step 8: Verify Connection

### Check Data is Fetching:

Start your dev server and open browser console:

```bash
npm run dev
```

Visit: `http://localhost:3000/portfolio`

**Check browser console** (F12 → Console tab):
- No errors about missing `NEXT_PUBLIC_SANITY_PROJECT_ID`
- No CORS errors

### Verify API Connection:

Run this in browser console on **any page**:

```javascript
// Paste in browser console (F12)
fetch('https://YOUR_PROJECT_ID.api.sanity.io/v2024-04-01/data/query/production?query=*[_type=="project"]')
  .then(r => r.json())
  .then(data => console.log(data))
```

Should return JSON with your projects.

---

## 🔗 How Files Connect to Sanity

### Configuration Files:

```
.env.local
  ↓ (contains credentials)
  ↓
src/lib/sanity.client.ts
  ├─ Reads: NEXT_PUBLIC_SANITY_PROJECT_ID
  ├─ Reads: NEXT_PUBLIC_SANITY_DATASET
  └─ Creates: Sanity client connection

sanity/sanity.config.ts
  ├─ Reads: NEXT_PUBLIC_SANITY_PROJECT_ID
  ├─ Reads: NEXT_PUBLIC_SANITY_DATASET
  ├─ Imports: sanity/schemas/index.ts
  └─ Powers: Studio at /studio route
```

### Query Files:

```
src/lib/queries.ts
  ├─ PROJECTS_QUERY
  ├─ EXPERIENCE_QUERY
  ├─ SKILLS_QUERY
  └─ Used by:
      ├─ src/app/portfolio/page.tsx
      └─ src/app/resume/page.tsx
```

### Page Components:

```
src/app/portfolio/page.tsx
  ↓
  Uses:  sanityFetch() from src/lib/sanity.client.ts
  ↓
  Runs:  FEATURED_PROJECTS_QUERY from src/lib/queries.ts
  ↓
  Fetches from: Your Sanity project
  ↓
  Displays: Project data in cards
```

---

## 🚨 Troubleshooting

### Error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"

**Cause**: Environment variables not set

**Fix**:
```bash
# Check .env.local exists
ls -la .env.local

# Verify values:
grep SANITY .env.local

# Restart dev server:
npm run dev
```

### Error: "CORS error" or "Failed to fetch from Sanity API"

**Cause**: 
- Wrong Project ID
- Project doesn't exist
- Network issue

**Fix**:
1. Verify Project ID at [sanity.io/manage](https://www.sanity.io/manage)
2. Ensure dataset is `production` (not `staging` or other)
3. Restart dev server
4. Check internet connection

### Studio Shows Empty Collections (No Projects/Experience/Skills)

**Cause**: Schemas not deployed yet

**Fix**:
```bash
# Deploy schemas
npx sanity schema push

# Or restart dev server to auto-deploy through Studio
npm run dev
```

Then visit: `http://localhost:3000/studio` again

### Can't Access Studio at /studio

**Cause**: 
- Dev server not running
- Port 3000 already in use
- TypeScript errors

**Fix**:
```bash
# Check if port is free:
lsof -i :3000

# Kill if needed:
kill -9 <PID>

# Restart:
npm run dev
```

### No Data Shows on Portfolio Page

**Cause**: 
- Haven't created content in Studio yet
- Query has errors
- API permissions issue

**Fix**:
1. Go to http://localhost:3000/studio
2. Create at least one Project with featured: true
3. Publish it
4. Wait 5 seconds
5. Refresh /portfolio page

---

## 📝 Current Schema Structure

### **Project** Schema
Stores: Portfolio projects, case studies, repos

Fields:
- `title` (text) - Project name
- `slug` (slug) - URL-friendly identifier
- `description` (text) - Short description
- `image` (image) - Featured image with hotspot
- `technologies` (array) - Tech stack
- `externalUrl` (URL) - Live link or repo
- `startDate` (date) - When project started
- `endDate` (date) - Completion date
- `featured` (boolean) - Show in featured section
- `publishedAt` (datetime) - Publication timestamp

### **Experience** Schema
Stores: Work history, job titles, companies

Fields:
- `company` (text) - Company name
- `position` (text) - Job title
- `description` (text) - Role overview
- `highlights` (array) - Key accomplishments
- `technologies` (array) - Tech used
- `startDate` (date) - Start date
- `endDate` (date) - End date (or empty if current)
- `isCurrent` (boolean) - Currently working here
- `location` (text) - Office location
- `companyUrl` (URL) - Company website
- `order` (number) - Display order

### **Skill** Schema
Stores: Technical competencies, languages, frameworks

Fields:
- `name` (text) - Skill name
- `category` (select) - Types: Frontend, Backend, DevOps, Tools, Databases
- `proficiency` (select) - Beginner, Intermediate, Advanced, Expert
- `years` (number) - Years of experience
- `description` (text) - Skill details
- `relatedProjects` (reference) - Links to projects using this skill
- `order` (number) - Display order

---

## 🎯 Next Steps After Setup

### 1. **Populate Studio with Content**
   - Add 3-5 projects
   - Add 2-3 work experiences
   - Add 10-15 skills

### 2. **Update Page Queries**
   In `src/app/portfolio/page.tsx` and `src/app/resume/page.tsx`:
   - Replace placeholder data with actual Sanity queries
   - Example:
     ```typescript
     import { PROJECTS_QUERY } from '@/lib/queries'
     import { sanityFetch } from '@/lib/sanity.client'
     
     const projects = await sanityFetch({ query: PROJECTS_QUERY })
     ```

### 3. **Deploy to Production**
   ```bash
   npm run build
   ```
   Then deploy to Vercel or Docker

---

## 📚 Helpful Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **Sanity Studio Dashboard**: https://sanity.io/manage
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **next-sanity Plugin**: https://github.com/sanity-io/next-sanity
- **Sanity API Reference**: https://www.sanity.io/docs/api-introduction

---

## ✅ Verification Checklist

Before considering Sanity fully set up:

- [ ] Created Sanity project at sanity.io
- [ ] Have Project ID and Dataset name
- [ ] `.env.local` file created with credentials
- [ ] Dev server running: `npm run dev`
- [ ] Can access Studio: http://localhost:3000/studio
- [ ] Three schema types visible in Studio
- [ ] Created at least one test Project document
- [ ] Project appears when visiting /portfolio page
- [ ] No console errors in browser dev tools

---

If any step fails, check **Troubleshooting** section above! 🎉
