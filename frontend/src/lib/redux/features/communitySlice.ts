import { createSlice } from '@reduxjs/toolkit'

interface CommunityState {
  isModalOpen: boolean
}

const initialState: CommunityState = {
  isModalOpen: false
}

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    openCommunityModal: (state) => {
      state.isModalOpen = true
    },
    closeCommunityModal: (state) => {
      state.isModalOpen = false
    }
  }
})

export const { openCommunityModal, closeCommunityModal } = communitySlice.actions
export default communitySlice.reducer 