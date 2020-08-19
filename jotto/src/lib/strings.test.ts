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

describe('language string testing', () => {
  const mockWarn = jest.fn();
  let originalWarn: any;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test('returns correct submit string for portuguese', () => {
    const string = getStringByLanguage('pt', 'submit', strings);
    expect(string).toBe('enviar');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test('returns english submit string when language does not exists', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [notALanguage]');
  });

  test('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [mermish]');
  });
});
