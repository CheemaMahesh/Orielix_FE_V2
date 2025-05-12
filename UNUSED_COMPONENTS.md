# Unused Components Documentation

This document tracks components and pages that are currently not actively used in the application's main UI flow. These components are preserved for future development but are not linked from the main navigation or dashboard.

## Unused Pages

1. **PathFinder.tsx**
   - Located at: `/src/pages/PathFinder.tsx`
   - Purpose: Likely intended for a learning path or career guidance feature
   - Status: Imported in App.tsx but route is commented out

2. **DiscussionForum.tsx**
   - Located at: `/src/pages/DiscussionForum.tsx`
   - Purpose: Community discussion platform
   - Status: Imported in App.tsx but route is commented out

3. **FindJob.tsx**
   - Located at: `/src/pages/FindJob.tsx`
   - Purpose: Job search functionality
   - Status: Imported in App.tsx but route is commented out

4. **CollabProjects.tsx**
   - Located at: `/src/pages/CollabProjects.tsx`
   - Purpose: Collaborative projects platform
   - Status: Imported in App.tsx but route is commented out

5. **Settings.tsx**
   - Located at: `/src/pages/Settings.tsx`
   - Purpose: User settings management
   - Status: Imported in App.tsx but route is commented out

## Partially Used Components

1. **FourthImageSection.tsx**
   - Located at: `/src/components/FourthImageSection.tsx`
   - Purpose: Additional image section for the landing page
   - Status: May not be integrated into the main page flow

2. **SecondImageSection.tsx** and **ThirdImageSection.tsx**
   - Located at: `/src/components/SecondImageSection.tsx` and `/src/components/ThirdImageSection.tsx`
   - Purpose: Image sections for the landing page
   - Status: May be standalone sections not fully integrated

## UI Components with Limited Usage

Several components in the `/components/ui/` directory may have limited usage:

- `chart.tsx`
- `input-otp.tsx`
- `resizable.tsx`
- `sidebar.tsx` (custom component, not the one used in Dashboard)
- `sonner.tsx` (may be redundant with Toaster)

## Notes for Developers

- These components are maintained in the codebase for future development
- If implementing new features that use these components, update this documentation
- Consider removing components that won't be used in future development
- The routes for unused pages have been commented out in `App.tsx` but imports are preserved
