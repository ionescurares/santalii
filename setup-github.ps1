# GitHub Pages Setup Script
# Run this script after configuring your git user info

Write-Host "Setting up GitHub Pages deployment..." -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Check git config
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser -or -not $gitEmail) {
    Write-Host "`nGit user configuration not found!" -ForegroundColor Red
    Write-Host "Please run these commands first:" -ForegroundColor Yellow
    Write-Host "  git config --global user.name `"Your Name`"" -ForegroundColor Cyan
    Write-Host "  git config --global user.email `"your.email@example.com`"" -ForegroundColor Cyan
    Write-Host "`nThen run this script again." -ForegroundColor Yellow
    exit
}

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Wedding website"

Write-Host "`n✓ Local repository ready!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub.com" -ForegroundColor Cyan
Write-Host "2. Run these commands (replace YOUR-USERNAME with your GitHub username):" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/santalii.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host "`n3. Enable GitHub Pages in repository Settings > Pages" -ForegroundColor Cyan
Write-Host "   - Source: main branch, / (root) folder" -ForegroundColor White
Write-Host "`nSee GITHUB_PAGES_SETUP.md for detailed instructions." -ForegroundColor Yellow

