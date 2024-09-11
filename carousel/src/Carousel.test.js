import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke Test
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
});

// Snapshot Test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});

// Right Arrow Test
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// Left Arrow Test (Part 3 Bug)
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
  
  // move backward to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show again
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
});

// Test for hiding the left arrow on the first image
it("hides the left arrow on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the left arrow to be missing on the first image
  expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument();
});

// Test for hiding the right arrow on the last image
it("hides the right arrow on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to be missing on the last image
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
});
