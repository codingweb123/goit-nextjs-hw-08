import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface NewNoteData {
	title: string
	content: string
	tag: string
}

interface NoteDraftStore {
	draft: NewNoteData
	setDraft: (note: NewNoteData) => void
	clearDraft: () => void
}

const initialDraft: NewNoteData = {
	title: "",
	content: "",
	tag: "",
}

export const useNoteDraftStore = create<NoteDraftStore>()(
	persist(
		set => ({
			draft: initialDraft,
			setDraft: note => set(() => ({ draft: note })),
			clearDraft: () => set(() => ({ draft: initialDraft })),
		}),
		{
			name: "note-draft",
			partialize: state => ({ draft: state.draft }),
		}
	)
)
