# Quick Deploy to GitHub Pages

## ✅ Local Setup Complete!

Your local git repository is ready. Now follow these final steps:

## Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `santalii` (or any name you prefer)
3. Description: "Wedding website"
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** check "Add a README file" (we already have one)
6. Click **Create repository**

## Step 2: Push to GitHub

After creating the repository, run this command (replace `YOUR-USERNAME` with your GitHub username):

```powershell
.\deploy-to-github.ps1 -GitHubUsername YOUR-USERNAME
```

Or manually:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/santalii.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

## Step 4: Your Site is Live! 🎉

After 1-2 minutes, your site will be available at:
```
https://YOUR-USERNAME.github.io/santalii/
```

## Update Your Git Identity (Optional)

If you want to update the git user info:

```powershell
git config --global user.name "Your Real Name"
git config --global user.email "your.real.email@example.com"
```

Then update the commit:
```powershell
git commit --amend --reset-author --no-edit
git push --force-with-lease
```

