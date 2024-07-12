import { UtilFnPick } from "@/types/client.types";

const pick: UtilFnPick = (obj, keys) => {
  for (const key in obj) {
    if (!keys.includes(key as never)) {
      delete obj[key];
    }
  }

  return obj;
};

export default pick;