import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    stocks:[]
}


const stocksSlice = createSlice({
    name:"stocks",
    initialState,
    reducers:{
        setStocks(state,action){
            state.stocks = action.payload;
        }
    }
})

export const {setStocks} = stocksSlice.actions;
export default stocksSlice.reducer;