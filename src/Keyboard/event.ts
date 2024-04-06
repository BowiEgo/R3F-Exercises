import { eventbus } from '../eventBus';

export const mapEventChannel = eventbus<{
	queuingSwitches_A: (forward: boolean) => void;
	showTopCase_A: (forward: boolean) => void;
	expandKeyboard_A: (forward: boolean) => void;
}>();
