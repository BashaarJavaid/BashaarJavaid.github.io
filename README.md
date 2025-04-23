# Web Portfolio

A minimalist, dark-themed portfolio website built with Next.js, TypeScript, and TailwindCSS.

## Features

- Dark theme with minimalist design
- Responsive layout for all devices
- Sections for showcasing projects, experience, education, and skills
- Clean, modern typography

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to GitHub Pages

This portfolio is configured for deployment to GitHub Pages as a user site. Follow these steps to deploy:

### Automatic Deployment (Recommended)

1. Push your changes to the `main` branch of your GitHub repository
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://bashaarJavaid.github.io/`

### Manual Deployment

1. Install the gh-pages package (already added to devDependencies):
   ```bash
   npm install
   ```

2. Run the deploy script:
   ```bash
   npm run deploy
   ```

3. Your site will be deployed to the `main` branch of your repository

## GitHub Pages Configuration

1. Go to your repository settings on GitHub
2. Navigate to "Pages" under the "Code and automation" section
3. Set the source to "GitHub Actions"

## Important Notes

- For user GitHub Pages sites (username.github.io), the content must be in the main branch
- All static assets (images, etc.) should be placed in the `public` folder
- The site uses no basePath in the configuration since it will be served from the root domain

## Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Image Placeholders

Replace the placeholder images in the `public/images` directory with your own:

- `profile.jpg` - Your profile picture
- `project1.jpg`, `project2.jpg`, etc. - Project screenshots

## Customization

You can customize the content by editing the components in the `app/components` directory.

## Deployment

This project can be easily deployed to Vercel, Netlify, or other platforms that support Next.js.

## Deployment Status

Last deployed: June 2023
Updated: June 2023 