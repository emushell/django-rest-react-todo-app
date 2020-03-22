import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('<Layout />', () => {

    it('renders an .container', () => {
        const wrapper = shallow(<Layout />);
        expect(wrapper.find('div').hasClass('container')).toBe(true);
    });

    it('renders an .container with children', () => {
        const wrapper = shallow(
            <Layout>
                <div>children</div>
            </Layout>
        );
        expect(wrapper.find('div').first().hasClass('container')).toBe(true);
        expect(wrapper.contains(<div>children</div>)).toBe(true);
    });
});