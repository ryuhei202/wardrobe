export const alertClosedWindow = (isClosable: boolean) => {
  isClosable
    ? window.removeEventListener("beforeunload", onUnload)
    : window.addEventListener("beforeunload", onUnload);
  return () => {
    // アンマウント時にタブを閉じる時のアラートをするイベントを削除する。
    window.removeEventListener("beforeunload", onUnload);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onUnload = (e: any) => {
  e.preventDefault();
  e.returnValue = "";
};
