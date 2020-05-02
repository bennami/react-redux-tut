import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import {beginApiCall,apiCallError} from "./apiStatusActions";

//action creators
export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}
export function  createCoursesSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course}
}
export function updateCoursesSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course}

}

//thunks
export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
                dispatch(loadCourseSuccess(courses));
            }).catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
            course.id
                ? dispatch(updateCoursesSuccess(savedCourse))
                : dispatch(createCoursesSuccess(savedCourse))

            })
            .catch(error => {
                dispatch(apiCallError(error));
            throw error;
        });
    };
}

