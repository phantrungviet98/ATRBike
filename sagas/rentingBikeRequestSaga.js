import { takeEvery } from "redux-saga/effects";
import {RENTING_BIKE_REQUEST} from '../actions/actionTypes'
import {rentingBikeSuccess, rentingBikeFailure} from '../actions/'

const handleRentingBikeRequestSaga = function* handleRentingBikeRequestSaga(params) {
    yield takeEvery(RENTING_BIKE_REQUEST, (lockID) => {
        fetch('http://api.appebike.com:4000/v1/shared/transactions/renting', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiYXRyYmlrZSIsInNlc3Npb25JZCI6IjVjZWYzZjMyZDk1ZDk1NTFiY2RiNGMxOCIsImlhdCI6MTU1OTE4MzE1NCwiZXhwIjoxNTU5MjY5NTU0fQ.6a_2rgn7F9BygmMAU7GR7ArYhlRGUyKeTBue8h9yo1o',
                'app-id': 'c0c45117-7aa5b-4169-b1fc-06178cdef31a',
                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
            },
            body: JSON.stringify({
                "lockId": lockID
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('message' in responseJson){
                    alert(JSON.stringify(responseJson.message))
                } else {

                    alert('Success')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        rentingBikeSuccess: (lockID) => dispatch(rentingBikeSuccess),
        rentingBikeFailure: (err) => dispatch(rentingBikeFailure)
    }
}
