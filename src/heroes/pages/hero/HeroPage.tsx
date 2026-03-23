import { useParams } from "react-router";

export const HeroPage = () => {
  const { idSlug = "" } = useParams();

  return (
    <>
      <h1>Hero Page</h1>
    </>
  );
};
