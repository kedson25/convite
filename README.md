# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/463337f5-575c-487e-a376-946821460cc9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/463337f5-575c-487e-a376-946821460cc9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/463337f5-575c-487e-a376-946821460cc9) and click on Share -> Publish.

## Deploying to Vercel

This project is a Vite-built static SPA and can be deployed to Vercel using the static-build runtime.

Quick steps:

1. Install dependencies and build locally to verify:

```powershell
npm i; npm run vercel-build
```

2. From the Vercel dashboard, import the Git repository.

3. In the Vercel project settings leave the build command blank (Vercel will use the `vercel-build` script) or set the build command to:

```
npm run vercel-build
```

4. Output directory: `dist`.

The repo includes a `vercel.json` which configures Vercel to run a static build and routes all requests to `index.html` so the SPA client router works.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
