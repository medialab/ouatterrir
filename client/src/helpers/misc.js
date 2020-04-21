import {v4 as genId} from 'uuid';
/**
 * Gets data from local storage or return default value
 * @param {*} key 
 * @param {*} defaults 
 */
export const getOrInitObject = (key, defaults = {}) => {
  let initialData = localStorage.getItem(key);
  if (initialData && typeof initialData === 'string') {
    try {
      initialData = JSON.parse(initialData)
    } catch(e) {
      initialData = defaults;
    }
  } else if (initialData) {
    return initialData;
  } else {
    initialData = defaults;
  }
  return initialData;
}

export const createProposition = (type, questions) => {
  const id = genId();
  const numberOfQuestions = questions[type].length;
  return {
    type,
    id,
    ...Array.from(Array(numberOfQuestions).keys())
    .reduce((res, index) => ({
      ...res,
      [`question${index + 1}`]: ''
    }), {})
  }
};

/**
 * Remove propositions for which all fields are empty
 * @param {obj} data 
 */
export const cleanData = data => {
  return {
    ...data,
    propositions: data.propositions.filter(proposition => {
      const nonEmptyField = Object.keys(proposition)
      .find((key) => {
        if (key.indexOf('question') === 0) {
          return proposition[key].length > 0
        }
        return false;
      })
      return nonEmptyField !== undefined
    })
  }
}