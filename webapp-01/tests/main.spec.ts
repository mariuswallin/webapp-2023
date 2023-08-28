import { describe, expect, test, beforeEach, beforeAll, afterEach } from 'vitest';

import { fireEvent, getAllByText, getByText, queryByText } from '@testing-library/dom';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const script = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');

let dom;
let container;
let next;
let prev;
let send;
let name;
let age;
let email;

const student = {
  name: '',
  age: '',
  email: 'email@email.no',
};

const carl = {
  name: 'Simen Simense',
  age: '25',
  email: 'email@email.no',
  profession: 'Doctor',
};

const teacher = {
  name: 'Truder Hansen',
  profession: '',
};

const differentStudent = {
  name: '',
  age: 0,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
  ],
  email: 'email@email.no',
};

const differentStudentTwo = {
  name: '',
  age: 0,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      student: '',
    },
  ],
};

const differentStudentThree = {
  name: '',
  age: 0,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      student: '',
    },
  ],
  exams: [],
};

const differentStudentFour = {
  name: '',
  age: -1,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      student: '',
    },
  ],
  exams: [],
};

const differentStudentFive = {
  name: '',
  age: 5,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      students: [],
    },
  ],
  exams: [],
};

const differentStudentSix = {
  name: 'Lars',
  age: 5,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
    { id: 'streng', name: 'Nu E' },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      students: [],
    },
  ],
  exams: [],
};

const students = [{ ...student }, { ...student }];

const studentsObj = {
  students,
  student,
};

const classes = [studentsObj, studentsObj];
const school = [classes, classes, teacher];
const classesWithLists = [[classes, classes], classes, teacher];
const classesWithEmptyLists = [[], classes, teacher];

const differentStudentSeven = {
  name: 'Lars',
  age: 5,
  lectures: [
    { id: '1', subject: '' },
    { id: '2', subject: null },
    { id: '3', subject: undefined },
    { id: 'streng', name: 'Nu E' },
  ],
  email: 'email@email.no',
  grades: {
    math: {
      id: 1,
      grade: null,
    },
  },
  friends: [
    {
      id: '1',
      students: [],
    },
  ],
  exams: {},
  classesWithEmptyLists,
  classes,
  student,
  teacher,
  classesWithLists,
  studentsObj,
  carl,
  food: {
    burgers: {},
  },
};

const findEmptyFields = (items) => {
  let iterations = 0;
  const emptyFields = [];
  const inner = (items) => {
    if (!items || !(Array.isArray(items) || typeof items === 'object') || items === null || items === undefined) {
      return;
    }
    const nested = Object.values(items)
      .flatMap((item) => {
        if (Array.isArray(item)) {
          return item;
        }
      })
      .filter(Boolean);
    if (Array.isArray(items)) {
      items.forEach((item) => inner(item));
    } else if (nested.length > 0) {
      Object.entries(items).forEach(([key, value]) => {
        if (value === null || value === undefined || value?.length === 0) {
          emptyFields.push(key);
        } else {
          inner(value);
        }
      });
    } else {
      Object.entries(items).forEach(([key, val]) => {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          inner(val);
        } else if (!val || val === null || val === undefined || val?.length === 0) {
          emptyFields.push(key);
        }
      });
    }
    iterations = iterations + 1;
  };
  inner(items);
  return [iterations, emptyFields];
};

const validateFields = (items, validator) => {
  let iterations = 0;
  const invalidFields = [];
  const validate = (items) => {
    if (typeof items !== 'object') {
      return;
    }
    if (Array.isArray(items)) {
      items.forEach((item) => validate(item));
    } else {
      items &&
        Object.entries(items)?.forEach(([key, value]) => {
          if (validator(key, value)) {
            invalidFields.push(key);
          } else {
            validate(value);
          }
        });
    }
    iterations = iterations + 1;
  };
  validate(items);
  return [iterations, invalidFields];
};

describe('Empty field test', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { resources: 'usable', runScripts: 'dangerously' });
    const scriptEl = dom.window.document.createElement('script');
    scriptEl.textContent = script;
    dom.window.document.body.appendChild(scriptEl);
    container = dom.window.document.body;
  });

  test('Should work', () => {
    expect(true).toBe(true);
  });

  test('Should find empty fields in object', () => {
    const empty = Object.values(student).filter((val) => val?.length === 0);
    expect(empty).toHaveLength(2);
  });

  test('Should find empty fields in list', () => {
    const emptyFields = [];
    const empty = students.forEach((student) =>
      Object.values(student).forEach((val) => {
        if (val?.length === 0) {
          emptyFields.push(val);
        }
      }),
    );
    expect(emptyFields).toHaveLength(4);
  });
  test('Should find empty fields in object with lists', () => {
    const emptyFields = [];
    const empty = Object.values(studentsObj).forEach((student) => {
      if (Array.isArray(student)) {
        student.forEach((s) =>
          Object.values(s).forEach((val) => {
            if (val?.length === 0) {
              emptyFields.push(val);
            }
          }),
        );
      } else {
        Object.values(student).forEach((val) => {
          if (val?.length === 0) {
            emptyFields.push(val);
          }
        });
      }
    });
    expect(emptyFields).toHaveLength(6);
  });
  test('Should find empty fields in list with lists with objects using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(classes);
    expect(emptyFields).toHaveLength(12);
    // console.log(iterations);
  });
  test('Should find empty fields in list with lists, with lists with objects using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(school);
    expect(emptyFields).toHaveLength(25);
    // console.log(iterations);
  });
  test('Should find empty fields in object using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(student);
    expect(emptyFields).toHaveLength(2);
    // console.log(iterations);
  });
  test('Should find empty fields in list using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(students);
    expect(emptyFields).toHaveLength(4);
    // console.log(iterations);
  });
  test('Should find empty fields in object with list algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(studentsObj);
    expect(emptyFields).toHaveLength(6);
    // console.log(iterations);
  });
  test('Should find empty fields in complex lists using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(classesWithLists);
    expect(emptyFields).toHaveLength(37);
    // console.log(iterations);
  });
  test('Should find empty fields in complex lists using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(classesWithEmptyLists);
    expect(emptyFields).toHaveLength(13);
    // console.log(iterations);
  });
  test('Should find empty fields in object with nested objects with different values using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(differentStudentTwo);
    expect(emptyFields).toHaveLength(6);
    // console.log(iterations);
  });
  test('Should find empty fields in object with empty lists using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(differentStudentThree);
    expect(emptyFields).toHaveLength(7);
    // console.log(iterations);
  });
  test('Should find empty fields in object with negative values using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(differentStudentFour);
    expect(emptyFields).toHaveLength(7);
    // console.log(iterations);
  });
  test('Should find empty fields in object with objects with empty lists using algorithm', () => {
    const [iterations, emptyFields] = findEmptyFields(differentStudentFive);
    expect(emptyFields).toHaveLength(7);
    // console.log(iterations);
  });

  test('Should find invalid fields in object with objects with empty lists using algorithm with validation', () => {
    const fieldIsValid = (key, value) => {
      if (!value || value === null || value === undefined || value?.length === 0) return true;
      switch (key) {
        case 'age':
          return value < 10;
        default:
          return false;
      }
    };
    const [iterations, invalidFields] = validateFields(differentStudentFive, fieldIsValid);
    expect(invalidFields).toHaveLength(8);
    // console.log(iterations);
  });
  test('Should find invalid fields in object with objects with empty lists using algorithm with validation', () => {
    const inValidField = (key, value) => {
      if (!value || value === null || value === undefined || value?.length === 0) return true;
      switch (key) {
        case 'age':
          return value < 10;
        case 'name':
          return value.length < 5 || value.split(' ').length < 2;
        case 'id':
          return isNaN(value);
        default:
          return false;
      }
    };
    const [iterations, invalidFields] = validateFields(differentStudentSix, inValidField);
    expect(invalidFields).toHaveLength(10);
    // console.log(iterations);
  });
  test('Should find empty fields in object with objects with empty lists using algorithm with validation', () => {
    /* TODO: Excluded fields or use object on field properties validation: {
      required: true, 
      length: 5
    }
    */
    const inValidField = (key, value) => {
      if (
        !value ||
        value === null ||
        value === undefined ||
        value?.length === 0 ||
        (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length === 0)
      )
        return true;
      // Empty Object

      // Empty array

      // Field in required
      switch (key) {
        case 'age':
          return value < 10;
        case 'name':
          return value.length < 5 || value.split(' ').length < 2;
        case 'id':
          return isNaN(value);
        case 'profession':
          return value.toLowerCase() !== 'teacher';
        default:
          return false;
      }
    };
    const [iterations, invalidFields] = validateFields(differentStudentSeven, inValidField);
    expect(invalidFields).toHaveLength(10 + 13 + 12 + 3 + 37 + 6 + 1 + 1);
    // console.log(iterations);
  });

  test('Should find empty fields in object with objects with empty lists using algorithm with validation', () => {
    /* TODO: Excluded fields or use object on field properties validation: {
      required: true, 
      length: 5
    }
    */
    const inValidField = (key, value) => {
      const requiredFields = ['grade'];

      const emptyField = !value || value === null || value === undefined;

      // Empty object
      if (!emptyField && !Array.isArray(value) && typeof value === 'object' && Object.keys(value)?.length === 0)
        return true;

      // Empty array
      if (!emptyField && Array.isArray(value) && value?.length === 0) return true;

      // Field is required
      if (requiredFields.includes(key) && emptyField) {
        return true;
      }

      switch (key) {
        case 'age':
          return value < 10;
        case 'name':
          return value.length < 5 || value.split(' ').length < 2;
        default:
          return false;
      }
    };

    const [iterations, invalidFields] = validateFields(differentStudentFive, inValidField);
  
    expect(invalidFields).toHaveLength(5);
    // console.log(iterations);
  });
});
