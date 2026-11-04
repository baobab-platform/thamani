# DEV-11 browser scheduling and original custody

Merged Thamani #50 is retained. Original main run `41562470288`, artifact
`13198286167`, has 19 passing functional cases and five deliberate skips:
the Chromium-owned visual matrix was also registered in the mobile project.
The matrix itself already executes all five approved viewport widths.

The mobile project now excludes only that canonical visual file at discovery.
All previously passing desktop/mobile journeys and all five visual assertions
still execute. The independent visual, accessibility, Lighthouse, logistics
keyboard and static-budget gates retain their thresholds and baselines.
No test assertion, failure or production boundary is suppressed. The old
original cannot qualify this amended source; a new full browser run is required.

Unscoped diagnostic reports now use child directories under `playwright-report`
and `test-results`, preserving earlier gate originals. CI runs the actual
two-invocation Playwright custody regression before any browser qualification.
That regression tests report retention only; it grants no native booking or
IAM/CP authority and cannot replace browser runtime evidence.

Scheduling follows the official Playwright project `testIgnore` API:
https://playwright.dev/docs/api/class-testproject#test-project-test-ignore.
This separate correction starts at accepted main because #50 has merged and
the older unmerged IAM-N07 #44 has not adopted that quality implementation.
No PR merge or provider promotion is authorised.

The quality job now explicitly checks out the current PR head or main/event
SHA, requires a matching `git rev-parse HEAD` and retains that original in
`reports/dev11-source-sha.txt`. The independent observer requires the named
source guard to pass and the readback to equal its run pin; GitHub's default
temporary PR merge tree and API head metadata cannot substitute for this.
