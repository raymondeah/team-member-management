import { createSlice } from "@reduxjs/toolkit";

   
const membersSlice = createSlice({
    name: 'members',
    initialState: [],
    reducers: {
        addMember(state, action) {
            state.push(action.payload)
        },
        deleteMember(state, action) {
            const index = state.findIndex(m => m._id === action.payload);
            state.splice(index, 1);
        }, 
        updateMember(state, action) {
            const memberIndex = state.findIndex(m => m._id === action.payload._id);
            console.log(memberIndex)
            state[memberIndex] = action.payload;
        }
    }
});

export const { addMember, deleteMember, updateMember } = membersSlice.actions;
export default membersSlice.reducer;

