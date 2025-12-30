'use client';

import { UserInfoContext } from "@/contexts/userinfo";
import { useState } from "react";
import type { FC, ReactNode } from "react";

interface UserInfoProviderProps {
  children: ReactNode;
}

const UserInfoProvider: FC<UserInfoProviderProps> = ({ children }) => {
  const [classId, setClassId] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');

  return (
    <UserInfoContext.Provider
      value={{
        classId,
        studentId,
        setClassId,
        setStudentId,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;