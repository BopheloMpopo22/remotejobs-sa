Write-Host "Adding files..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "trigger: force deployment for Yoco debugging"

Write-Host "Pushing to remote..." -ForegroundColor Green
git push

Write-Host "Done!" -ForegroundColor Green
Read-Host "Press Enter to continue" 