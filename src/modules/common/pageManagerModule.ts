'use strict'

import AuthModule from "../auth/authModule";



/**
 * 화면 관리 메니저
 */
export default class PageManagerModule {

    /** 최초 유무 */
    private static isFirst = true
    
    constructor() {
        
    }

    /**
     * 화면 최초 호출 시 기본 설정
     */
    public static FirstPageInfo() {
        if(this.isFirst === true)  {
            // 언어팩(스토리지에 등록)

            window.addEventListener('focus', this.ActivateWindow)
            this.isFirst = false
        }
        // // 로그인 체크
        // document.addEventListener("visibilitychange", function(e) {
        //     console.log('변환:' + document.visibilityState)
        //     // 숨김 여부가 변했을 때의 행동
        // });
    }

    
    private static ActivateWindow() {
        // 로그인 체크
        AuthModule.LoginCheck().then(rtn => {
            debugger
            // errmsg_007

        }).catch(err => {
            debugger
        })
    }

}
