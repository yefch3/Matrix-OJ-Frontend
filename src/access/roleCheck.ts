import ROLE_ENUM from "@/access/roleEnum";

/**
 *
 * @param loginUser current user
 * @param needRole need access
 * @returns boolean if the user has access
 */
const roleCheck = (loginUser: any, needRole = ROLE_ENUM.NOT_LOGIN) => {
  const loginUserRole = loginUser?.userRole ?? ROLE_ENUM.NOT_LOGIN;
  if (needRole === ROLE_ENUM.NOT_LOGIN) {
    return true;
  }

  if (needRole === ROLE_ENUM.USER) {
    return loginUserRole !== ROLE_ENUM.NOT_LOGIN;
  }

  if (needRole === ROLE_ENUM.ADMIN) {
    return loginUserRole === ROLE_ENUM.ADMIN;
  }
  return true;
};

export default roleCheck;
