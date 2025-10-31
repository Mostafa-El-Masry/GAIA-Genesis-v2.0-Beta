# ELEUTHIA — tracker (Week 7 foundation)

**Route:** `/ELEUTHIA`

**Files**
- `app/ELEUTHIA/page.tsx` — Page shell
- `app/ELEUTHIA/components/EleuthiaClient.tsx` — Main controller (locked ↔ unlocked)
- `app/ELEUTHIA/components/Unlock.tsx` — Create/Unlock UI (PBKDF2 + AES‑GCM setup)
- `app/ELEUTHIA/components/Vault.tsx` — Encrypted entries list, add/edit, search, export/import (encrypted)
- `app/ELEUTHIA/lib/crypto.ts` — WebCrypto helpers (deriveKey, encryptJSON, decryptJSON)
- `app/ELEUTHIA/lib/storage.ts` — Local storage I/O (`eleu.meta`, `eleu.vault`)
- `app/ELEUTHIA/lib/uid.ts` — Simple id helper
- `app/ELEUTHIA/types.ts` — Entry & Vault types

**Notes**
- Zero-knowledge: only encrypted payload is stored.
- Local-first: all data lives in the browser; plaintext exists only in memory.
- Export/Import: encrypted JSON only (no plaintext exports). CSV/Chrome import lands in Week 8.
