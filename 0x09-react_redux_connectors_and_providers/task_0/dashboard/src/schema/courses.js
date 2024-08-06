const { schema, normalize } = require('normalizr');

const courseSchema = new schema.Entity('courses');
export const coursesNormalizer = (data) => normalize(data, [courseSchema]);
