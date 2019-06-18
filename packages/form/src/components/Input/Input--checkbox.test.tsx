import { mountForm } from 'src/utils/utils';

describe('Checkbox', () => {
  const field = {
    inputType: 'checkbox',
    name: 'gender',
    label: 'Is Male?',
    defaultChecked: true,
    placeholder: '',
  };

  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`input[name="${field.name}"]`);

  it('has the correct name attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      name: field.name,
      // name: 123,
    });
  });

  it('has a default value', () => {
    expect(inputWrapper.props()).toMatchObject({
      checked: field.defaultChecked,
    });
  });
});
