import axios from 'axios';

const GOT_SINGLE_EMPLOYEE = 'GOT_SINGLE_EMPLOYEE';

export const gotSingleEmployee = (employee)=>({
    type: GOT_SINGLE_EMPLOYEE,
    employee,
})

export const fetchSingleEmployee = (id) => {
    console.log('In fetch single employee with id: ', id)
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/employees/id/${id}`);
            const employee = res.data;
            dispatch(gotSingleEmployee(employee));
        } catch (error) {
            console.log(`Error fetching single employee with id ${id}. ${error}`)
        }
    }
}

export default function employeeReducer(state={},action){
    switch(action.type){
        case GOT_SINGLE_EMPLOYEE:
            return action.employee;
        default:
            return state;
    }
}