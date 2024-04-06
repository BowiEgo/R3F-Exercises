import { eventbus } from '../eventBus';

export const mapEventChannel = eventbus<{
	showBaseKeyboard_A: () => void;
	queuingSwitches_A: () => void;
	showKeycaps_A: () => void;
	showTopCase_A: () => void;
	expandKeyboard_A: () => void;
	assembleKeyboard_A: () => void;
}>();
