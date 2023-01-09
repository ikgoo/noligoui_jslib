'use strict'

/**
 * 프로젝트 설정
 */
 export interface  ProjectConfig {
    /** 기본 URL */
    BASEURL : string,

    /** WebService 중간 URI */
    BASEMIDURI : string,
}

/**
 * 윕 서비스 호출을 위한 전송 양식
 */
export interface WebApiParamForm {
    VIEW_CODE?: string,
    DATA?: WebApiParamData | WebApiParamArrayData
}

/**
 * 웹 서비스 호출에 필요한 데이처 양식
 */
export interface WebApiParamData {
    [data:string] : string | number | null
}

export interface WebApiParamArrayData {
    [data:string] : Array<WebApiParamData>
}

export interface WebApiReturn {
    /** 데이터 부분 정보(JSON) */
    rtndata : Array<WebApiParamArrayData | WebApiParamData>,
    /** 결과 상태 정보:   */
    status : boolean,
    /** 결과 에러 코드 */
    errorcode? : string,
}



// /**
//  * DB 종류
//  */
//  export enum eDBType  {
//     MSSQL = 'MSSQL',
//     ORACLE = 'ORACLE',
//     MYSQL = 'MYSQL',
// }
