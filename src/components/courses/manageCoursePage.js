import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {loadCourses, saveCourse}from '../../redux/actions/courseActions'
import {loadAuthors} from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from "./CourseForm";
import {newCourse} from '../../../tools/mockData';
import Spinner from "../common/spinner"
import {toast} from "react-toastify"

//to avoid having two variables called course we use ...props to put anything that hasnt been destructured in the props
//you could also alias course to another name
function ManageCoursePage ({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props}){

    const [course, setCourse] = useState({...props,course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);


    //loads courses and authors on load
    useEffect( ()=>{
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }else {
               setCourse({ ...props.course });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
     },[props.course]);

    function handleChange(event){
        const{name, value} = event.target;
        setCourse(prevCourse =>({
        ...prevCourse,
        [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }
function formIsValid(){
const{title,authorId,category} =course;
const errors ={};
if(!title) errors.title = "title is required";
if(!authorId) errors.title = "authorId is required";
if(!category) errors.title = "category is required";
setErrors(errors);
return Object.keys(errors).length === 0;

}
    function handleSave(e){
        e.preventDefault();
        if(!formIsValid())return
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('course saved');
            history.push("/courses")
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }
    return (
    authors.length === 0 || courses.length === 0
    ?(<Spinner/>)
    :(
      <CourseForm
             course={course}
             errors={errors}
             authors={authors}
             onChange={handleChange}
             onSave={handleSave}
             saving={saving}
             />
    )

    );

}

    ManageCoursePage.propTypes = {
        course: PropTypes.object.isRequired,
        authors: PropTypes.array.isRequired,
        courses: PropTypes.array.isRequired,
        loadCourses: PropTypes.func.isRequired,
        loadAuthors: PropTypes.func.isRequired,
        saveCourse: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

    export function getCoursesBySlug(courses, slug){
    return courses.find(course => course.slug === slug || null,
    )}

    //redux mapping function (converted to an object now) that determine what we want to access
    function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;

    //condition so it knows to wait until async is finished, otherwise it will throw an error
    const course = slug && state.courses.length > 0
        ? getCoursesBySlug(state.courses, slug)
        : newCourse;
        return {
            course,
            courses: state.courses,
            authors: state.authors,

        };
    }

    const mapDispatchToProps = {
            loadCourses: loadCourses,
            loadAuthors: loadAuthors,
            saveCourse: saveCourse
    };

    //call to connect to redux
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(ManageCoursePage);
