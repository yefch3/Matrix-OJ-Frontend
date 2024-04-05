/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ProblemSubmitVO_ } from '../models/BaseResponse_Page_ProblemSubmitVO_';
import type { ProblemSubmitAddRequest } from '../models/ProblemSubmitAddRequest';
import type { ProblemSubmitQueryRequest } from '../models/ProblemSubmitQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProblemSubmitControllerService {
    /**
     * doProblemSubmit
     * @param problemSubmitAddRequest problemSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doProblemSubmitUsingPost(
        problemSubmitAddRequest: ProblemSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem_submit/',
            body: problemSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listProblemSubmitByPage
     * @param problemSubmitQueryRequest problemSubmitQueryRequest
     * @returns BaseResponse_Page_ProblemSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listProblemSubmitByPageUsingPost(
        problemSubmitQueryRequest: ProblemSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ProblemSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem_submit/list/page',
            body: problemSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
