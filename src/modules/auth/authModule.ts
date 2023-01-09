'use strict'

import webService from '../common/webService'
import { WebApiParamForm, WebApiParamData, WebApiReturn } from '../../Config/jsonSchema'
import config from '../../Config/index'

/** 유저 정보 */
export interface UserInfo {
    /** 유저 아이디 */
    USER_ID: string,
    /** 유저명 */
    NAME: string,
    /** 아바타 이미지 */
    IMG_AVATAR: string,
    /** 유저 레벨 */
    LEVELS: number,

    [data:string] : string | number | null
}

/**
 * Web Service용 기본 클래스
 */
export default class AuthModule {
    
    constructor() {

    }

    // public static ChangeUserInfo(data : WebApiParamData) : UserInfo {
    //     let tmpRtnData : UserInfo = {
    //         USER_ID: '',
    //         NAME: '',
    //         IMG_AVATAR: '',
    //         LEVELS: -1,
    //     }
    //     let tmpKeys = Object.keys(data)
    //     for(let i = 0; i < tmpKeys.length; i++) {
    //         tmpRtnData[tmpKeys[i]] = data[tmpKeys[i]]
    //     }

    //     return tmpRtnData
    // }    

    /** 유저 정보 가져오기 */ 
    public static GetUserInfo() : UserInfo {
        return JSON.parse(localStorage.getItem('USERINFO'))
    }

    /** 유저 정보 등록 */
    private static setUserInfo(userInfo : UserInfo) {
        localStorage.setItem('USERINFO', JSON.stringify(userInfo))
    }


    /**
     * 로그인 체크 로직
     * @returns 인증 결과 리턴
     */
    public static async LoginCheck() {
        var rtn : any = await webService.CallWebApi('user', 'chklogin', webService.CreateWebApiParam({}))
        console.log(rtn)
        debugger


        return rtn
    }


    /**
     * 로그인 처리
     * @param userId 유저 아이디
     * @param userPw 유저 패스워드
     */
    public static async Login(userId : string, userPw : string) {
        let tmpParam : WebApiParamData = { 
            USER_ID: userId, 
            USER_PW: userPw
        }
        let rtnData : WebApiReturn | null = null

        try {
            rtnData = await webService.CallWebApi('user', 'login', webService.CreateWebApiParam(tmpParam))
            debugger
            this.setUserInfo(<UserInfo>rtnData.rtndata[0])
        } catch(err) {
            debugger
        }
    }

    /**
     * 로그아웃
     */
    public static async Logout() {
        let rtnData : any = await webService.CallWebApi('user', 'logout', webService.CreateWebApiParam({}))
        console.log(rtnData)
        debugger
    }

    

}
