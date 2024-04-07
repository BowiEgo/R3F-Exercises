import { eventbus } from '../eventBus';

export const EventChannel = eventbus<{
	cameraMotion_A: (forward: boolean) => void;
	queuingSwitches_A: (forward: boolean) => void;
	showTopCase_A: (forward: boolean) => void;
	expandKeyboard_A: (forward: boolean) => void;
}>();
