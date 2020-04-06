export const getProjectType = type => {
  const typeNum = parseInt(type);
  switch (typeNum) {
    case 1:
      return "개인프로젝트";
    case 2:
      return "팀 프로젝트";
    case 3:
      return "외주 프로젝트";
  }
};

const showUserContext = () => {
  const userContext = document.querySelector(".headerUserInfo");
  if (userContext)
    document.querySelector(".headerUserInfo").classList.add("on");
};

export const closeUserContext = () => {
  const userContext = document.querySelector(".headerUserInfo");
  if (userContext)
    document.querySelector(".headerUserInfo").classList.remove("on");
};

export const toggleUserContext = () => {
  const active = document.querySelector(".headerUserInfo");
  if (active)
    active.classList.contains("on") ? closeUserContext() : showUserContext();
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const makeDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export const removeHtml = content => {
  const removedImg = content.replace(/<IMG(.*?)>/gi, content);
  const removedHtml = removedImg
    .replace(/<br\/>/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, "");

  return removedHtml;
};
