export const alertClosedWindow = (isClosing: boolean) => {
  isClosing
    ? window.addEventListener("beforeunload", onUnload)
    : window.removeEventListener("beforeunload", onUnload);
  return () => {
    // アンマウント時にタブを閉じる時のアラートをするイベントを削除する。
    window.removeEventListener("beforeunload", onUnload);
  };
};

const onUnload = (e: any) => {
  e.preventDefault();
  e.returnValue = "";
};
