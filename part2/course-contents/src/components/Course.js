import React from "react";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map(part => {
                return (
                  <li key={part.id}>
                    {part.name} / {part.exercises} exercises
                  </li>
                );
              })}
            </ul>
            <h4>
              Total of{" "}
              {course.parts.reduce((acc, part) => {
                return acc + part.exercises;
              }, 0)}{" "}
              exercises
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
