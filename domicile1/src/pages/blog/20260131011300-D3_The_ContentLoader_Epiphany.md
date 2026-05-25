##  📅 Day 3 — The ContentLoader Epiphany

**Title**: _Async That Doesn’t Break the Serial World_

Today I realized that I already had the perfect async pattern sitting right in front of me: ContentLoader.

It returns synchronously.
It loads asynchronously.
It updates itself when ready.
It never leaks Promises.
It never forces callers to become async.

This is exactly how image loaders, audio loaders, and asset managers work in game engines. It’s the only async pattern that behaves like a serial model.

So I extended it.

`DirectoryLoader` was born — a synchronous constructor that loads `index.json`, creates a ContentLoader for each file, and exposes a stable array of items. No async cascades. No broken rendering. No special cases.

This was the first time async felt like it belonged in the architecture instead of fighting it.

### Peter Anderson
#### 01:13 AM Saturday, January 31, 2026