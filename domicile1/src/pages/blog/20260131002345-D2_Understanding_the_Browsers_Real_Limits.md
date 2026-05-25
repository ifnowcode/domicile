## 📅 Day 2 — Understanding the Browser’s Real Limits

**Title**: _The Browser Is Not a Filesystem_

I went deep today into what the browser actually does when I call `fetch()`. I had this lingering suspicion that maybe the browser was “reading files locally” when I hit `/blog/index.json`. But no — the browser never touches the server’s disk. It only speaks HTTP.

That means:

  * No directory listing

  * No filesystem access

  * No reading Markdown directly

  * No walking folders

Everything must be explicitly served by Apache.

This clarified something important: my static blog pipeline isn’t a hack. It’s the _correct_ way to build a frontend-only system. The build step generates the files. Apache serves them. The frontend fetches them. That’s the entire model.

It’s not abusing the client/server model. It is the model.

### Peter Anderson
#### 12:27 AM Saturday, January 31, 2026