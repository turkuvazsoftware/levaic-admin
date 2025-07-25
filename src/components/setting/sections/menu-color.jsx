import React, { memo, Fragment } from 'react'
import RadioBtn from '../elements/radio-btn'

const MenuColor = memo((props) => {

    return (
        <Fragment>
            <h6 className="mt-4 mb-3">Menu Rengi</h6>
            <div className="d-grid gap-3 grid-cols-3 mb-3">
                <RadioBtn btnName="sidebar_color" imgComponent labelclassName="d-flex align-items-center bg-transparent" id="sidebar-white" defaultChecked={props.sidebarColor} value="sidebar-white" >
                    <i className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" fill="currentColor" stroke="black" strokeWidth="3"></circle>
                        </svg>
                    </i>
                    <span className="ms-2 ">Varsayılan</span>
                </RadioBtn>
                <RadioBtn btnName="sidebar_color" imgComponent labelclassName="d-flex align-items-center bg-transparent" id="sidebar-dark" defaultChecked={props.sidebarColor} value="sidebar-dark" >
                    <i className="text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                        </svg>
                    </i>
                    <span className="ms-2 ">Siyah</span>
                </RadioBtn>
                <RadioBtn btnName="sidebar_color" imgComponent labelclassName="d-flex align-items-center bg-transparent" id="sidebar-color" defaultChecked={props.sidebarColor} value="sidebar-color" >
                    <i className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                        </svg>
                    </i>
                    <span className="ms-2 ">Renkli</span>
                </RadioBtn>
            </div>
            <div className="d-grid gap-3 grid-cols-2 mb-4">
                <RadioBtn btnName="sidebar_color" imgComponent labelclassName="d-flex align-items-center bg-transparent" id="sidebar-transparent" defaultChecked={props.sidebarColor} value="sidebar-transparent" >
                    <i className="text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" fill="#F5F6FA" stroke="black" strokeWidth="3"></circle>
                        </svg>
                    </i>
                    <span className="ms-2 ">Saydam</span>
                </RadioBtn>
                <RadioBtn btnName="sidebar_color" imgComponent labelclassName="d-flex align-items-center bg-transparent" id="sidebar-glass" defaultChecked={props.sidebarColor} value="sidebar-glass" >
                    <i className="text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" fill="#F5F6FA" stroke="black" strokeWidth="3"></circle>
                        </svg>
                    </i>
                    <span className="ms-2 ">Cam</span>
                </RadioBtn>
            </div>
        </Fragment>
    )
}
)

MenuColor.displayName = 'MenuColor'
export default MenuColor