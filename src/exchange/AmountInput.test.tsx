import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { AmountInput } from "./AmountInput";

describe("AmountInput", () => {
  const ref = {} as React.RefObject<HTMLInputElement>;
  let wrapper;
  const mockFn = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <AmountInput
        placeholder=""
        className=""
        inputRef={ref}
        onChange={mockFn}
        value="13"
      />
    );
  });

  it("renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("fires onChange callback", () => {
    const input = wrapper.find("AmountInput");
    input.props().onChange({ target: { value: "foo" } });

    expect(mockFn).toBeCalledWith("foo");
  });
});
