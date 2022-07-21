import React from 'react'
import Style from '../../stylesheet/setting/setting.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faKey,faAdjust} from '@fortawesome/free-solid-svg-icons'
import {Link ,Outlet} from 'react-router-dom';
export default function Setting() {
  return (
    <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Style.divThemeLight  : Style.divThemeDark }>
    <div className={Style.container}>
            <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Style.leftLight  : Style.leftDark}>
                <div className={Style.option}>
                    <Link to={'EditProfile'} className={Style.tabs} ><FontAwesomeIcon className={Style.optionIcon} icon={faPen} />Edit profile </Link>

                    <Link to={'EditPassword'} className={Style.tabs} > <FontAwesomeIcon className={Style.optionIcon}  icon={faKey} />Edit password </Link>

                    <Link to={'Theme'} className={Style.tabs} > <FontAwesomeIcon className={Style.optionIcon}  icon={faAdjust} />Theme </Link>
        </div>
      </div>
      <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Style.rightLight  : Style.rightDark}>
          <Outlet />
          </div>
    </div>
    </div>
  )
}
