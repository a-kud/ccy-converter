import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ExchangeRate } from "./ExchangeRate";

describe("ExchangeRate", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <ExchangeRate
        data={{
          base: "EUR",
          quote: "USD",
          rate: "100",
        }}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
