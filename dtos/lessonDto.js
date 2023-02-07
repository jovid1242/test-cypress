module.exports = class CourseDto {
    id;
    name;
    course_id;
  
    constructor(model) {
      this.id = model.id;
      this.name = model.name;
      this.course_id = model.course_id;
    }
  };
  