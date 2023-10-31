import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

const UserSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        addUser: (state, action) => {
            console.log(' Action Add', action)
            state.push(action.payload)
        },
        updateUser: (state, action) => {
            console.log('Action Update', action)
            const {id, name, email} = action.payload;
            const uu = state.find(user => user.id == id);
            if(uu){
                uu.name = name;
                uu.email = email;
            }
        },
        deleteUser: (state, action) =>{
            const {id} = action.payload;
            const uu = state.find(user => user.id == id);
            if(uu){
               return state.filter (f => f.id !== id);
            }
        }

    }
})
export const {addUser,updateUser,deleteUser} = UserSlice.actions;
export default UserSlice.reducer;