/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeResult } from './JudgeResult';
import type { ProblemVO } from './ProblemVO';
import type { UserVO } from './UserVO';
export type ProblemSubmitVO = {
    code?: string;
    createTime?: string;
    id?: number;
    judgeResult?: JudgeResult;
    language?: string;
    problemId?: number;
    problemVO?: ProblemVO;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

