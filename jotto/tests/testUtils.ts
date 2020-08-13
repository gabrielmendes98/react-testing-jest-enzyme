import { ShallowWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => wrapper.find(`[data-test="${val}"]`);
