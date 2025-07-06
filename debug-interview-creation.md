# Debugging Interview Creation Issue

## Problem
Interviews created by you are not showing up in the "Interviews created by [your name]" section.

## Potential Causes

### 1. VAPI Workflow Configuration
The VAPI workflow might not be properly configured to call your API endpoint.

**Check:**
- Go to your VAPI dashboard
- Check if the workflow `NEXT_PUBLIC_VAPI_WORKFLOW_ID` is configured to make an HTTP request to your `/api/vapi/generate` endpoint
- The workflow should call: `https://your-domain.com/api/vapi/generate`

### 2. Environment Variables
Make sure your environment variables are set correctly:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id
```

### 3. API Endpoint Issues
The API endpoint might not be working properly.

**Test the API endpoint:**
```bash
curl -X POST http://localhost:3000/api/vapi/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "Technical",
    "role": "Frontend Developer",
    "level": "Junior",
    "techstack": "React,TypeScript",
    "amount": 5,
    "userid": "test-user-id"
  }'
```

### 4. Database Issues
Interviews might be created but not saved properly.

**Check Firebase Console:**
- Go to Firebase Console > Firestore Database
- Look for the "interviews" collection
- Check if interviews are being created with the correct `userId`

## Debugging Steps

### Step 1: Check Console Logs
1. Open browser developer tools
2. Go to the Console tab
3. Try creating an interview
4. Look for any error messages or the debug logs I added

### Step 2: Check Network Tab
1. Open browser developer tools
2. Go to the Network tab
3. Try creating an interview
4. Look for any API calls to `/api/vapi/generate`

### Step 3: Check VAPI Workflow
1. Go to your VAPI dashboard
2. Check the workflow configuration
3. Make sure it's set up to call your API endpoint

### Step 4: Test API Endpoint Directly
Use the curl command above to test if the API endpoint works.

## Quick Fixes to Try

### Fix 1: Check if interviews exist in database
Run this in your browser console to check if interviews exist:

```javascript
// This will show all interviews in the console
fetch('/api/vapi/generate', {
  method: 'GET'
}).then(r => r.json()).then(console.log);
```

### Fix 2: Manually create a test interview
If the API endpoint works, you can manually create a test interview to see if it shows up.

### Fix 3: Check VAPI workflow logs
Check your VAPI dashboard for any error logs from the workflow execution.

## Expected Behavior
1. When you click "Call" on the interview generation page
2. The VAPI workflow should start
3. The workflow should collect interview details (role, level, etc.)
4. The workflow should call your `/api/vapi/generate` endpoint
5. The API should create an interview in the database
6. The interview should appear in your list

## Next Steps
1. Try the debugging steps above
2. Check the console logs for any errors
3. Let me know what you find and I can help further 