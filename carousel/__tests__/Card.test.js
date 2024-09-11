import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke Test
it("renders without crashing", function() {
  render(<Card caption="Test caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot Test
it("matches snapshot", function() {
  const { asFragment } = render(
    <Card caption="Test caption" src="test.jpg" currNum={1} totalNum={3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
