import Loader from "@/components/loader";
import { Suspense } from "react";
import FormLayout from ".";

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FormLayout />
    </Suspense>
  );
};

export default Home;
