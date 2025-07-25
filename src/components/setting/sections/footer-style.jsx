import React,{memo,Fragment} from 'react'
import RadioBtn from '../elements/radio-btn'


const FooterStyle = memo((props) => {
  
  return (
    <Fragment>
        <div className="mt-4 mb-3">
              <h6 className="d-inline-block mb-0 me-2">Footer </h6>
            </div>
            <div className="d-grid gap-3 grid-cols-3 mb-4">
              <RadioBtn btnName="footer" id="footer_Sticky" labelclassName="d-block" defaultChecked={props.footerstyle} value="sticky" >
                    Sabit
                </RadioBtn>
                <RadioBtn btnName="footer" id="footer_default" labelclassName="d-block" defaultChecked={props.footerstyle} value="default" >
                    Varsayılan
                </RadioBtn>
                <RadioBtn btnName="footer" id="footer_glass" labelclassName="d-block" defaultChecked={props.footerstyle} value="glass" >
                    Cam
                </RadioBtn>
          </div>
    </Fragment>
  )
})

FooterStyle.displayName="FooterStyle"
export default FooterStyle