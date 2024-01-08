import { useToast } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";

type ToastOptions = {
  title?: string;
  icon?: ReactNode;
  description: string | ReactNode;
  isCloseable?: boolean;
};

export const useCustomToast = () => {
  const toast = useToast({
    position: "top",
  });

  const wrapper = useMemo(
    () => ({
      promise: (
        promise: Promise<unknown>,
        options: {
          success: ToastOptions;
          error: ToastOptions;
          loading: ToastOptions;
        },
      ) =>
        toast.promise(promise, {
          success: {
            title: options.success.title,
            icon: options.success.icon,
            description: options.success.description,
          },
          error: {
            title: options.error.title,
            icon: options.error.icon,
            description: options.error.description,
          },
          loading: {
            colorScheme: "gray",
            title: options.loading.title,
            icon: options.loading.icon,
            description: options.loading.description,
          },
        }),
      success: (options: ToastOptions) =>
        toast({
          title: options.title,
          status: "success",
          icon: options.icon,
          description: options.description,
          isClosable: options.isCloseable,
        }),
      error: (options: ToastOptions) =>
        toast({
          title: options.title,
          status: "error",
          icon: options.icon,
          description: options.description,
        }),
    }),
    [toast],
  );

  return wrapper;
};
