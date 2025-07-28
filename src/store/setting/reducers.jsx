import { createSlice } from "@reduxjs/toolkit";
import { initialState, defaultState } from "./state";
import {
  updateThemeScheme,
  updateBodyClass,
  updateHtmlClass,
  updateHtmlAttr,
  updateTitle,
  updateColorRootVar,
  updateDomValueBySetting,
  getStorage,
} from "../../utilities/setting";
import { setFontFamily } from "../../utilities/root-var";
import _ from "lodash";

const DefaultSetting = defaultState.setting;

const Choices = {
  SchemeChoice: DefaultSetting.theme_scheme.choices,
  ColorChoice: DefaultSetting.theme_color.choices,
  StyleAppearanceChoice: DefaultSetting.theme_style_appearance.choices,
  CardStyle: DefaultSetting.card_style.choices,
  FSChoice: DefaultSetting.theme_font_size.choices,
  Animation: DefaultSetting.theme_transition.choices,
};

const createSettingObj = (state) => ({
  saveLocal: state.saveLocal,
  storeKey: state.storeKey,
  setting: _.cloneDeep(state.setting),
});

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    ...initialState,
    initDone: false, // opsiyonel, istersen ekle
  },
  reducers: {
    setSetting: (state, action) => {
      const json = getStorage(state.storeKey);
      if (json === "none") state.saveLocal = "none";
      if (json !== null && json !== "none") {
        state.saveLocal = json.saveLocal;
        state.setting = json.setting;
      }
      updateDomValueBySetting(state.setting, Choices);
    },

    setInitDone: (state) => {
      state.initDone = true;
    },

    reset_state: (state) => {
      state.setting = defaultState.setting;
      updateDomValueBySetting(state.setting, Choices);
    },

    saveLocal: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.saveLocal = action.payload;
      }
    },

    app_name: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.app_name.value = action.payload;
      }
      updateTitle(state.setting.app_name.value);
    },

    theme_scheme_direction: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.theme_scheme_direction.value = action.payload;
      }
      updateHtmlAttr({
        prop: "dir",
        value: state.setting.theme_scheme_direction.value,
      });
    },

    theme_scheme: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.theme_scheme.value = action.payload;
      }
      updateHtmlAttr({
        prop: "data-bs-theme",
        value: state.setting.theme_scheme.value,
      });
      updateThemeScheme(
        state.setting.theme_scheme.value,
        Choices,
        state.setting.theme_color
      );

    },

    theme_style_appearance: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.theme_style_appearance.value = action.payload;
      }
      updateBodyClass(
        Choices.StyleAppearanceChoice,
        state.setting.theme_style_appearance.value
      );
    },

    theme_color: (state, action) => {
      if (typeof action.payload !== "undefined") {
        _.forEach(action.payload.colors, (value, key) => {
          state.setting.theme_color.colors[key] = value;
        });
        state.setting.theme_color.value = action.payload.value;
      }
      updateHtmlAttr({
        prop: "data-bs-theme-color",
        value: state.setting.theme_color.value,
      });
      updateColorRootVar(
        state.setting.theme_scheme.value,
        state.setting.theme_color,
        Choices.ColorChoice
      );
    },

    theme_transition: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.theme_transition.value = action.payload;
      }
      updateBodyClass(Choices.Animation, state.setting.theme_transition.value);
    },

    theme_font_size: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.theme_font_size.value = action.payload;
      }
      updateHtmlClass(Choices.FSChoice, state.setting.theme_font_size.value);
    },

    page_layout: (state, action) => {
      state.setting.page_layout.value = action.payload;
    },

    header_navbar: (state, action) => {
      state.setting.header_navbar.value = action.payload;
    },

    card_style: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.card_style.value = action.payload;
      }
      updateBodyClass(Choices.CardStyle, state.setting.card_style.value);
    },

    header_banner: (state, action) => {
      state.setting.header_banner.value = action.payload;
    },

    sidebar_color: (state, action) => {
      state.setting.sidebar_color.value = action.payload;
    },

    sidebar_type: (state, action) => {
      state.setting.sidebar_type.value = action.payload;
    },

    sidebar_show: (state, action) => {
      state.setting.sidebar_show.value = action.payload;
    },

    navbar_show: (state, action) => {
      state.setting.navbar_show.value = action.payload;
    },

    sidebar_menu_style: (state, action) => {
      state.setting.sidebar_menu_style.value = action.payload;
    },

    footer: (state, action) => {
      state.setting.footer.value = action.payload;
    },

    body_font_family: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.body_font_family.value = action.payload;
      }
      setFontFamily("body", state.setting.body_font_family.value);
    },

    heading_font_family: (state, action) => {
      if (typeof action.payload !== "undefined") {
        state.setting.heading_font_family.value = action.payload;
      }
      setFontFamily("heading", state.setting.heading_font_family.value);
    },
  },
});

export default settingSlice.reducer;
