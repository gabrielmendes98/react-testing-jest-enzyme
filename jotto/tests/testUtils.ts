import { ShallowWrapper, ReactWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ShallowWrapper | ReactWrapper, val: string) =>
  wrapper.find(`[data-test="${val}"]`);
