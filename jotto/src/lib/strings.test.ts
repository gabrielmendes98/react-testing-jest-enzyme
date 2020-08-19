import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const strings = {
  en: {
    submit: 'submit',
  },
  pt: {
    submit: 'enviar',
  },
  mermish: {},
};

test('returns correct submit string for english', () => {
  const string = getStringByLanguage('en', 'submit', strings);
  expect(string).toBe('submit');
});

test('returns correct submit string for portuguese', () => {
  const string = getStringByLanguage('pt', 'submit', strings);
  expect(string).toBe('enviar');
});

test('returns english submit string when language does not exists', () => {
  const string = getStringByLanguage('notALanguage', 'submit', strings);
  expect(string).toBe('submit');
});

test('returns english submit string when submit key does not exist for language', () => {
  const string = getStringByLanguage('mermish', 'submit', strings);
  expect(string).toBe('submit');
});
