import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Button>Nice</Button>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
