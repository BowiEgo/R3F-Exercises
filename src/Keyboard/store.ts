import { StateCreator, create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Phase {
	phase: number;
	nextPhase: () => void;
	prevPhase: () => void;
	setPhase: (value: number) => void;
}

interface Scroll {
	progress: number;
	setProgress: (value: number) => void;
}

const createPhase: StateCreator<Phase> = (set, _get) => ({
	phase: 0,
	nextPhase: () =>
		set((state) => {
			if (state.phase < 3) return { phase: state.phase + 1 };
			return {};
		}),
	prevPhase: () =>
		set((state) => {
			if (state.phase > 0) return { phase: state.phase - 1 };
			return {};
		}),
	setPhase: (value: number) =>
		set((state) => {
			if (value >= 0 || value <= 3) {
				if (state.phase !== value) {
					return { phase: value };
				}
			}
			return {};
		}),
});

const createProgress: StateCreator<Scroll> = (set, _get) => ({
	progress: 0,
	setProgress: (value: number) =>
		set((state) => {
			if (value >= 0 || value <= 1) {
				if (state.progress !== value) {
					return { progress: value };
				}
			}
			return {};
		}),
});

const useStore = create<Phase & Scroll>()(
	subscribeWithSelector((...a) => ({
		...createPhase(...a),
		...createProgress(...a),
	}))
);

export default useStore;
