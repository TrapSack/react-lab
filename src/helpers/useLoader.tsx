import { useEffect, useState } from "react";

export default function useLoader(trigger: boolean) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(!trigger);
  }, [trigger]);
  return showLoader;
}
