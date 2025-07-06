// Test script to check interview creation and retrieval
// Run this in your browser console to test the functionality

async function testInterviewCreation() {
  console.log('🧪 Testing interview creation and retrieval...\n');
  
  // Test 1: Check if API endpoint is accessible
  console.log('1️⃣ Testing API endpoint...');
  try {
    const response = await fetch('/api/vapi/generate', {
      method: 'GET'
    });
    const data = await response.json();
    console.log('✅ API endpoint accessible:', data);
  } catch (error) {
    console.log('❌ API endpoint error:', error);
  }
  
  // Test 2: Try to create a test interview with a known user ID
  console.log('\n2️⃣ Testing interview creation...');
  try {
    const testInterview = {
      type: "Technical",
      role: "Frontend Developer", 
      level: "Junior",
      techstack: "React,TypeScript",
      amount: 3,
      userid: "test-user-" + Date.now() // Use timestamp to make it unique
    };
    
    const response = await fetch('/api/vapi/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testInterview)
    });
    
    const data = await response.json();
    console.log('✅ Interview creation response:', data);
    
    if (data.success) {
      console.log('🎉 Interview created successfully!');
      
      // Test 3: Check if the interview appears in the list
      console.log('\n3️⃣ Checking if interview appears in list...');
      setTimeout(() => {
        console.log('🔄 Refresh the page to see if the interview appears in your list');
      }, 1000);
    } else {
      console.log('❌ Interview creation failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Interview creation error:', error);
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Check the console logs above for any errors');
  console.log('2. If the API test works, the issue might be with the VAPI workflow');
  console.log('3. If the API test fails, there might be an issue with the endpoint');
  console.log('4. Check your Firebase console to see if interviews are being created');
  console.log('5. Check the server logs for the detailed interview creation logs');
}

// Function to test with current user ID (if available)
async function testWithCurrentUser() {
  console.log('🔍 Testing with current user context...');
  
  // Try to get the current user from the page context
  // This will only work if the user data is available in the page
  const userElement = document.querySelector('[data-user-id]');
  if (userElement) {
    const userId = userElement.getAttribute('data-user-id');
    console.log('Found user ID in page:', userId);
    
    if (userId) {
      const testInterview = {
        type: "Technical",
        role: "Backend Developer", 
        level: "Senior",
        techstack: "Node.js,Express,MongoDB",
        amount: 5,
        userid: userId
      };
      
      try {
        const response = await fetch('/api/vapi/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testInterview)
        });
        
        const data = await response.json();
        console.log('✅ Interview created for current user:', data);
        
        if (data.success) {
          console.log('🎉 Interview created successfully for user:', userId);
          console.log('🔄 Refresh the page to see if it appears in your list');
        }
      } catch (error) {
        console.log('❌ Error creating interview for current user:', error);
      }
    }
  } else {
    console.log('❌ Could not find user ID in page context');
  }
}

// Function to log all interviews in the database
async function logAllInterviews() {
  console.log('📊 Logging all interviews in database...');
  
  try {
    // This will trigger the getAllInterviews function on the server
    // and log the results in the server console
    console.log('🔄 Refreshing page to trigger interview logging...');
    window.location.reload();
  } catch (error) {
    console.log('❌ Error logging interviews:', error);
  }
}

// Run the tests
console.log('🚀 Starting interview debugging tests...');
testInterviewCreation();
// Uncomment the lines below to test with current user and log all interviews
// testWithCurrentUser();
// logAllInterviews(); 