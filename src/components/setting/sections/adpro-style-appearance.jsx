import React,{memo,Fragment}from 'react'
import CheckboxBtn from '../elements/checkbox-btn'


const AdProStyleAppearance = memo((props) => {
    return (
        <Fragment>
            <div>
                <h6 className="d-inline-block mb-3 me-2">Stil Görünümü </h6>
            </div>
            <div className="d-grid gap-3 grid-cols-3 mb-4">
                <CheckboxBtn btnName="theme_style_appearance" id="theme-style-appearance-flat" defaultChecked={props.themeStyleAppearance} value="theme-flat" >
                    Düz                    
                </CheckboxBtn>
                <CheckboxBtn btnName="theme_style_appearance" id="theme-style-appearance-bordered" defaultChecked={props.themeStyleAppearance} value="theme-bordered" >
                    Kenarlı                    
                </CheckboxBtn>
                <CheckboxBtn btnName="theme_style_appearance" id="theme-style-appearance-sharp" defaultChecked={props.themeStyleAppearance} value="theme-sharp" >
                    Keskin                    
                </CheckboxBtn>
            </div>
        </Fragment>
    )
}
)

AdProStyleAppearance.displayName="AdProStyleAppearance"
export default AdProStyleAppearance