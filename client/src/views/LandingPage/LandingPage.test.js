import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LandingPage from './landingPage';


configure({adapter: new Adapter()});

describe('<landingPage />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LandingPage />);
    })
    it('Renderiza un boton', () => {
      expect(wrapper.find('button')).toHaveLength(1)
    })
    
    it('Renderiza una lista desordenada', () => {
     
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('Renderiza 3 li', () => {
      expect(wrapper.find('li')).toHaveLength(3)
    })
    
    it('Renderiza 4 divs', () => {
      
      expect(wrapper.find('div')).toHaveLength(4)
    })
    it('Renderiza 1 h1', () => {
      
      expect(wrapper.find('h1')).toHaveLength(1)
    })
})
});