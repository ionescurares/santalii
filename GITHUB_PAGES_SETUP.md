# GitHub Pages Setup Guide

Follow these steps to deploy your wedding website to GitHub Pages:

## Step 1: Configure Git (if not already done)

Open PowerShell or Git Bash in your project directory and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 2: Create Initial Commit

```bash
cd d:\Projects\santalii
git add .
git commit -m "Initial commit: Wedding website"
```

## Step 3: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Repository name: `santalii` (or any name you prefer)
5. Description: "Wedding website for Brian & Megan"
6. Choose **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **Create repository**

## Step 4: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd d:\Projects\santalii
git remote add origin https://github.com/YOUR-USERNAME/santalii.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

## Step 6: Access Your Website

After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/santalii/
```

GitHub Pages may take a few minutes to build and deploy your site.

## Troubleshooting

- If you get authentication errors, you may need to use a Personal Access Token instead of password
- Make sure your repository is set to **Public** for free GitHub Pages
- Check the **Actions** tab in your repository to see if the build is successful

## Updating Your Site

After making changes to your files:

```bash
git add .
git commit -m "Update website"
git push
```

Your changes will be live on GitHub Pages within a few minutes.

