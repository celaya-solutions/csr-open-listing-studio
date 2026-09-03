> **Celaya Solutions Research Course Edition.** Read [COURSE_EDITION.md](COURSE_EDITION.md) before you start. Use fake data only.

# Listing Studio

Project 06 on the [Zero to Agent project shelf](https://zerotoagent.org/course/landing.html#projects). Core track, and the heaviest one in it. You fork this at Level 6 and it stays yours through Level 9.

Software for someone selling a product online. You save a brand: its colors, its fonts, how it talks. You save a product with its photos and its customer reviews. Then you press one button and it writes the listing text and builds the picture set, in that brand's voice and that brand's colors.

## Why this one is on the shelf

Because it is the only Core project that has to call somebody else's service to do its job, and that changes what "working" means. A key can be missing. A service can be slow, or down, or return something you did not expect, and none of that is your code being wrong. Every project below this one either works or has a bug. This one can be correct and still fail, and you have to write it so a person can tell the difference.

It is also the one where you can see honesty designed into software. When it pulls a quote out of a customer review, it checks that quote against the stored review word for word before it will show it. When there are no reviews to work from, it says the result is an estimate and labels it, instead of inventing a customer who never said anything. That is the same rule the course keeps repeating: confidence is not accuracy.

Take this one only if the first five look easy to you.

## What you have to change to pass

The same five things are asked of every project on the shelf:

1. A change you can see on the screen.
2. A change to the server or to what gets stored.
3. The frontend live on Vercel.
4. The backend running on Railway, still running tomorrow.
5. A three minute demo: the problem, the before, the after.

## Keys, and what they cost

This project is the reason the course mentions a few dollars of usage fees.

| Key | Needed? | What stops working without it |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Yes | Writing the listing text and pulling insight out of reviews. This is the one that costs money. |
| `FAL_API_KEY` | No | Real upscaling and cutting the product out of its background. Templates fall back to using the raw photo. |
| `SERPAPI_API_KEY` | No | Pulling live reviews from a product page. You can still paste reviews in or upload a CSV. |

There is one more, `CLAWNIFY_TOKEN`, left over from the source project. It points at an outside screenshot service that turns the image templates into PNG files, and the course does not supply it. Without it the rest of the app runs and the template rendering stays off. `GET /api/health` tells you which of these are switched on. Do not go sign up for that service for this class.

The donation jar exists so nobody stalls out over the OpenRouter charge. Ask.

## Run it on your machine

```bash
pnpm install
cp .env.example .env
cp .dev.vars.example .dev.vars    # put your OpenRouter key here
pnpm dev
```

Open the address the terminal prints. Set `APP_PASSWORD` and `SESSION_SECRET` in `.env` first; the server refuses to serve without them. The database file and the uploads folder are created on the first run.

Checks before you hand anything in:

```bash
pnpm build
pnpm typecheck
pnpm smoke          # with the app already running
pnpm db:export -- exports/my-backup.db
```

## Where to look when you want to change something

| What you want to change | Where it lives |
| --- | --- |
| Any screen | `src/client/views/` |
| Shared buttons, tables, and layout | `src/client/ui.tsx` |
| What the API does | `src/server/index.ts` |
| The one button that runs the whole launch | `src/server/launch.ts` |
| Talking to the writing model | `src/server/ai.ts` |
| Amazon's length limits | `src/server/amazon-limits.ts` |
| Pulling in live reviews | `src/server/reviews-live.ts` |
| Image edits and templates | `src/server/image.ts`, `src/server/templates.ts`, `src/server/render.ts` |
| File uploads | `src/server/uploads.ts` |
| What gets stored | `schema.sql` |
| The class password gate | `src/server/course-app.ts` |
| How the server starts | `src/server/node.ts` |

## What it stores

A brand kit holds colors, fonts, and tone. A product holds features, specs, and photos, and owns its reviews. A launch is one run of the whole workflow against one product, and it keeps what came back: the insight, the listing copy, and the status of each asset. Assets are the generated images.

## Putting it online

The screen goes on Vercel. The server, the database, and the uploaded photos go on Railway, on a volume. Step by step in [COURSE_EDITION.md](COURSE_EDITION.md). Copy `vercel.example.json` to `vercel.json` and replace `YOUR-RAILWAY-DOMAIN` with your Railway address, or the live page will have no server to talk to. Your keys go in the Railway service, never in the frontend and never in a commit.

## Built with

React 19 and TypeScript on Vite for the screen, with Tailwind. Hono on Node 22 for the API. SQLite for storage, and files written to disk.

## License

This one is different from the rest of the shelf. It is under the CSR Noncommercial License 1.0, in [LICENSE](LICENSE). You may fork it, study it, change it, and share it for anything noncommercial, including your own portfolio. You may not sell it or use it to make money. The words "Celaya Solutions Research Course Edition" have to stay in this README and in the app's own footer, and you may add your own name as long as it does not crowd that out.

Third-party components inside the project keep their own licenses and notices, and those stay too.
