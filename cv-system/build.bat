@echo off
chcp 65001 >nul
echo ============================================
echo   CV Jesse Ogoula — Build System (FR + EN)
echo ============================================
echo.
echo Compilation des versions Francaise et Anglaise...
python "%~dp0render_cv.py" --all
echo.
echo ============================================
echo   Build termine avec succes !
echo ============================================
pause
