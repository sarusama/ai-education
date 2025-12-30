import { createContext, useContext } from "react";

interface UserInfo {
  classId?: string;
  studentId?: string;
  setClassId: (classId: string) => void;
  setStudentId: (studentId: string) => void;
}

const UserInfoContext = createContext<UserInfo>({
  classId: '',
  studentId: '',
  setClassId: () => {},
  setStudentId: () => {},
});

const useUserInfoContext = () => useContext(UserInfoContext);

export { UserInfoContext, useUserInfoContext };
