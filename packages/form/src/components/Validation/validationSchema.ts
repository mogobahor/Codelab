import { get, forIn } from 'lodash';
import * as Yup from 'yup';

export const validationSchema = fields => {
  const schemaShape = fields.reduce((acc, field) => {
    // const { type } = field;
    const type = get(field, 'type', 'string');
    const fieldValidation = get(field, 'validation', []);
    let validation = {};

    switch (type) {
      case 'number':
        validation = Yup.number();
        break;
      case 'string':
        validation = Yup.string();

        fieldValidation.forEach(validator => {
          const message = get(validator, 'msg');

          forIn(validator, (value, key) => {
            switch (key) {
              case 'required': {
                validation = validation[key](message);
                break;
              }
              // Ignores the 'msg' key
              case 'msg': {
                break;
              }
              default: {
                validation = validation[key](value, message);
                break;
              }
            }
          });
        });
        break;
      default:
        validation = Yup.mixed();
        break;
    }

    return Object.assign(acc, { [field.name as any]: validation });
  }, {});

  return Yup.object().shape(schemaShape);
};
