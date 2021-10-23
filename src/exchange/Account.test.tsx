import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Account } from "./Account";
import { AmountInput } from "./AmountInput";
import { Button } from "./Button";

describe("Account", () => {
  let wrapper;
  const mockFn = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Account
        placeholder=""
        amount="10"
        currency="EUR"
        totalAmount="120"
        onAmountChange={mockFn}
        onAccountChange={mockFn}
      />
    );
  });
  it("renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("fires onAmountChange", () => {
    const props = wrapper.find(AmountInput).props();
    props.onChange("changed");

    expect(mockFn).toBeCalledWith("changed");
  });

  it("fires onChangeAccount", () => {
    const nextButtonProps = wrapper.find(Button).at(1).props();
    expect(nextButtonProps.children).toStrictEqual("〉");

    nextButtonProps.onClick!();

    expect(mockFn).toBeCalledWith(true);
  });

  it("fires calls onChangeAccount", () => {
    const prevButtonProps = wrapper.find(Button).at(0).props();
    expect(prevButtonProps.children).toStrictEqual("〈");

    prevButtonProps.onClick!();

    expect(mockFn).toBeCalledWith();
  });
});
