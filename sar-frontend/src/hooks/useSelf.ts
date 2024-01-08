import {
  UpdateSelfDto,
  useSelfControllerFindOneQuery,
  useSelfControllerUpdateMutation,
} from "services";
import { useCallback } from "react";
import { useCustomToast } from "./useCustomToast";

export const useSelf = () => {
  const toast = useCustomToast();
  const {
    data: self,
    isLoading: getIsLoading,
    isError: userLoadError,
    refetch,
  } = useSelfControllerFindOneQuery();
  const [update, { isLoading: updateIsLoading }] =
    useSelfControllerUpdateMutation();

  const handleSubmit = useCallback(
    <K extends keyof UpdateSelfDto>(key: K) =>
      (value: UpdateSelfDto[K]) =>
        update({
          updateSelfDto: {
            [key]: value,
          },
        })
          .unwrap()
          .catch(() => toast.error({ description: "Failed to update user" })),
    [toast, update],
  );

  return {
    self: !getIsLoading ? self ?? null : undefined,
    refetch,
    handleSubmit,
    isPending: getIsLoading || updateIsLoading,
    userLoadError,
  };
};
