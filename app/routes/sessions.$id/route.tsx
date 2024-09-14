import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SessionPage } from "~/modules/sessions/routes/SessionPage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async function ({ params }) {
  return json({ id: params.id });
};

type LoaderData = {
  id: string;
};
export default function Index() {
  const { id } = useLoaderData<LoaderData>();
  return <SessionPage id={id} />;
}
