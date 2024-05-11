import {createSlice} from "@reduxjs/toolkit";

export const UISlice = createSlice({
    name: 'UISlice',
    initialState: {
        showModal: false,
        opcode: null,
        courseCode: null
    },
    reducers: {
        showModal: (state, action) => {
            state.showModal = true;
        },
        hideModal: (state) => {
            state.showModal = false;
            state.opcode = null;
            state.courseCode = null;
        },
        setOpcode: (state, action) => {
            state.opcode = action.payload;
        },
        setCourseCode: (state, action) => {
            state.courseCode = action.payload;
        }
    }
});


export const UIActions = UISlice.actions;