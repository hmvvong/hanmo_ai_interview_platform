import Image from "next/image";

import InterviewCard from "@/components/InterviewCard";
import AllInterviewsList from "@/components/AllInterviewsList";
import ClientInterviewCard from "@/components/ClientInterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getAllInterviews,
} from "@/lib/actions/general.action";
import AnimatedCTAButton from "@/components/AnimatedCTAButton";
import AnimatedText from "@/components/AnimatedText";
import Footer from "@/components/Footer";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview, allInterviewsInDB] = await Promise.all([
    getInterviewsByUserId(user?.id || ''),
    getLatestInterviews({ userId: user?.id || '' }),
    getAllInterviews(),
  ]);

  console.log("User interviews:", userInterviews);
  console.log("All interviews:", allInterview);
  console.log("ALL interviews in database:", allInterviewsInDB);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (allInterview?.length ?? 0) > 0;

  // Pre-render all interview cards on the server
  const renderedInterviewCards = await Promise.all(
    (allInterview || []).map(async (interview) => {
      const interviewCard = await (
        <InterviewCard
          key={interview.id}
          userId={user?.id}
          interviewId={interview.id}
          role={interview.role}
          type={interview.type}
          techstack={interview.techstack}
          createdAt={interview.createdAt}
          coverImage={interview.coverImage}
          level={interview.level}
          questions={interview.questions}
        />
      );
      
      return (
        <ClientInterviewCard
          key={interview.id}
          interview={interview}
          userId={user?.id}
          interviewCard={interviewCard}
        />
      );
    })
  );

  return (
    <>
      <section className="card-cta flex-col-reverse md:flex-row items-center">
        <div className="flex flex-col gap-10 mt-6 sm:mt-0 px-3 py-5">
          <AnimatedText delay={0.1}>
            <h2 className="mb-5"><span className="text-orange-300">AI-Powered</span> Real-Time Interview Platform for Smarter Hiring</h2>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-xl mb-5 font-semibold">
              Practice real interview questions & get instant feedback<br />
              For example: Frontend, Backend, Fullstack, Design, UX/UI
            </p>
          </AnimatedText>

          <div className="flex justify-start mb-5">
            <AnimatedCTAButton href="/interview" delay={0.3}>
              Create an Interview
            </AnimatedCTAButton>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Interviews created by { }
          <span className="text-primary-200">{user?.name}</span>
        </h2>

          {/*dummy*/}
        <div className="interviews-section">
            {/*{dummyInterviews.map((interview) => (*/}
            {/*    <InterviewCard {...interview} key={interview.id} />*/}
            {/*))}*/}

          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                coverImage={interview.coverImage}
                level={interview.level}
                questions={interview.questions}
              />
            ))
          ) : (
            <p className="text-xl">You haven&apos;t created or taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>All Interviews {allInterview && allInterview.length > 0 && 
          <span className="text-primary-200">({allInterview.length})</span>
        }</h2>

          {/*<div className="interviews-section">*/}
          {/*/!*dummy*!/*/}
          {/*{dummyInterviews.map((interview) => (*/}
          {/*    <InterviewCard {...interview} key={interview.id} />*/}
          {/*))}*/}
          {/*</div>*/}


        {hasUpcomingInterviews ? (
          <AllInterviewsList renderedCards={renderedInterviewCards} />
        ) : (
          <p>There are no interviews available</p>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Home;