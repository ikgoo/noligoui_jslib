'use strict'

import "@babel/polyfill";
import AuthModule from "./modules/auth/authModule";
import PageManagerModule from "./modules/common/pageManagerModule";


export function FirstPageInfo() {
	PageManagerModule.FirstPageInfo()
}


// 인증 관련
//const authM : AuthModule = new AuthModule()

export { AuthModule }
