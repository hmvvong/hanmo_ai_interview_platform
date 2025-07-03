import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview generation</h3>
        <p>Note: The voice agent service costs money to use. If it’s not working, please contact me!</p>

      <Agent
        userName={user?.name ?? ''}
        userId={user?.id}
        userAvatar={user?.photoURL}
        type="generate"
      />
    </>
  );
};

export default Page;