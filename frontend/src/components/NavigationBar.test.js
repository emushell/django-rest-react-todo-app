import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import { toJson } from 'enzyme-to-json';

import NavigationBar from './NavigationBar';

const mockStore = configureStore([]);


describe('<NavigationBar />', () => {

    it('renders an non-authorised navigation bar', () => {

        const store = mockStore({
            auth: {
                authenticated: false,
                userId: null,
                username: null
            }
        });

        const component = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <NavigationBar />
                </MemoryRouter>
            </Provider>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it('renders an authorised navigation bar', () => {
        const store = mockStore({
            auth: {
                authenticated: true,
                userId: 1,
                username: 'Test'
            }
        });

        const component = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <NavigationBar />
                </MemoryRouter>
            </Provider>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('<NavigationBar /> - enzyme', () => {
    it('renders an non-authorised navigation bar', () => {

        const store = mockStore({
            auth: {
                authenticated: false,
                userId: null,
                username: null
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <NavigationBar />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('nav').hasClass('navbar')).toBe(true);
        expect(wrapper.find('ul').exists()).toBe(false);
    });

    it('renders an authorised navigation bar', () => {

        const store = mockStore({
            auth: {
                authenticated: true,
                userId: 1,
                username: 'Test'
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <NavigationBar />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('nav').hasClass('navbar')).toBe(true);
        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.find('ul').hasClass('nav navbar-nav')).toBe(true);
        expect(wrapper.find('a.nav-link.dropdown-toggle').text()).toBe('Hello, Test');
    });
})
;
