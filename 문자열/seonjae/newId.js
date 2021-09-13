function solution(new_id) {
  const reg = /[^0-9a-z_.-]/g;
  const modifyAndDeleteDots = (step) => (res, string, index) => {
    if (res === "") {
      if (string === ".") return res;
      return string;
    }

    if (res[res.length - 1] === ".") {
      if (string === ".") {
        if (index === step.length - 1) {
          return res.slice(0, res.length - 1);
        }

        return res;
      } else {
        return res + string;
      }
    } else {
      if (index === step.length - 1 && string === ".") return res;
      return res + string;
    }
  };
  const sliceString = (str) => {
    if (str.length < 16) return str;

    return str
      .slice(0, 15)
      .split("")
      .reverse()
      .reduce((pre, cur) => {
        if (pre === "" && cur === ".") return pre;
        return cur + pre;
      }, "");
  };
  const addString = (str) => {
    if (str.length > 2) return str;

    return str + str[str.length - 1].repeat(3 - str.length);
  };

  const step1 = new_id.toLowerCase();
  const step2 = step1.split(reg).join("").split("");
  const step34 = step2.reduce(modifyAndDeleteDots(step2), "");
  const step5 = step34 === "" ? "a" : step34;
  const step6 = sliceString(step5);
  const step7 = addString(step6);

  return step7;
}
