import React, { memo, Fragment, useState } from "react";

import _ from "lodash";

//react-bootstrap
import { Tooltip, OverlayTrigger, Collapse } from "react-bootstrap";

//router
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { theme_color } from "../../../store/setting/actions";

// Images

const ColorCustomizer = memo((props) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const colorValue = props.themeColor;

  const updateColor = (colorClassName, colorObj) => {
    dispatch(theme_color({ value: colorClassName, colors: colorObj }));
  };

  const slowChange = _.debounce((colorClassName, colorObj) => {
    updateColor(colorClassName, colorObj);
  }, 300);

  const colorChange = (colorClassName, colorObj, isDebounce = false) => {
    if (isDebounce) {
      slowChange(colorClassName, colorObj);
    } else {
      updateColor(colorClassName, colorObj);
    }
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="mt-4 mb-3">Renk Özelleştirici</h6>
        <div className="d-flex align-items-center">
          <Link
            to="#"
            role="button"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Özel
          </Link>
          <div data-setting="radio">
            <input
              type="radio"
              data-value="theme-color-default"
              className="btn-check"
              name="theme_color"
              id="theme-color-default"
              defaultValue={'theme-color-default'}
            />
            <label
              className="btn bg-transparent px-2 border-0"
              htmlFor="theme-color-default"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Reset Color"
              data-bs-original-title="Reset color"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Reset Color</Tooltip>}
              >
                <div
                  data-value="theme-color-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Default"
                  data-bs-original-title="Default"
                  onClick={() => {
                    colorChange("theme-color-default", {
                      "--{{prefix}}primary": "#3a57e8",
                      "--{{prefix}}info": "#4bc7d2",
                    });
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.4799 12.2424C21.7557 12.2326 21.9886 12.4482 21.9852 12.7241C21.9595 14.8075 21.2975 16.8392 20.0799 18.5506C18.7652 20.3986 16.8748 21.7718 14.6964 22.4612C12.518 23.1505 10.1711 23.1183 8.01299 22.3694C5.85488 21.6205 4.00382 20.196 2.74167 18.3126C1.47952 16.4293 0.875433 14.1905 1.02139 11.937C1.16734 9.68346 2.05534 7.53876 3.55018 5.82945C5.04501 4.12014 7.06478 2.93987 9.30193 2.46835C11.5391 1.99683 13.8711 2.2599 15.9428 3.2175L16.7558 1.91838C16.9822 1.55679 17.5282 1.62643 17.6565 2.03324L18.8635 5.85986C18.945 6.11851 18.8055 6.39505 18.549 6.48314L14.6564 7.82007C14.2314 7.96603 13.8445 7.52091 14.0483 7.12042L14.6828 5.87345C13.1977 5.18699 11.526 4.9984 9.92231 5.33642C8.31859 5.67443 6.8707 6.52052 5.79911 7.74586C4.72753 8.97119 4.09095 10.5086 3.98633 12.1241C3.8817 13.7395 4.31474 15.3445 5.21953 16.6945C6.12431 18.0446 7.45126 19.0658 8.99832 19.6027C10.5454 20.1395 12.2278 20.1626 13.7894 19.6684C15.351 19.1743 16.7062 18.1899 17.6486 16.8652C18.4937 15.6773 18.9654 14.2742 19.0113 12.8307C19.0201 12.5545 19.2341 12.3223 19.5103 12.3125L21.4799 12.2424Z"
                      fill="#31BAF1"
                    />
                    <path
                      d="M20.0941 18.5594C21.3117 16.848 21.9736 14.8163 21.9993 12.7329C22.0027 12.4569 21.7699 12.2413 21.4941 12.2512L19.5244 12.3213C19.2482 12.3311 19.0342 12.5633 19.0254 12.8395C18.9796 14.283 18.5078 15.6861 17.6628 16.8739C16.7203 18.1986 15.3651 19.183 13.8035 19.6772C12.2419 20.1714 10.5595 20.1483 9.01246 19.6114C7.4654 19.0746 6.13845 18.0534 5.23367 16.7033C4.66562 15.8557 4.28352 14.9076 4.10367 13.9196C4.00935 18.0934 6.49194 21.37 10.008 22.6416C10.697 22.8908 11.4336 22.9852 12.1652 22.9465C13.075 22.8983 13.8508 22.742 14.7105 22.4699C16.8889 21.7805 18.7794 20.4073 20.0941 18.5594Z"
                      fill="#0169CA"
                    />
                  </svg>
                </div>
              </OverlayTrigger>
            </label>
          </div>
        </div>
      </div>
      <Collapse in={open}>
      <div>
          <div className="form-group d-flex justify-content-between align-items-center">
            <label htmlFor="custom-primary-color">Primary</label>
            <input
              name="theme_color"
              data-extra="primary"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}primary": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-primary-color"
              value={
                colorValue.colors["--{{prefix}}primary"]
                  ? colorValue.colors["--{{prefix}}primary"]
                  : "#7093e5"
              }
            />
          </div>
          <div className="form-group d-flex d-flex justify-content-between align-items-center">
            <label htmlFor="custom-secondary-color">Secondary</label>
            <input
              name="theme_color"
              data-extra="secondary"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}secondary": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-secondary-color"
              value={
                colorValue.colors["--{{prefix}}secondary"]
                  ? colorValue.colors["--{{prefix}}secondary"]
                  : "#f68685"
              }
            />
          </div>
          <div className="form-group d-flex d-flex justify-content-between align-items-center">
            <label htmlFor="custom-success-color">Success</label>
            <input
              name="theme_color"
              data-extra="success"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}success": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-success-color"
              value={
                colorValue.colors["--{{prefix}}success"]
                  ? colorValue.colors["--{{prefix}}success"]
                  : "#219653"
              }
            />
          </div>
          <div className="form-group d-flex d-flex justify-content-between align-items-center">
            <label htmlFor="custom-danger-color">Danger</label>
            <input
              name="theme_color"
              data-extra="danger"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}danger": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-danger-color"
              value={
                colorValue.colors["--{{prefix}}danger"]
                  ? colorValue.colors["--{{prefix}}danger"]
                  : "#eb5757"
              }
            />
          </div>
          <div className="form-group d-flex d-flex justify-content-between align-items-center">
            <label htmlFor="custom-warning-color">Warning</label>
            <input
              name="theme_color"
              data-extra="warning"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}warning": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-warning-color"
              value={
                colorValue.colors["--{{prefix}}warning"]
                  ? colorValue.colors["--{{prefix}}warning"]
                  : "#f16a1b"
              }
            />
          </div>
          <div className="form-group d-flex d-flex justify-content-between align-items-center">
            <label htmlFor="custom-info-color">Info</label>
            <input
              name="theme_color"
              data-extra="info"
              onInput={(e) =>
                colorChange(
                  "custom",
                  { "--{{prefix}}info": e.target.value },
                  true
                )
              }
              type="color"
              id="custom-info-color"
              value={
                colorValue.colors["--{{prefix}}info"]
                  ? colorValue.colors["--{{prefix}}info"]
                  : "#08B1BA"
              }
            />
          </div>
        </div>
      </Collapse>
      <div className="grid-cols-5 mb-4 d-grid gap-3">
        <OverlayTrigger placement="top" overlay={<Tooltip>Tema-1</Tooltip>}>
          <div>
            <input
              type="radio"
              defaultValue="color-1"
              className="btn-check"
              name="theme_color"
              id="theme-color-1"
              onClick={() =>
                colorChange("color-1", {
                  "--{{prefix}}info": "#573BFF",
                  "--{{prefix}}primary": "#00C3F9",
                })
              }
              defaultChecked={colorValue.value === "color-1"}
            />
            <label
              className={`btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-1"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                {" "}
                <circle cx="12" cy="12" r="10" fill="#304297" />{" "}
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#ff6b3b" />
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tema-2</Tooltip>}>
          <div>
            <input
              type="radio"
              defaultValue="color-2"
              className="btn-check"
              name="theme_color"
              id="theme-color-2"
              onClick={() =>
                colorChange("color-2", {
                  "--{{prefix}}info": "#FD8D00",
                  "--{{prefix}}primary": "#91969E",
                })
              }
              defaultChecked={colorValue.value === "color-2"}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-2"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                {" "}
                <circle cx="12" cy="12" r="10" fill="#e63946" />{" "}
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#1d3557" />
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tema-3</Tooltip>}>
          <div>
            <input
              type="radio"
              defaultValue="color-3"
              className="btn-check"
              name="theme_color"
              id="theme-color-3"
              onClick={() => {
                colorChange("color-3", {
                  "--{{prefix}}info": "#366AF0",
                  "--{{prefix}}primary": "#DB5363",
                });
              }}
              defaultChecked={colorValue.value === "color-3"}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-3"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-3"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                {" "}
                <circle cx="12" cy="12" r="10" fill="#d45ba1" />{" "}
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#5d81cb" />
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tema-4</Tooltip>}>
          <div>
            <input
              type="radio"
              defaultValue="color-4"
              className="btn-check"
              name="theme_color"
              id="theme-color-4"
              onClick={() => {
                colorChange("color-4", {
                  "--{{prefix}}info": "#6410F1",
                  "--{{prefix}}primary": "#EA6A12",
                });
              }}
              defaultChecked={colorValue.value === "color-4"}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-4"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-4"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                {" "}
                <circle cx="12" cy="12" r="10" fill="#00b0d1" />{" "}
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#4181b3" />
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tema-5</Tooltip>}>
          <div>
            <input
              type="radio"
              defaultValue="color-5"
              className="btn-check"
              name="theme_color"
              id="theme-color-5"
              onClick={() => {
                colorChange("color-5", {
                  "--{{prefix}}info": "#25C799",
                  "--{{prefix}}primary": "#E586B3",
                });
              }}
              defaultChecked={colorValue.value === "color-5"}
            />
            <label
              className={`btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-5"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-5"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                {" "}
                <circle cx="12" cy="12" r="10" fill="#4181b3" />{" "}
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#A42E51" />
              </svg>
            </label>
          </div>
        </OverlayTrigger>
      </div>
    </Fragment>
  );
});

ColorCustomizer.displayName = "ColorCustomizer";
export default ColorCustomizer;
