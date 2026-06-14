# TODO - Avatar Fallback System

## Step 1: Add reusable Avatar component
- ✅ Create `Frontend/src/components/Avatar.jsx`
- ✅ Support `user.avatar` image mode and name-initial fallback
- ✅ Support `size` variants and consistent light/dark styling

## Step 2: Make avatars reactive to profile updates
- ✅ Implement `useLocalStorageUser` hook + `userUpdated` event
- ✅ Ensure updates propagate immediately after ProfileSettings saves a new avatar


## Step 3: Replace avatar logic across the app
- Update `Frontend/src/layouts/DocuMindDashboardLayout.jsx`
- Update `Frontend/src/components/layout/Navbar.jsx`
- Update `Frontend/src/pages/settings/ProfileSettings.jsx`

## Step 4: Verify behavior
- Upload a new avatar in Settings → Profile
- Confirm all avatar components update instantly (no refresh)
- Confirm fallback initials render correctly when avatar is missing/invalid

