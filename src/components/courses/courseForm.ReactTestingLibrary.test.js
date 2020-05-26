import React from "react";
import {cleanup, render} from "react-testing-library";
import CourseForm from "./CourseForm";
import {authors, courses} from "../../../tools/mockData";

afterEach(cleanup);

function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {
        },
        onChange: () => {
        }
    };
    const props = {...defaultProps, ...args};
    return render(<CourseForm {...props}/>);
}

it('should render Add Course header ', function () {
    const {getByText} = renderCourseForm();
    getByText("Add Course");
});
it('should label save button as "save" when not saving', function () {
    const {getByText} = renderCourseForm();
    getByText("Save");
});

it('should label save button as "saving..." when saving', function () {
    const {getByText, debug} = renderCourseForm({saving: true});
    //debug();
    getByText("Saving...");
});

