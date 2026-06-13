# TODO - DocuMind AI OAuth + Router warnings fix

- [x] Patch `Frontend/src/main.jsx`:
  - [x] Removed problematic mount-guard attempt (kept provider mounted once at root)
  - [ ] Add React Router v7 future flags (handled in App.jsx)
- [x] Patch `Frontend/src/App.jsx`:
  - [x] Added v7 future flags to remove React Router future warnings
- [ ] Verify in browser that Google console warnings are gone after hard refresh:
  - [ ] no `GSI_LOGGER origin not allowed`
  - [ ] no `google.accounts.id.initialize called multiple times`
  - [ ] no `403 accounts.google.com/gsi/button`
  - [ ] no React Router future warnings
- [ ] If Google warnings persist, next step will be to fix OAuth client configuration (Authorized JS origins) by comparing exact origin with `VITE_GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_ID`.

