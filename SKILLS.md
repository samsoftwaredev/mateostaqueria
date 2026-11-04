# Mateo's Taqueria engineering practices

Apply these rules whenever changing application behavior, data models, or tooling in this
repository.

## Test-driven development

1. Start with a failing Vitest test that describes observable behavior or a domain invariant.
2. Make the smallest production change that passes the test.
3. Refactor only while the test suite remains green.
4. Add regression coverage for every bug fix. Do not assert implementation details when a user-
   visible outcome or public interface can be tested instead.

Run focused tests while iterating with `npm run test:watch`. Before handing off a change, run
`npm run validate`.

## TypeScript

- All application, preview, and test source must be TypeScript (`.ts` or `.tsx`). JavaScript is
  allowed only for generated output that is ignored by Git or for a tool that cannot load a
  TypeScript configuration.
- Keep strict compiler settings enabled. Do not introduce `any`, `@ts-ignore`, or `@ts-nocheck`.
- Define interfaces for domain models, component props, state objects, and external data shapes.
  Prefer unions for finite values such as routes and menu categories.
- Validate untrusted runtime data before treating it as a typed interface.
- Export shared interfaces from the module that owns the domain concept; avoid duplicating models.

## ESLint and Prettier

- ESLint owns code-quality rules; Prettier owns formatting. Do not add formatting rules to ESLint.
- Fix lint errors instead of suppressing them. A narrowly scoped disable comment requires an
  explanation of why the rule cannot apply.
- Run `npm run format` after editing and `npm run lint` before committing.
- Keep generated folders, dependencies, build output, and coverage excluded from both tools.
