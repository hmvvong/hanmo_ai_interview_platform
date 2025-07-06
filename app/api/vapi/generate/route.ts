import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function POST(request: Request) {
  console.log("🚀 POST /api/vapi/generate called at:", new Date().toISOString());
  
  const { type, role, level, techstack, amount, userid } = await request.json();

  console.log("📝 Interview creation request received:");
  console.log("Type:", type);
  console.log("Role:", role);
  console.log("Level:", level);
  console.log("Techstack:", techstack);
  console.log("Amount:", amount);
  console.log("Userid from VAPI (ignored):", userid);

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    console.log("💾 Saving interview to database (without userId):", interview);

    const interviewRef = await db.collection("interviews").add(interview);

    console.log("✅ Interview saved successfully with ID:", interviewRef.id);

    return Response.json({ 
      success: true, 
      interviewId: interviewRef.id,
      interview: interview 
    }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}

export async function PUT(request: Request) {
  console.log("🚀 PUT /api/vapi/generate called at:", new Date().toISOString());
  
  // Get user from session
  const user = await getCurrentUser();
  const userid = user?.id;

  console.log("📝 Updating latest interview with userId:");
  console.log("User ID:", userid);

  if (!user || !userid) {
    console.error("❌ User not authenticated or user ID missing");
    return Response.json({ 
      success: false, 
      error: "User not authenticated" 
    }, { status: 401 });
  }

  try {
    // First, let's see all interviews in the database
    const allInterviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();

    console.log("🔍 All interviews in database:", allInterviews.docs.length);
    allInterviews.docs.forEach((doc, index) => {
      console.log(`Interview ${index + 1}:`, { id: doc.id, ...doc.data() });
    });

    // Find the latest interview without userId and update it
    // Get the latest interview and check if it has userId
    const latestInterview = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (latestInterview.empty) {
      console.log("❌ No interviews found in database");
      return Response.json({ 
        success: false, 
        error: "No interviews found in database" 
      }, { status: 404 });
    }

    const latestDoc = latestInterview.docs[0];
    const latestData = latestDoc.data();
    console.log("🔍 Latest interview data:", { id: latestDoc.id, ...latestData });

    // Check if the latest interview has a valid userId
    if (latestData.userId && 
        latestData.userId !== "" && 
        latestData.userId !== null && 
        latestData.userId !== "{{userid}}" && 
        latestData.userId !== "undefined") {
      console.log("❌ Latest interview already has userId:", latestData.userId);
      return Response.json({ 
        success: false, 
        error: "Latest interview already has userId" 
      }, { status: 400 });
    }

    // Update the latest interview with userId
    await latestDoc.ref.update({
      userId: userid
    });

    console.log("✅ Latest interview updated with userId successfully!");
    console.log("Updated interview ID:", latestDoc.id);

    return Response.json({ 
      success: true, 
      message: "Interview updated with userId",
      interviewId: latestDoc.id
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating interview:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}