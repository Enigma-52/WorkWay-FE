import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "TechJobs - Your Gateway to Tech Opportunities" },
    {
      name: "description",
      content:
        "Discover curated tech opportunities from leading startups to established companies.",
    },
  ];
};

export default function Jobs() {
  return <div>Jobs</div>;
}
