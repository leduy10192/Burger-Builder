//Jest gives us some testing methods:
//describe() takes 2 args, 1st is just a description of the test bundle this file holds, should be something
// that identify which kind of tests we'll run here
// 2nd is an ES6 func that describe your actual test
// shallow renders the component with all its content but the content isn't deeply rendered
//e.g. inside NavigationItems, NavigationItem is only rendered as a placholder, its content is not rendered
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    //it describes or allows you to write one individual test
    //the 2nd arg is a func that creates an instance of this component as it would be rendered to the DOM through React,
    //and have a look into the rendered component to see what was rendered for the case the isAuthenticated prop is false
    //Enzyme allows us to just render this NavigationItems component standalone so we don't have to render the complete React App
    // function that will automaticallt be executed before each of your test; also afterEach is a function for cleanup
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>) // isAuthenticated is passed as false
    })
    it('should render two <NavigationItem /> element if not authenticated', () => {
        //our expectations: expect (the things we want to check)
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    }); 
    it('should render three <NavigationItem /> element if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated/>); // isAuthenticated is passed as true
        wrapper.setProps({isAuthenticated: true});
        //our expectations: expect (the things we want to check)
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    }); 
    it('should render three <NavigationItem /> element if authenticated', () => {
        //if we're not setProps to true here, the test will fail because each test runs independently of the others
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    }); 
})

