# TypeFlow · 字流

A focused multilingual typing practice website for improving accuracy, reading continuous passages, and learning input methods from the beginning.

**Live website:** [https://typeflow-daily-challenge.niftycurry6.chatgpt.site/typeflow/](https://typeflow-daily-challenge.niftycurry6.chatgpt.site/typeflow/)

## Practice languages

- English
- Mandarin Chinese in Simplified Chinese
- Mandarin Chinese in Traditional Chinese, with a Taiwan Mandarin and Zhuyin learning route
- Hong Kong Cantonese in Traditional Chinese, with 26-key Jyutping input and pronunciation hints without tone numbers

The interface language can be switched independently between English, Simplified Chinese, and Traditional Chinese.

## Article practice

- **200 original passages:** 50 per language, independently written rather than translated or converted between writing systems. Each library balances everyday life, stories, science, culture, and workplace topics.
- **Random rotation:** every passage in a language is drawn once before its next shuffled round. Difficulty is labeled automatically across five levels, without manual passage selection.
- **Length, timed, and custom modes:** length practice uses a continuous excerpt; timed practice continues with another unseen passage when needed. Custom practice accepts your own text and ends after completing the passage or reaching the selected countdown.
- **Practice rules:** normal correction, stop on error, word/sentence boundary checking, and a zero-error challenge.
- **Punctuation options:** exact matching or compatibility for common full-width/half-width punctuation and quotation marks. Compatibility preserves character identity, spelling, and letter case. Daily rankings always use exact matching.
- **IME-aware scoring:** unconfirmed composition text is not scored. Cancellation does not count as an attempt, duplicate commit events are ignored, and unconfirmed text at the deadline is excluded.

English passage lengths are approximately 90–102 words; Chinese and Cantonese passages are approximately 112–147 characters. A length target longer than its source uses the available continuous passage rather than padding it with unrelated text. Custom passages can contain 2–20,000 characters, with an optional 5–600 second countdown; completing the passage also ends the session.

## Scenario training

Practice vocabulary, sentences, and connected passages in 24 settings: home, restaurants, supermarkets, shopping, kitchens, weather, directions, public transport, airports, hotels, travel, driving, hospitals, dentistry, pharmacies, banking, post offices, emergencies, schools, offices, job applications, meetings, computers, and social conversations.

Each setting offers 12 vocabulary items, three sentence groups, and two passages per language. The three sections have separate typing inputs, live statistics, and completion summaries. Switching one practice group preserves input and timing in the other sections, and completion stays on the scenario page.

Simplified Chinese vocabulary includes untoned Pinyin hints. Cantonese practice includes optional small Jyutping annotations above individual characters, without tone numbers. Vocabulary practice can switch between typing Chinese characters and spelling Pinyin or Jyutping.

## Input academy

- **English keyboard:** 4 lessons.
- **Mandarin Pinyin:** 13 lessons covering initials, finals, spelling conventions, nasal endings, whole sentences, and candidate selection.
- **Hong Kong Jyutping:** 14 lessons covering initials, finals, aspiration, vowel length, nasal and stop endings, syllabic consonants, tone concepts, and practical input.
- **Traditional Chinese Zhuyin:** 14 lessons covering symbols, the standard keyboard layout, initials, medials, finals, tone keys, syllable composition, and candidate selection.
- **Candidate trainer:** eight guided steps each for Pinyin, Zhuyin, and Jyutping, using a finite teaching vocabulary to demonstrate spelling, selection, and confirmation.

Keyboard diagrams use staggered ANSI QWERTY geometry, including realistic modifier-key widths, F/J home-key markers, shifted number symbols, and Zhuyin mappings. Lessons provide text explanations, reference tables, examples, interactive practice, and locally saved progress. This version does not include audio.

The candidate trainer is an educational simulation, not a complete input method. Its candidate order may differ from an operating system's input method. Character practice uses the input method installed and enabled on the user's device. Automated composition-event checks are included; real system input methods still need testing across platforms.

## Jyutping hints and custom-text review

Built-in Cantonese targets use a fixed pronunciation revision derived from the licensed CanCLID / Rime Cantonese lexicon and explicit teaching/scenario overrides. This does not imply expert review of every reading.

Custom passages are checked for invisible characters, unusual spaces, smart quotation marks, and line breaks. Cantonese text can flag missing or ambiguous readings and accept manually specified, valid untoned syllables by character position. Readings for rare names and polyphonic characters may require contextual review. These edits remain in the current browser.

The shared Jyutping switch applies across Cantonese articles, custom passages, scenarios, lessons, candidate exercises, and daily challenges. Changing it preserves the current practice input and timer.

See [JYUTPING-NOTICE.md](./JYUTPING-NOTICE.md) for lexicon attribution and the CC BY 4.0 license.

## Results and review

Results include **WPM, ACC, RAW, characters, consistency, time, and CPM**. Chinese-language results show characters per minute alongside WPM.

- **WPM:** retained correct characters divided by five, divided by elapsed minutes.
- **RAW:** all committed character attempts, including mistakes and retyping, divided by five and elapsed minutes.
- **ACC:** correct attempts divided by all attempts. Correcting an error does not erase its effect on accuracy.
- **Characters:** correct, incorrect, extra, and missed. Unreached text in a timed session does not count as missed.
- **Consistency:** `100 / (1 + standard deviation / mean)` for sampled short-term speeds; intended for comparisons within this website.

The result chart plots time against WPM. The bright line shows correct speed over the most recent three seconds; the gray line shows the cumulative average. Hovering or touching the chart reveals the bright line's time, WPM, RAW, accuracy, and correct-character count. WPM measures committed text, not physical keystroke speed or actual Chinese word counts.

Practice history defaults to **All** and can be filtered by language and test type. Up to 1,000 local summary records are retained. Weakness review tracks committed character errors, punctuation, dedicated spelling exercises, and teaching-candidate errors by user, language, and declared input method. Successful reviews are scheduled after one, three, and seven days; a new error becomes due again. The website does not infer the cause of a real input method's candidate-selection mistakes.

## Daily challenges and online rankings

Daily challenges open on a separate page. The date uses Hong Kong time, UTC+8; everyone receives the same full passage for the same language and date. English, Simplified Chinese, Traditional Chinese, and Hong Kong Cantonese have separate rankings.

A result qualifies after completing the entire passage with at least 95% accuracy and no remaining errors. The server verifies the input trace, measures elapsed time, and recalculates scores. Each player keeps one best result per language and day. Ordinary practice and daily challenges use separate passage selection.

On the first visit, choose a nickname. The browser remembers the profile; a recovery code can restore it after clearing site data or switching browsers/devices. Nicknames and qualifying challenge scores are public. The server stores only a hash of the identity token. Keep recovery codes private.

Ordinary records, drafts, settings, lesson progress, reading edits, and review schedules are stored locally in the browser and are not synchronized across devices. Daily challenge results are stored in the backend database.

## Run locally

Serve the repository root over HTTP:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). ES modules require HTTP; opening `index.html` directly from the filesystem is not supported.

For separate browser-local test storage, use [http://127.0.0.1:4173/?qa=1](http://127.0.0.1:4173/?qa=1). This isolates local records; it does not create a separate online backend.

The frontend uses native HTML, CSS, and JavaScript without a build step or third-party runtime dependencies. With Node.js installed, run:

```sh
npm test
```

The tests cover independent corpora, shuffle persistence, metrics, keyboard geometry, contextual readings, routes, composition events, punctuation matching, candidate exercises, scenario variations, and spaced reviews.

## Source and hosting

Frontend source and regression tests are directly available in this repository. [typeflow-source.zip](./typeflow-source.zip) contains the complete application source, including the Vinext / Cloudflare Workers backend, D1 schema, database migrations, and backend tests under `backend/`.

The archive is a snapshot of the application release; this repository's README is the current English project introduction. Runtime databases, recovery codes, deployment credentials, and browser records are not included in the source archive.

The frontend can be hosted as static files, including on GitHub Pages where the account and repository plan permit it. Relative asset paths support repository subpaths. Keep `.nojekyll` when using Pages. The current public website is hosted separately, and `api-config.js` points to its online backend. A fresh backend deployment requires its own hosting configuration and database binding.

## Main files

| File | Purpose |
| --- | --- |
| `app.js` | Pages, practice sessions, and interactions |
| `engine.js` and `ime.js` | Scoring, text comparison, and committed input handling |
| `deck.js` and `bank-*.js` | Per-language passage libraries and random rotation |
| `content.js` and `scene-library.js` | Scenarios and practice variations |
| `tutorials.js`, `pinyin-course.js`, and `candidate-trainer.js` | Input-method lessons and guided candidate exercises |
| `jyutping.js`, `jyutping-lexicon.js`, and `reading-snapshots.js` | Contextual Jyutping and fixed built-in readings |
| `phonetics.js` and `keyboard.js` | Spelling hints and physical keyboard diagrams |
| `weakness.js` | Local error tracking and spaced review |
| `online.js`, `api-config.js`, and `routes.js` | Online challenges and hosting-aware navigation |
| `i18n.js`, `enhancement-messages.js`, and `style.css` | Interface translations, themes, and responsive styling |
| `tests/` | Frontend regression checks |
