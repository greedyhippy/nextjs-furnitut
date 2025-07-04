# Norko Next.js Frontend - Troubleshooting Guide

## Current Status

- ✅ Project cloned from Crystallize Next.js boilerplate
- ✅ Dependencies installed (npm install)
- ✅ Environment variables configured (.env.local)
- ✅ GraphQL placeholder types created
- ✅ TailwindCSS downgraded to v3 (stable)
- ✅ Layout simplified to remove GraphQL dependencies
- ✅ TypeScript errors suppressed in critical files
- ✅ Next.js config simplified

## To Start the Development Server

### Option 1: Using the batch file

1. Double-click on `start-dev.bat` in the project root
2. This will open a command window and start the server

### Option 2: Manual command line

1. Open Command Prompt (not PowerShell)
2. Navigate to project: `cd /d "e:\Software Dev\Crystalize\Norko\norko-crystalize-frontend"`
3. Run: `npm run dev`

### Option 3: VS Code Terminal

1. Open VS Code Terminal (View > Terminal)
2. Make sure you're in the project directory
3. Run: `npm run dev`

## Expected Output

When the server starts successfully, you should see:

```
▲ Next.js 15.1.3
- Local: http://localhost:3000
- Ready in [time]
```

## Test URLs

- Main page: http://localhost:3000
- Test page: http://localhost:3000/test-simple

## Common Issues & Solutions

### 1. Port already in use

- Kill any running Next.js processes
- Or use a different port: `npm run dev -- -p 3001`

### 2. Build errors

- Try: `npm run build-debug` to see detailed errors
- Check for any missing dependencies

### 3. GraphQL errors

- The placeholder GraphQL files should handle most import errors
- All GraphQL features are temporarily disabled

### 4. Windows-specific issues

- Make sure you're using Command Prompt, not PowerShell
- Check that Node.js and npm are properly installed
- Try running as Administrator if permissions issues occur

## Windows Permissions Issues

### Error: EPERM operation not permitted

If you see an error like:

```
Error: EPERM: operation not permitted, open '.next\trace'
```

**Solution Options:**

#### Option 1: Use the fix script (Recommended)

1. Right-click on `fix-permissions.bat` and select "Run as Administrator"
2. This will clean up the .next directory and set proper permissions

#### Option 2: Manual cleanup

1. Close any running Node.js processes
2. Open Command Prompt as Administrator
3. Run these commands:
    ```cmd
    cd /d "e:\Software Dev\Crystalize\Norko\norko-crystalize-frontend"
    rmdir /s /q .next
    npm cache clean --force
    mkdir .next
    icacls .next /grant Everyone:(F) /T
    npm run dev
    ```

#### Option 3: Use alternative start script

1. Try running `start-dev-admin.bat` as Administrator

### Other Windows-specific fixes:

- **Antivirus interference**: Temporarily disable real-time scanning
- **Windows Defender**: Add the project folder to exclusions
- **File system permissions**: Ensure your user has full control over the project directory
- **Long path names**: Make sure Windows long path support is enabled

## Next Steps After Server is Running

1. ✅ Verify frontend loads at localhost:3000
2. Set up Crystallize content model
3. Generate proper GraphQL types with codegen
4. Implement product catalog and cart functionality
5. Set up Railway API integration
