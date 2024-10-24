import { getTheme, setTheme  } from 'utils/themeHelper';
import {
	CHANGE_COLOR_THEME,
	TOGGLE_CHART_REBUILD,
	TOGGLE_MARKET_SELECTOR,
	TOGGLE_MOBILE_DEVICE,
	TOGGLE_SIDEBAR,
} from './constants';

export interface ColorThemeState {
	color: 'light' | 'dark';
	chartRebuild: boolean;
	marketSelectorActive: boolean;
	isMobileDevice: boolean;
	sideBarActive: boolean;
}

const currentColorTheme: 'light' | 'dark' = getTheme()

export const initialChangeColorThemeState: ColorThemeState = {
	color: currentColorTheme,
	chartRebuild: false,
	marketSelectorActive: false,
	isMobileDevice: false,
	sideBarActive: false,
};

export const changeColorThemeReducer = (state = initialChangeColorThemeState, action : any ) => {
	switch (action.type) {
		case CHANGE_COLOR_THEME:
			setTheme(action.payload)

			return {
				...state,
				color: action.payload,
			};
		case TOGGLE_CHART_REBUILD:
			return {
				...state,
				chartRebuild: !state.chartRebuild,
			};
		case TOGGLE_MARKET_SELECTOR:
			return {
				...state,
				marketSelectorActive: !state.marketSelectorActive,
				sideBarActive: false,
			};
		case TOGGLE_MOBILE_DEVICE:
			return {
				...state,
				isMobileDevice: action.payload,
			};
		case TOGGLE_SIDEBAR:
			return {
				...state,
				sideBarActive: action.payload,
				marketSelectorActive: false,
			};
		default:
			return state;
	}
};
