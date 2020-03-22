import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('<Card />', () => {
    it('renders an .card',()=> {
        const wrapper = shallow(<Card />);
        expect(wrapper.find('div').hasClass('card bg-light mt-1')).toBe(true);
    })
});