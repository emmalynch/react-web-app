import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PostDetail from '../components/PostDetail';
import { DATE_LABEL, ID_LABEL, LOCATION_LABEL, TEXT_LABEL } from '../consts';

const emptyFn = () => {}

const testProps = {
    post: {
        author: "Jane Doe",
        location: "Dublin",
        text: "Post content",
        id: 1,
        time: "123",
        week: 14,
        date: new Date().toDateString()
    },
    onAuthorChange: emptyFn
}

test("PostDetail renders post information correctly", () => {
    
    render(<PostDetail {...testProps}/>)

    const element = screen.getByTestId("PostDetailGrid");
    expect(element).toBeInTheDocument();

    const idGridElement = screen.getByTestId("grid-id");
    expect(idGridElement).toBeInTheDocument();
    expect(idGridElement.textContent).toBe(`${ID_LABEL}${testProps.post.id}`);

    const dateGridElement = screen.getByTestId("grid-date");
    expect(dateGridElement).toBeInTheDocument();
    expect(dateGridElement.textContent).toBe(`${DATE_LABEL}${testProps.post.date}`);

    const locationGridElement = screen.getByTestId("grid-loc");
    expect(locationGridElement).toBeInTheDocument();
    expect(locationGridElement.textContent).toBe(`${LOCATION_LABEL}${testProps.post.location}`);

    const textGridElement = screen.getByTestId("grid-text");
    expect(textGridElement).toBeInTheDocument();
    expect(textGridElement.textContent).toBe(`${TEXT_LABEL}${testProps.post.text}`);
});

