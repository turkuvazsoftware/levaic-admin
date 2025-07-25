import React,{memo,Fragment} from 'react'
import { Link } from 'react-router-dom'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'

const Footer = memo(() => {
  const footer = useSelector(SettingSelector.footer)
  const currentYear = new Date().getFullYear();
  return (
    <Fragment>
       <footer className={`footer ${footer}`}>
        <div className="footer-body">
            <h6 className="right-panel mb-0">
                © {currentYear} <span>Levâic</span>
            </h6>
        </div>
    </footer>
    </Fragment>
  )
})

Footer.displayName = "Footer"
export default Footer