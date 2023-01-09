'use strict'

import axios, { AxiosError, AxiosResponse } from 'axios'
import { WebApiParamForm, WebApiParamData, WebApiParamArrayData, WebApiReturn } from '../../Config/jsonSchema'
import config from '../../Config/index'

/**
 * Web Service용 기본 클래스
 */
export default class WebService {
    
    constructor() {

    }

    /**
     * 웹서비스 호출용 공통 함수
     * @param midcmd 중간 CMD
     * @param cmd 최종 CMD
     * @param params 서비스 넘길 데이터
     */
    public static async CallWebApi(midcmd : String, cmd : String, params : WebApiParamForm) : Promise<WebApiReturn> {
        try {
            let tmpUrl = config.BASEURL || '' ? config.BASEURL + '/' : ''

            try {
                let returnData : AxiosResponse = await axios.post(tmpUrl + config.BASEMIDURI + '/' + midcmd + '/' + cmd, params, { /**headers : authHeader()**/ })
                return returnData.data
            } catch(err : any) {
                
                let tmpRtnData = (<AxiosError>err).response?.data
                if(tmpRtnData) {
                    // errmsg_007
                    return <WebApiReturn>tmpRtnData
                } else {
                    debugger
                    // 예외 에러이니 확인하세요.
                    console.log(err)
                    return err
                }
            }

        } catch (error) {
            debugger
            return error

            if (axios.isAxiosError(error)) {
                
            } else {
                
            }
        }
    }

    /** 웹 서비스 전송용 인자 생성 */
    public static CreateWebApiParam(params : WebApiParamData | WebApiParamArrayData) : WebApiParamForm {
        
        let tmpData : WebApiParamForm = {
            VIEW_CODE : sessionStorage.getItem("VIEW_CODE"),
            DATA: params
        }

        return tmpData
    }
}
