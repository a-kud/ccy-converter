import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { TotalAmount } from "./TotalAmount";

describe("TotalAmount", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<TotalAmount amount="24.00" currency="USD" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
