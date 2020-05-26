import React from "react";
import Header from "./Header";
import {mount, shallow} from "enzyme";
import  {MemoryRouter} from "react-router-dom";

//shallow, note how with shallow you search for the React component tag
it('contains 3 nav links via shallow', function () {
    const numLinks = shallow(<Header/>).find("NavLink").length;
    expect(numLinks).toEqual(3);
});

it('contains 3 anchors via mount', function () {
    const numAnchors = mount(
        <MemoryRouter>
            <Header/>
        </MemoryRouter>
    ).find("a").length;
    expect(numAnchors).toEqual(3);
});
