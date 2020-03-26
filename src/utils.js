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
  document.querySelector(".headerUserInfo").classList.add("on");
};

export const closeUserContext = () => {
  document.querySelector(".headerUserInfo").classList.remove("on");
};

export const toggleUserContext = () => {
  const active = document
    .querySelector(".headerUserInfo")
    .classList.contains("on");
  active ? closeUserContext() : showUserContext();
};
