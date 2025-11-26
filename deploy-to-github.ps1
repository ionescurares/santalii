# Deploy to GitHub Pages
# Run this AFTER creating your GitHub repository

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "santalii"
)

Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null

if ($remoteExists) {
    Write-Host "Remote 'origin' already exists. Updating..." -ForegroundColor Yellow
    git remote set-url origin "https://github.com/$GitHubUsername/$RepoName.git"
} else {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$GitHubUsername/$RepoName.git"
}

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/$GitHubUsername/$RepoName/settings/pages" -ForegroundColor Cyan
    Write-Host "2. Under 'Source', select:" -ForegroundColor Cyan
    Write-Host "   - Branch: main" -ForegroundColor White
    Write-Host "   - Folder: / (root)" -ForegroundColor White
    Write-Host "3. Click 'Save'" -ForegroundColor Cyan
    Write-Host "`nYour site will be live at:" -ForegroundColor Yellow
    Write-Host "https://$GitHubUsername.github.io/$RepoName/" -ForegroundColor Green
} else {
    Write-Host "`n✗ Error pushing to GitHub." -ForegroundColor Red
    Write-Host "Make sure you've created the repository on GitHub first!" -ForegroundColor Yellow
    Write-Host "Go to: https://github.com/new" -ForegroundColor Cyan
}

