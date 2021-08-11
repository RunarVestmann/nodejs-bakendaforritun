interface CourseEntity {
    _id: string;
    name: string;
    teachers: string[];
    teachingAssistants: string[];
    description: string;
    students: string[];
    startDate: string;
    endDate: string;
}

interface CourseDTO {
    _id: string;
    name: string;
    teachers: Teacher[];
    teachingAssistants: Teacher[];
    description: string;
    students: Student[];
    startDate: string;
    endDate: string;
}
