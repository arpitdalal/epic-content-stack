# Epic Stack for content sites

## Summary
1. Commit [f964cbf](https://github.com/arpitdalal/epic-content-stack/commit/f964cbf0f4809016b41a7f9f95e9591bc2bcbfe4) uninstalls `playwright`, removes the `mocks`, `fixtures`, and `e2e` directories from `tests` directory. Also removes `app/routes/_auth+/auth.$provider.callback.test.ts` and `app/routes/users+/$username.test.tsx` e2e test files. Also modifies a few files, please see the commit history for more details.
2. Commit [829014d](https://github.com/arpitdalal/epic-content-stack/commit/829014d41db6bdfc4b0e8fd7490bba98f0934e75) uninstalls a few packages, removes all the authentication related code, and modifies a few files, please see the commit history for more details. 

> [!IMPORTANT]
> Remove the `other/litefs.yml` file and note that `fly.toml` has a different `internal_port` value. This is because the `litefs.yml` file was proxying the ports but since that is not the case anymore, we need to update the `internal_port` value in the `fly.toml` file.

## FYI
- Not all the dead code and packages were removed to only stick to demonstrate removing DB and authentication related code.