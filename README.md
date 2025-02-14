# Epic Stack for content sites

## Summary
1. Commit [f964cbf](https://github.com/arpitdalal/epic-content-stack/commit/f964cbf0f4809016b41a7f9f95e9591bc2bcbfe4) uninstalls `playwright`, removes the `mocks`, `fixtures`, and `e2e` directories from `tests` directory. Also removes `app/routes/_auth+/auth.$provider.callback.test.ts` and `app/routes/users+/$username.test.tsx` e2e test files. Also modifies a few files, please see the commit history for more details.
2. Commit [829014d](https://github.com/arpitdalal/epic-content-stack/commit/829014d41db6bdfc4b0e8fd7490bba98f0934e75) uninstalls a few packages, removes all the authentication related code, and modifies a few files, please see the commit history for more details.
3. Commit [7b325840](https://github.com/arpitdalal/epic-content-stack/commit/7b32584037faa61da65b0404b5a4de86e2b41cdb) updates to the latest epic-stack and remove unnecessary code and utilities.
4. Commit [659cba49](https://github.com/arpitdalal/epic-content-stack/commit/659cba49671084751a764450bd8a23032dd8d1af) removes unused dependencies and updates the configuration files that were missed in the previous commit.

> [!IMPORTANT]
> Note that `fly.toml` has a different `internal_port` value. This is because the `litefs.yml` file was proxying the ports but since that is not the case anymore, we need to update the `internal_port` value in the `fly.toml` file.

## FYI
- Toast, Honeypot, Conform, Email, and Timing utils are not removed so they can be used if needed.