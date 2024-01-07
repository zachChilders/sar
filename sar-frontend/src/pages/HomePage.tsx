import { FunctionComponent } from "react";
import { useAppControllerGetHelloQuery } from "services";

export const HomePage: FunctionComponent = () => {
  const { data } = useAppControllerGetHelloQuery();

  return (
    <div>
      <h1>{data as string}</h1>
    </div>
  );
};
